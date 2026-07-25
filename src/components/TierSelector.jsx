export default function TierSelector({ tiers, selectedTier, onSelect }) {
  return (
    <div className="tier-selector">
      {tiers.map((t) => (
        <button
          key={t.id}
          className={`tier-card ${selectedTier === t.id ? "active" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          {t.recommended && <span className="tier-badge">Recommended</span>}
          <span className="tier-name">{t.name}</span>
          <span className="tier-subtitle">{t.subtitle}</span>
          <span className="tier-tagline">{t.tagline}</span>
        </button>
      ))}
    </div>
  );
}
