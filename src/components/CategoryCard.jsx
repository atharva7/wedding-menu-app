import { useState } from "react";

const TIER_NAMES = { 1: "Starter", 2: "Celebration", 3: "Grand" };

function vegClass(item) {
  if (item.veg === true) return "veg";
  if (item.veg === false) return "non-veg";
  return "";
}

function matchesDiet(item, dietFilter) {
  if (dietFilter === "veg") return item.veg === true;
  if (dietFilter === "nonveg") return item.veg === false;
  return true;
}

function matchesSearch(item, searchQuery) {
  if (!searchQuery) return false;
  return item.name.toLowerCase().includes(searchQuery);
}

function isItemAtLimit({ item, category, tier, hasVegSplit, veg, nonVeg, isSelected, selectedIds }) {
  if (hasVegSplit) {
    if (item.veg && category.vegMax) return veg >= category.vegMax[tier] && !isSelected;
    if (!item.veg && category.nonVegMax) return nonVeg >= category.nonVegMax[tier] && !isSelected;
    return false;
  }
  if (category.max) return selectedIds.length >= category.max[tier] && !isSelected;
  return false;
}

function countVeg(items, selectedIds) {
  const map = Object.fromEntries(items.map((i) => [i.id, i]));
  let veg = 0;
  let nonVeg = 0;
  for (const id of selectedIds) {
    if (map[id]?.veg) veg++;
    else if (map[id]) nonVeg++;
  }
  return { veg, nonVeg };
}

function SubStationPicker({
  parentItemId,
  subDefKey,
  subCategories,
  subSelections,
  onToggleSub,
  onToggleBread,
  tier,
  dietFilter = "all",
  searchQuery = "",
}) {
  const subDef = subCategories[subDefKey];
  const subKey = `${parentItemId}::${subDefKey}`;
  const selected = subSelections[subKey] || [];
  const limit = subDef.max ? subDef.max[tier] : null;
  const isUnlimited = limit == null;
  const visibleItems = subDef.items.filter((item) => matchesDiet(item, dietFilter));

  return (
    <div className="sub-station">
      <div className="sub-station-header">
        <span>{subDef.title}</span>
        <span className="limit-badge">
          {isUnlimited ? "All included" : `${selected.length}/${limit} selected`}
        </span>
      </div>
      <div className="chip-grid">
        {visibleItems.map((item) => {
          const isSelected = selected.includes(item.id);
          const atLimit = !isUnlimited && selected.length >= limit && !isSelected;
          return (
            <button
              key={item.id}
              className={`item-chip small ${isSelected ? "selected" : ""} ${vegClass(item)} ${
                matchesSearch(item, searchQuery) ? "search-match" : ""
              }`}
              disabled={atLimit}
              onClick={() => onToggleSub(subKey, subDefKey, item.id)}
            >
              {item.veg === true && <span className="veg-symbol veg" aria-label="Veg" />}
              {item.veg === false && <span className="veg-symbol non-veg" aria-label="Non-Veg" />}
              {item.name}
            </button>
          );
        })}
      </div>

      {subDef.breads && (
        <>
          <div className="sub-station-header bread-header">
            <span>Mini Breads</span>
            <span className="limit-badge">
              {(subSelections[`${subKey}::breads`] || []).length}/
              {subDef.breadsMax[tier]} selected
            </span>
          </div>
          <div className="chip-grid">
            {subDef.breads.map((bread) => {
              const breadSelected = (subSelections[`${subKey}::breads`] || []).includes(
                bread.id
              );
              const breadAtLimit =
                (subSelections[`${subKey}::breads`] || []).length >=
                  subDef.breadsMax[tier] && !breadSelected;
              return (
                <button
                  key={bread.id}
                  className={`item-chip small ${breadSelected ? "selected" : ""}`}
                  disabled={breadAtLimit}
                  onClick={() => onToggleBread(subKey, bread.id)}
                >
                  {bread.name}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function CategoryCard({
  category,
  tier,
  index,
  selectedIds,
  onToggle,
  subCategories,
  subSelections,
  onToggleSub,
  onToggleBread,
  dietFilter = "all",
  searchQuery = "",
  forceExpanded = false,
}) {
  const locked =
    (category.availableFrom && tier < category.availableFrom) ||
    category.max?.[tier] === 0;

  const hasVegSplit = Boolean(category.vegMax || category.nonVegMax);
  const { veg, nonVeg } = hasVegSplit ? countVeg(category.items, selectedIds) : {};

  let limitText;
  if (locked) {
    limitText = `Unlocks with ${TIER_NAMES[category.availableFrom || 2]}`;
  } else if (hasVegSplit) {
    const parts = [];
    if (category.vegMax) parts.push(`${veg}/${category.vegMax[tier]} Veg`);
    if (category.nonVegMax) parts.push(`${nonVeg}/${category.nonVegMax[tier]} Non-Veg`);
    limitText = parts.join(" · ");
  } else if (category.max) {
    limitText = `${selectedIds.length}/${category.max[tier]} selected`;
  } else {
    limitText = "All included";
  }

  const [expanded, setExpanded] = useState(false);
  const [openNoteId, setOpenNoteId] = useState(null);
  const toggleExpanded = () => setExpanded(!expanded);
  const isExpanded = expanded || forceExpanded;
  const visibleItems = category.items.filter((item) => matchesDiet(item, dietFilter));

  return (
    <div
      className={`category-card ${locked ? "locked" : ""} ${category.featured ? "featured" : ""}`}
      style={{ animationDelay: `${Math.min((index - 1) * 45, 450)}ms` }}
    >
      {category.featured && <span className="featured-tag">★ Guest Favorite</span>}
      <button
        type="button"
        className="category-header"
        aria-expanded={isExpanded}
        onClick={toggleExpanded}
      >
        <div className="category-heading">
          <span className="category-index">{index}</span>
          <h3>{category.title}</h3>
        </div>
        <div className="category-header-right">
          <span className={`status-pill ${locked ? "status-locked" : ""}`}>
            {limitText}
          </span>
          <span className={`chevron ${isExpanded ? "open" : ""}`} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path
                d="M3.5 6L8 10.5L12.5 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="chip-grid category-items">
          {visibleItems.length === 0 && (
            <p className="empty-filter-note">No dishes match this filter.</p>
          )}
          {visibleItems.map((item) => {
            const itemLocked =
              locked || Boolean(item.availableFrom && tier < item.availableFrom);
            const isSelected = !itemLocked && selectedIds.includes(item.id);
            const atLimit =
              !itemLocked &&
              isItemAtLimit({ item, category, tier, hasVegSplit, veg, nonVeg, isSelected, selectedIds });

            return (
              <div key={item.id} className="chip-with-sub">
                <div className="chip-row">
                  <button
                    className={`item-chip ${isSelected ? "selected" : ""} ${
                      itemLocked ? "item-locked" : ""
                    } ${vegClass(item)} ${matchesSearch(item, searchQuery) ? "search-match" : ""}`}
                    disabled={itemLocked || atLimit}
                    onClick={() => onToggle(item.id)}
                  >
                    {item.veg === true && <span className="veg-symbol veg" aria-label="Veg" />}
                    {item.veg === false && <span className="veg-symbol non-veg" aria-label="Non-Veg" />}
                    {item.name}
                    {itemLocked && !locked && (
                      <span className="lock-tag">{TIER_NAMES[item.availableFrom]}+</span>
                    )}
                  </button>

                  {item.note && (
                    <button
                      type="button"
                      className={`note-toggle ${openNoteId === item.id ? "open" : ""}`}
                      aria-label={`View chef's note for ${item.name}`}
                      aria-expanded={openNoteId === item.id}
                      onClick={() =>
                        setOpenNoteId(openNoteId === item.id ? null : item.id)
                      }
                    >
                      i
                    </button>
                  )}
                </div>

                {openNoteId === item.id && item.note && (
                  <div className="tasting-note">
                    <div className="tasting-note-head">
                      <span className="tasting-note-name">{item.name}</span>
                      {item.spice != null && (
                        <span
                          className="spice-dots"
                          aria-label={`Spice level ${item.spice} of 3`}
                        >
                          {[1, 2, 3].map((n) => (
                            <span
                              key={n}
                              className={`spice-dot ${n <= item.spice ? "filled" : ""}`}
                            />
                          ))}
                        </span>
                      )}
                    </div>
                    <p className="tasting-note-text">{item.note}</p>
                    {item.pairsWith && (
                      <p className="tasting-note-tip">
                        <strong>Chef&apos;s tip:</strong> pairs beautifully with {item.pairsWith}.
                      </p>
                    )}
                  </div>
                )}

                {item.sub && isSelected && (
                  <SubStationPicker
                    parentItemId={item.id}
                    subDefKey={item.sub}
                    subCategories={subCategories}
                    subSelections={subSelections}
                    onToggleSub={onToggleSub}
                    onToggleBread={onToggleBread}
                    tier={tier}
                    dietFilter={dietFilter}
                    searchQuery={searchQuery}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
