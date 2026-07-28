import { useState, useMemo, useCallback, useEffect } from "react";
import {
  TIERS,
  CATEGORIES,
  SUB_CATEGORIES,
  FOOD_TRUCK_ADDON,
  getTierHighlights,
} from "./menuData";
import CategoryCard from "./components/CategoryCard";
import SummaryPanel from "./components/SummaryPanel";
import TierSelector from "./components/TierSelector";
import "./App.css";

const EMPTY_BY_TIER = { 1: {}, 2: {}, 3: {} };
const FALSE_BY_TIER = { 1: false, 2: false, 3: false };
const STORAGE_KEY = "tasteTheRhythm.menuState.v1";

function encodeState(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCodePoint(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeState(encoded) {
  const base64 = encoded.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.codePointAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function readSharedState() {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get("share");
  if (!shared) return null;
  try {
    const data = decodeState(shared);
    params.delete("share");
    const query = params.toString();
    const newUrl =
      window.location.pathname + (query ? `?${query}` : "") + window.location.hash;
    window.history.replaceState({}, "", newUrl);
    return data;
  } catch {
    // Malformed or tampered share link - ignore and fall back to stored state.
    return null;
  }
}

function readStoredState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    // Storage unavailable (private browsing, quota, etc.) - start fresh.
    return null;
  }
}

const initialState =
  typeof window !== "undefined" ? readSharedState() ?? readStoredState() : null;

export default function App() {
  const [tier, setTier] = useState(initialState?.tier ?? 1);
  const [guestName, setGuestName] = useState(initialState?.guestName ?? "");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  // selectionsByTier: { [tier]: { [categoryId]: string[] } } - kept separately per
  // tier so switching packages never discards a guest's previous choices.
  const [selectionsByTier, setSelectionsByTier] = useState(
    initialState?.selectionsByTier ?? EMPTY_BY_TIER
  );
  // subSelectionsByTier: { [tier]: { [subCategoryKey]: string[] } } where
  // subCategoryKey = `${parentItemId}::${subId}`
  const [subSelectionsByTier, setSubSelectionsByTier] = useState(
    initialState?.subSelectionsByTier ?? EMPTY_BY_TIER
  );
  const [foodTruckByTier, setFoodTruckByTier] = useState(
    initialState?.foodTruckByTier ?? FALSE_BY_TIER
  );

  const selections = selectionsByTier[tier];
  const subSelections = subSelectionsByTier[tier];
  const foodTruck = foodTruckByTier[tier];

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          tier,
          guestName,
          selectionsByTier,
          subSelectionsByTier,
          foodTruckByTier,
        })
      );
    } catch {
      // Ignore storage errors (quota exceeded, private browsing, etc.)
    }
  }, [tier, guestName, selectionsByTier, subSelectionsByTier, foodTruckByTier]);

  const buildShareUrl = useCallback(() => {
    const encoded = encodeState({
      tier,
      guestName,
      selectionsByTier,
      subSelectionsByTier,
      foodTruckByTier,
    });
    return `${window.location.origin}${window.location.pathname}?share=${encoded}`;
  }, [tier, guestName, selectionsByTier, subSelectionsByTier, foodTruckByTier]);

  const toggleItem = useCallback(
    (categoryId, itemId) => {
      const cat = CATEGORIES.find((c) => c.id === categoryId);
      setSelectionsByTier((prev) => {
        const tierSelections = prev[tier] || {};
        const current = tierSelections[categoryId] || [];
        const isSelected = current.includes(itemId);
        if (isSelected) {
          return {
            ...prev,
            [tier]: { ...tierSelections, [categoryId]: current.filter((id) => id !== itemId) },
          };
        }

        // Check limits before adding
        if (cat.vegMax || cat.nonVegMax) {
          const item = cat.items.find((i) => i.id === itemId);
          const itemsById = Object.fromEntries(cat.items.map((i) => [i.id, i]));
          const vegLimit = cat.vegMax ? cat.vegMax[tier] : Infinity;
          const nonVegLimit = cat.nonVegMax ? cat.nonVegMax[tier] : Infinity;
          const vegCount = current.filter((id) => itemsById[id]?.veg).length;
          const nonVegCount = current.filter((id) => !itemsById[id]?.veg).length;
          if (item.veg && vegCount >= vegLimit) return prev;
          if (!item.veg && nonVegCount >= nonVegLimit) return prev;
          return {
            ...prev,
            [tier]: { ...tierSelections, [categoryId]: [...current, itemId] },
          };
        }

        const limit = cat.max ? cat.max[tier] : null;
        if (limit != null && current.length >= limit) return prev;
        return {
          ...prev,
          [tier]: { ...tierSelections, [categoryId]: [...current, itemId] },
        };
      });
    },
    [tier]
  );

  const toggleSubItem = useCallback(
    (subKey, subDefKey, itemId) => {
      const subDef = SUB_CATEGORIES[subDefKey];
      setSubSelectionsByTier((prev) => {
        const tierSub = prev[tier] || {};
        const current = tierSub[subKey] || [];
        const isSelected = current.includes(itemId);
        if (isSelected) {
          return {
            ...prev,
            [tier]: { ...tierSub, [subKey]: current.filter((id) => id !== itemId) },
          };
        }
        const limit = subDef.max ? subDef.max[tier] : null;
        if (limit != null && current.length >= limit) return prev;
        return { ...prev, [tier]: { ...tierSub, [subKey]: [...current, itemId] } };
      });
    },
    [tier]
  );

  const toggleBread = useCallback(
    (subKey, itemId) => {
      setSubSelectionsByTier((prev) => {
        const tierSub = prev[tier] || {};
        const breadKey = `${subKey}::breads`;
        const current = tierSub[breadKey] || [];
        const isSelected = current.includes(itemId);
        if (isSelected) {
          return {
            ...prev,
            [tier]: { ...tierSub, [breadKey]: current.filter((id) => id !== itemId) },
          };
        }
        const limit = SUB_CATEGORIES.indianComfort.breadsMax[tier];
        if (limit != null && current.length >= limit) return prev;
        return { ...prev, [tier]: { ...tierSub, [breadKey]: [...current, itemId] } };
      });
    },
    [tier]
  );

  const totalSelectedCount = useMemo(() => {
    let count = 0;
    for (const arr of Object.values(selections)) count += arr.length;
    for (const arr of Object.values(subSelections)) count += arr.length;
    return count;
  }, [selections, subSelections]);

  const tierHighlights = useMemo(() => getTierHighlights(tier), [tier]);

  const resetAll = () => {
    setSelectionsByTier(EMPTY_BY_TIER);
    setSubSelectionsByTier(EMPTY_BY_TIER);
    setFoodTruckByTier(FALSE_BY_TIER);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const categoryMatchesSearch = useCallback(
    (cat) => {
      if (!normalizedQuery) return true;
      if (cat.items.some((item) => item.name.toLowerCase().includes(normalizedQuery))) {
        return true;
      }
      return cat.items.some((item) => {
        if (!item.sub) return false;
        const subDef = SUB_CATEGORIES[item.sub];
        const subMatch = subDef.items.some((i) =>
          i.name.toLowerCase().includes(normalizedQuery)
        );
        const breadMatch = subDef.breads?.some((b) =>
          b.name.toLowerCase().includes(normalizedQuery)
        );
        return subMatch || breadMatch;
      });
    },
    [normalizedQuery]
  );

  const visibleCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      if (!categoryMatchesSearch(cat)) return false;
      if (showSelectedOnly && (selections[cat.id] || []).length === 0) return false;
      return true;
    });
  }, [categoryMatchesSearch, showSelectedOnly, selections]);

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <span className="brand-mark">Taste the Rhythm</span>
        <span className="nav-note">Rhythm Lonavala &middot; Live Menu Planner</span>
      </nav>

      <header className="app-header">
        <h1>Dance, Dine & Say I Do at Rhythm Lonavala</h1>
        <p className="subtitle">
          Swipe, tap, build your dream menu. No boring buffets allowed.
        </p>
        <div className="guest-name-field">
          <label htmlFor="guestName">Couple / Host Name</label>
          <input
            id="guestName"
            type="text"
            placeholder="e.g. Aarav & Kavya"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
        </div>
      </header>

      <TierSelector tiers={TIERS} selectedTier={tier} onSelect={setTier} />

      <div className="tier-overview">
        <span className="tier-overview-item">
          <strong>{tierHighlights.unlocked}</strong> of {tierHighlights.total} stations included.
        </span>
        <span className="tier-overview-divider" aria-hidden="true" />
        <span className="tier-overview-item">
          Up to <strong>{tierHighlights.totalSlots}</strong> dish selections.
        </span>
        <span className="tier-overview-divider" aria-hidden="true" />
        <span className="tier-overview-item">
          {tier === 1 && "Candy & Mithai Bar and Food Truck unlock in higher packages."}
          {tier === 2 && "Food Truck add-on unlocks with the Grand package."}
          {tier === 3 && "Everything is unlocked, including the Food Truck."}
        </span>
      </div>

      <main className="menu-layout">
        <p className="section-label">Choose Your Stations & Dishes</p>

        <div className="menu-toolbar">
          <div className="toolbar-search">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M10.5 10.5L14 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search dishes"
            />
          </div>

          <div className="diet-filter" aria-label="Filter by diet">
            <button
              type="button"
              className={dietFilter === "all" ? "active" : ""}
              onClick={() => setDietFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={dietFilter === "veg" ? "active" : ""}
              onClick={() => setDietFilter("veg")}
            >
              <span className="veg-symbol veg" aria-hidden="true" />
              <span>Veg Only</span>
            </button>
            <button
              type="button"
              className={dietFilter === "nonveg" ? "active" : ""}
              onClick={() => setDietFilter("nonveg")}
            >
              <span className="veg-symbol non-veg" aria-hidden="true" />
              <span>Non-Veg</span>
            </button>
          </div>

          <label className="selected-only-toggle">
            <input
              type="checkbox"
              checked={showSelectedOnly}
              onChange={(e) => setShowSelectedOnly(e.target.checked)}
            />
            <span>Show selected only</span>
          </label>
        </div>

        <div className="categories-column">
          <div className="category-grid">
            {visibleCategories.length === 0 && (
              <p className="no-results">
                No dishes match your search or filters. Try clearing them.
              </p>
            )}
            {visibleCategories.map((cat) => (
              <CategoryCard
                key={cat.id}
                index={CATEGORIES.indexOf(cat) + 1}
                category={cat}
                tier={tier}
                selectedIds={selections[cat.id] || []}
                onToggle={(itemId) => toggleItem(cat.id, itemId)}
                subCategories={SUB_CATEGORIES}
                subSelections={subSelections}
                onToggleSub={toggleSubItem}
                onToggleBread={toggleBread}
                dietFilter={dietFilter}
                searchQuery={normalizedQuery}
                forceExpanded={Boolean(normalizedQuery)}
              />
            ))}

            <div
              className={`category-card addon-card ${
                tier < FOOD_TRUCK_ADDON.availableFrom ? "locked" : ""
              }`}
              style={{ animationDelay: `${Math.min(CATEGORIES.length * 45, 450)}ms` }}
            >
              <div className="category-header category-header-static">
                <div className="category-heading">
                  <span className="category-index">{CATEGORIES.length + 1}</span>
                  <h3>{FOOD_TRUCK_ADDON.title}</h3>
                </div>
                <span
                  className={`status-pill ${
                    tier < FOOD_TRUCK_ADDON.availableFrom ? "status-locked" : ""
                  }`}
                >
                  {tier < FOOD_TRUCK_ADDON.availableFrom
                    ? "Unlocks with Grand"
                    : "Optional add-on"}
                </span>
              </div>
              <button
                className={`item-chip ${foodTruck ? "selected" : ""} ${
                  tier < FOOD_TRUCK_ADDON.availableFrom ? "item-locked" : ""
                }`}
                disabled={tier < FOOD_TRUCK_ADDON.availableFrom}
                onClick={() =>
                  setFoodTruckByTier((prev) => ({ ...prev, [tier]: !foodTruck }))
                }
              >
                {foodTruck ? "✓ Food Truck Added" : "+ Add Food Truck"}
              </button>
            </div>
          </div>
        </div>

        <SummaryPanel
          tier={tier}
          tiers={TIERS}
          guestName={guestName}
          categories={CATEGORIES}
          subCategories={SUB_CATEGORIES}
          selections={selections}
          subSelections={subSelections}
          foodTruck={foodTruck}
          totalSelectedCount={totalSelectedCount}
          onReset={resetAll}
          isMobileOpen={cartOpen}
          onCloseMobile={() => setCartOpen(false)}
          getShareUrl={buildShareUrl}
        />
      </main>

      <button
        type="button"
        className="cart-bar"
        onClick={() => setCartOpen(true)}
        aria-label="View order summary"
      >
        <span className="cart-bar-count">
          <span className="cart-bar-badge">{totalSelectedCount}</span>
          <span className="cart-bar-label">
            {totalSelectedCount === 0 ? "Your selections" : "items selected"}
          </span>
        </span>
        <span className="cart-bar-action">View Summary ›</span>
      </button>
    </div>
  );
}
