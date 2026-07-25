import { useState, useMemo, useCallback } from "react";
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

export default function App() {
  const [tier, setTier] = useState(1);
  const [guestName, setGuestName] = useState("");
  // selectionsByTier: { [tier]: { [categoryId]: string[] } } - kept separately per
  // tier so switching packages never discards a guest's previous choices.
  const [selectionsByTier, setSelectionsByTier] = useState(EMPTY_BY_TIER);
  // subSelectionsByTier: { [tier]: { [subCategoryKey]: string[] } } where
  // subCategoryKey = `${parentItemId}::${subId}`
  const [subSelectionsByTier, setSubSelectionsByTier] = useState(EMPTY_BY_TIER);
  const [foodTruckByTier, setFoodTruckByTier] = useState(FALSE_BY_TIER);

  const selections = selectionsByTier[tier];
  const subSelections = subSelectionsByTier[tier];
  const foodTruck = foodTruckByTier[tier];

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

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <span className="brand-mark">The Wedding Feast</span>
        <span className="nav-note">Live Menu Planner</span>
      </nav>

      <header className="app-header">
        <p className="eyebrow">Custom Menu Builder</p>
        <h1>Design Your Wedding Feast</h1>
        <p className="subtitle">
          Pick a package, play with every station, and build a feast your
          guests will still be talking about at the next wedding.
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
          <strong>{tierHighlights.unlocked}</strong> of {tierHighlights.total} stations included
        </span>
        <span className="tier-overview-divider" aria-hidden="true" />
        <span className="tier-overview-item">
          Up to <strong>{tierHighlights.totalSlots}</strong> dish selections
        </span>
        <span className="tier-overview-divider" aria-hidden="true" />
        <span className="tier-overview-item">
          {tier === 1 && "Candy & Mithai Bar and Food Truck unlock in higher packages"}
          {tier === 2 && "Food Truck add-on unlocks with the Grand package"}
          {tier === 3 && "Everything is unlocked, including the Food Truck"}
        </span>
      </div>

      <main className="menu-layout">
        <p className="section-label">Choose Your Stations & Dishes</p>

        <div className="categories-column">
          <div className="category-grid">
            {CATEGORIES.map((cat, idx) => (
              <CategoryCard
                key={cat.id}
                index={idx + 1}
                category={cat}
                tier={tier}
                selectedIds={selections[cat.id] || []}
                onToggle={(itemId) => toggleItem(cat.id, itemId)}
                subCategories={SUB_CATEGORIES}
                subSelections={subSelections}
                onToggleSub={toggleSubItem}
                onToggleBread={toggleBread}
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
        />
      </main>
    </div>
  );
}
