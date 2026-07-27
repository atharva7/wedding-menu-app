function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function vegDotHtml(item) {
  if (item.veg === true) return `<span class="veg-dot veg" aria-hidden="true"></span>`;
  if (item.veg === false) return `<span class="veg-dot non-veg" aria-hidden="true"></span>`;
  return "";
}

function buildSubItemsHtml(item, subCategories, subSelections) {
  if (!item.sub) return "";
  const subDef = subCategories[item.sub];
  const subKey = `${item.id}::${item.sub}`;
  const subIds = subSelections[subKey] || [];
  const breadIds = subSelections[`${subKey}::breads`] || [];
  const pickedSubItems = subIds
    .map((subId) => subDef.items.find((i) => i.id === subId))
    .filter(Boolean);
  const pickedBreads = (subDef.breads || []).filter((b) => breadIds.includes(b.id));
  const allSubItems = [...pickedSubItems, ...pickedBreads];
  if (allSubItems.length === 0) return "";
  const rows = allSubItems.map((sub) => `<li>${escapeHtml(sub.name)}</li>`).join("");
  return `<ul class="sub-list">${rows}</ul>`;
}

function buildItemHtml(item, subCategories, subSelections) {
  const subHtml = buildSubItemsHtml(item, subCategories, subSelections);
  return `<li>${vegDotHtml(item)}${escapeHtml(item.name)}${subHtml}</li>`;
}

function buildCategoryHtml(cat, selections, subCategories, subSelections) {
  const ids = selections[cat.id] || [];
  if (ids.length === 0) return "";
  const items = ids
    .map((id) => cat.items.find((i) => i.id === id))
    .filter(Boolean)
    .map((item) => buildItemHtml(item, subCategories, subSelections))
    .join("");

  return `
        <section class="category">
          <h3>${escapeHtml(cat.title)}</h3>
          <ul class="item-list">${items}</ul>
        </section>`;
}

function buildSummaryHtml({
  tiers,
  tier,
  guestName,
  categories,
  subCategories,
  selections,
  subSelections,
  foodTruck,
  totalSelectedCount,
}) {
  const tierInfo = tiers.find((t) => t.id === tier);
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categorySections = categories
    .map((cat) => buildCategoryHtml(cat, selections, subCategories, subSelections))
    .filter(Boolean)
    .join("");

  const addonSection = foodTruck
    ? `
        <section class="category">
          <h3>Add-on</h3>
          <ul class="item-list"><li>Food Truck</li></ul>
        </section>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Wedding Menu Selection${guestName ? " - " + escapeHtml(guestName) : ""}</title>
<style>
  @page { size: auto; margin: 20mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: Georgia, "Cormorant Garamond", serif;
    color: #1c1b19;
    margin: 0;
    padding: 32px 40px;
    background: #ffffff;
  }
  .brand {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #ad8a3f;
    font-family: Helvetica, Arial, sans-serif;
    margin: 0 0 6px;
  }
  h1 {
    font-size: 32px;
    margin: 0 0 4px;
    color: #2f4a3d;
  }
  .meta {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    color: #7a7369;
    margin: 0 0 4px;
  }
  .meta strong { color: #3a3733; }
  header {
    border-bottom: 2px solid #e7ede8;
    padding-bottom: 18px;
    margin-bottom: 24px;
  }
  .total-badge {
    display: inline-block;
    margin-top: 10px;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    color: #2f4a3d;
    background: #e7ede8;
    padding: 5px 14px;
    border-radius: 999px;
  }
  .categories {
    column-count: 2;
    column-gap: 32px;
  }
  .category {
    break-inside: avoid;
    margin-bottom: 20px;
    padding-bottom: 14px;
  }
  .category h3 {
    font-size: 16px;
    font-weight: 700;
    color: #2f4a3d;
    background: #e7ede8;
    padding: 6px 10px;
    border-radius: 5px;
    margin: 0 0 8px;
  }
  .item-list {
    list-style: none;
    margin: 0;
    padding: 0 0 0 4px;
    border-left: 2px solid #e7ede8;
  }
  .item-list > li {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13.5px;
    padding: 3px 0 3px 10px;
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .veg-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-block;
  }
  .veg-dot.veg { background: #2e7d43; }
  .veg-dot.non-veg { background: #c0392b; }
  .sub-list {
    list-style: none;
    margin: 4px 0 0 14px;
    padding: 0 0 0 10px;
    border-left: 1px dashed #e4ddcd;
  }
  .sub-list li {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
    color: #7a7369;
    padding: 2px 0;
  }
  footer {
    margin-top: 28px;
    padding-top: 12px;
    border-top: 1px solid #e4ddcd;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 11px;
    color: #7a7369;
    text-align: center;
  }
  @media print {
    body { padding: 0; }
  }
</style>
</head>
<body>
  <header>
    <p class="brand">Taste the Rhythm</p>
    <h1>${guestName ? `${escapeHtml(guestName)}'s Celebration` : "Wedding Menu Selection"}</h1>
    <p class="meta">Package: <strong>${escapeHtml(tierInfo.name)}</strong> &middot; ${escapeHtml(tierInfo.subtitle)}</p>
    <p class="meta">${today}</p>
    <span class="total-badge">${totalSelectedCount} items selected</span>
  </header>
  <div class="categories">
    ${categorySections}
    ${addonSection}
  </div>
  <footer>Prepared with Taste the Rhythm &middot; Rhythm Lonavala</footer>
  <script>
    window.addEventListener("load", function () {
      window.print();
    });
  </script>
</body>
</html>`;
}

export default function SummaryPanel({
  tier,
  tiers,
  guestName,
  categories,
  subCategories,
  selections,
  subSelections,
  foodTruck,
  totalSelectedCount,
  onReset,
  isMobileOpen,
  onCloseMobile,
}) {
  const tierInfo = tiers.find((t) => t.id === tier);

  const handleDownload = () => {
    const html = buildSummaryHtml({
      tiers,
      tier,
      guestName,
      categories,
      subCategories,
      selections,
      subSelections,
      foodTruck,
      totalSelectedCount,
    });
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!printWindow) {
      window.alert("Please allow pop-ups to download your menu as a PDF.");
      URL.revokeObjectURL(url);
      return;
    }
    printWindow.focus();
    // Release the blob URL once the new window has had time to load it.
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };

  return (
    <aside className={`summary-panel ${isMobileOpen ? "mobile-open" : ""}`}>
      {isMobileOpen && (
        <button
          type="button"
          className="summary-backdrop"
          aria-label="Close order summary"
          onClick={onCloseMobile}
        />
      )}
      <div className="summary-sticky">
        <span className="summary-sheet-handle" aria-hidden="true" />
        <button
          type="button"
          className="summary-close"
          onClick={onCloseMobile}
          aria-label="Close order summary"
        >
          ✕
        </button>
        <p className="summary-eyebrow">Order Summary</p>
        <h2>{guestName ? `${guestName}'s Celebration` : "Your Celebration"}</h2>
        <p className="summary-tier">
          {tierInfo.name} Package &middot; {tierInfo.subtitle}
        </p>
        <p className="summary-total">{totalSelectedCount} items selected</p>

        <div className="summary-list">
          {categories.map((cat) => {
            const ids = selections[cat.id] || [];
            if (ids.length === 0) return null;
            return (
              <div key={cat.id} className="summary-category">
                <h4>{cat.title}</h4>
                <ul>
                  {ids.map((id) => {
                    const item = cat.items.find((i) => i.id === id);
                    if (!item) return null;
                    const subDef = item.sub ? subCategories[item.sub] : null;
                    const subKey = item.sub ? `${item.id}::${item.sub}` : null;
                    const subIds = subKey ? subSelections[subKey] || [] : [];
                    const breadIds = subKey
                      ? subSelections[`${subKey}::breads`] || []
                      : [];
                    return (
                      <li key={id}>
                        {item.name}
                        {subDef && (subIds.length > 0 || breadIds.length > 0) && (
                          <ul className="summary-sub-list">
                            {subIds.map((subId) => {
                              const subItem = subDef.items.find((i) => i.id === subId);
                              return subItem ? <li key={subId}>{subItem.name}</li> : null;
                            })}
                            {breadIds.map((breadId) => {
                              const bread = subDef.breads.find((b) => b.id === breadId);
                              return bread ? <li key={breadId}>{bread.name}</li> : null;
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {foodTruck && (
            <div className="summary-category">
              <h4>Add-on</h4>
              <ul>
                <li>Food Truck</li>
              </ul>
            </div>
          )}

          {totalSelectedCount === 0 && !foodTruck && (
            <p className="empty-state">
              Start selecting dishes from each station on the left — your picks
              will appear here.
            </p>
          )}
        </div>

        <div className="summary-actions">
          <button className="btn-primary" onClick={handleDownload}>
            Download as PDF
          </button>
          <button className="btn-secondary" onClick={() => window.print()}>
            Print
          </button>
          <button className="btn-ghost" onClick={onReset}>
            Reset All
          </button>
        </div>
      </div>
    </aside>
  );
}
