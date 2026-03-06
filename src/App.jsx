import { useState } from "react";

const themes = {
  DEFAULT: {
    semantic: {
      interactive: { ref: "primary-6", value: "rgb(10, 224, 121)" },
      "interactive-hover": { ref: "primary-5", value: "rgb(54, 230, 145)" },
      "on-interactive": { ref: "secondary-10", value: "rgb(33, 39, 63)" },
      disabled: { ref: "secondary-3", value: "rgb(212, 215, 227)" },
      "on-disabled": { ref: "secondary-6", value: "rgb(107, 117, 161)" },
      accent: { ref: "primary-6", value: "rgb(10, 224, 121)" },
      "accent-muted": { ref: "primary-4", value: "rgb(101, 235, 171)" },
      "accent-subtle": { ref: "primary-2", value: "rgb(196, 248, 223)" },
      "section-dot": { ref: "primary-6", value: "rgb(10, 224, 121)" },
      "on-section-dot": { ref: "secondary-10", value: "rgb(33, 39, 63)" },
      "login-background": { ref: "secondary-1", value: "rgb(246, 247, 251)" },
    },
  },
  BKW: {
    semantic: {
      interactive: { ref: "primary-10", value: "rgb(1, 61, 112)" },
      "interactive-hover": { ref: "primary-9", value: "rgb(0, 75, 118)" },
      "on-interactive": { ref: "white", value: "#ffffff" },
      accent: { ref: "primary-10", value: "rgb(1, 61, 112)" },
      "accent-muted": { ref: "primary-6", value: "rgb(37, 162, 202)" },
      "accent-subtle": { ref: "primary-3", value: "rgb(181, 222, 235)" },
      "section-dot": { ref: "primary-4", value: "rgb(133, 207, 232)" },
      "on-section-dot": { ref: "secondary-10", value: "rgb(33, 39, 63)" },
      "login-background": { ref: "primary-4", value: "rgb(133, 207, 232)" },
    },
  },
};

const cardTokenGroups = {
  buttons: ["interactive", "on-interactive", "interactive-hover"],
  "buttons-disabled": ["disabled", "on-disabled"],
  accent: ["accent", "accent-muted", "accent-subtle"],
  "section-dot": ["section-dot", "on-section-dot"],
  "login-background": ["login-background"],
};

function getLuminance(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match) return 1;
  const [r, g, b] = match.map(Number);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function ExampleCard({ title, children, tokens, highlightGroup, onHover }) {
  return (
    <div
      onMouseEnter={() => onHover(highlightGroup)}
      onMouseLeave={() => onHover(null)}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        cursor: "default",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {title}
      </div>
      <div>{children}</div>
      <div
        style={{
          borderTop: "1px solid #f3f4f6",
          paddingTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9.5,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#9ca3af",
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Tokenek
        </div>
        <code
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#4b5563",
            background: "#f9fafb",
            padding: "10px 14px",
            borderRadius: 8,
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
          }}
        >
          {tokens}
        </code>
      </div>
    </div>
  );
}

export default function DesignTokenUsage() {
  const [activeTheme, setActiveTheme] = useState("DEFAULT");
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const t = themes[activeTheme];

  const highlightedTokens = hoveredGroup
    ? hoveredGroup.flatMap((g) => cardTokenGroups[g] || [g])
    : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "36px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#9ca3af",
                marginBottom: 6,
              }}
            >
              Design System — Szín tokenek
            </div>
            <h1
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 34,
                fontWeight: 400,
                color: "#111827",
                margin: 0,
              }}
            >
              Használati útmutató
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              background: "#f3f4f6",
              borderRadius: 10,
              padding: 4,
              gap: 4,
            }}
          >
            {Object.keys(themes).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 7,
                  border: "none",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeTheme === key ? "#111827" : "transparent",
                  color: activeTheme === key ? "#fff" : "#6b7280",
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Callout */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 48px 0" }}>
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: 12,
            padding: "16px 20px",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            fontSize: 13.5,
            color: "#92400e",
            lineHeight: 1.6,
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
          <span>
            Mindig szemantikus token neveket használj (pl.{" "}
            <code
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                background: "rgba(0,0,0,0.06)",
                padding: "1px 5px",
                borderRadius: 3,
              }}
            >
              var(--color-interactive)
            </code>
            ), soha ne közvetlen színértékeket vagy primary/secondary
            hivatkozásokat. Így a témaváltás automatikusan működik.
          </span>
        </div>
      </div>

      {/* Examples grid */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "28px 48px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Buttons */}
        <ExampleCard
          title="Gombok"
          highlightGroup={["buttons", ...(t.semantic.disabled ? ["buttons-disabled"] : [])]}
          onHover={setHoveredGroup}
          tokens={`bg:    var(--color-interactive)\ntext:  var(--color-on-interactive)\nhover: var(--color-interactive-hover)`}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              style={{
                background: t.semantic.interactive.value,
                color: t.semantic["on-interactive"].value,
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Mentés
            </button>
            <button
              style={{
                background: t.semantic["interactive-hover"].value,
                color: t.semantic["on-interactive"].value,
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Hover
            </button>
            {t.semantic.disabled && (
              <button
                style={{
                  background: t.semantic.disabled.value,
                  color: t.semantic["on-disabled"].value,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "not-allowed",
                }}
              >
                Disabled
              </button>
            )}
          </div>
        </ExampleCard>

        {/* Accent levels */}
        <ExampleCard
          title="Kiemelés szintek (Accent)"
          highlightGroup={["accent"]}
          onHover={setHoveredGroup}
          tokens={`erős:    var(--color-accent)\nközepes: var(--color-accent-muted)\nfinom:   var(--color-accent-subtle)`}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { key: "accent", label: "Erős" },
              { key: "accent-muted", label: "Közepes" },
              { key: "accent-subtle", label: "Finom" },
            ].map(({ key, label }) => (
              <div
                key={key}
                style={{
                  flex: 1,
                  height: 56,
                  backgroundColor: t.semantic[key].value,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color:
                    getLuminance(t.semantic[key].value) > 0.55
                      ? "#374151"
                      : "#fff",
                  border:
                    getLuminance(t.semantic[key].value) > 0.9
                      ? "1px solid rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </ExampleCard>

        {/* Section dots */}
        <ExampleCard
          title="Section dot"
          highlightGroup={["section-dot"]}
          onHover={setHoveredGroup}
          tokens={`bg:   var(--color-section-dot)\ntext: var(--color-on-section-dot)`}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: t.semantic["section-dot"].value,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.semantic["on-section-dot"].value,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {i}
              </div>
            ))}
          </div>
        </ExampleCard>

        {/* Login background */}
        <ExampleCard
          title="Login háttér"
          highlightGroup={["login-background"]}
          onHover={setHoveredGroup}
          tokens={`bg: var(--color-login-background)`}
        >
          <div
            style={{
              height: 100,
              borderRadius: 12,
              backgroundColor: t.semantic["login-background"].value,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "12px 28px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>Bejelentkezés</span>
              <div
                style={{
                  width: 120,
                  height: 6,
                  background: "#e5e7eb",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        </ExampleCard>

        {/* Token mapping — full width */}
        <div
          style={{
            gridColumn: "1 / -1",
            background: "#1e1e2e",
            borderRadius: 16,
            padding: 28,
            marginTop: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 700,
                color: "#6b7280",
              }}
            >
              Token mapping — {activeTheme}
            </div>
            {hoveredGroup && (
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "#a5b4fc",
                  background: "rgba(165, 180, 252, 0.1)",
                  padding: "4px 12px",
                  borderRadius: 6,
                  animation: "fadeIn 0.15s ease-out",
                }}
              >
                ↑ Hoverelt elemhez tartozó tokenek kiemelve
              </div>
            )}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px 40px",
            }}
          >
            {Object.entries(t.semantic).map(([name, token]) => {
              const isHighlighted = highlightedTokens.includes(name);
              const isDimmed =
                highlightedTokens.length > 0 && !isHighlighted;

              return (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: isHighlighted ? 8 : 0,
                    background: isHighlighted
                      ? "rgba(165, 180, 252, 0.12)"
                      : "transparent",
                    opacity: isDimmed ? 0.3 : 1,
                    transition:
                      "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isHighlighted
                      ? "scale(1.01)"
                      : "scale(1)",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      backgroundColor: token.value,
                      flexShrink: 0,
                      border:
                        getLuminance(token.value) > 0.9
                          ? "1px solid rgba(255,255,255,0.15)"
                          : "none",
                      boxShadow: isHighlighted
                        ? "0 0 0 2px rgba(165, 180, 252, 0.5)"
                        : "none",
                      transition: "box-shadow 0.2s",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      color: isHighlighted ? "#e0e7ff" : "#cdd6f4",
                      flex: 1,
                      fontWeight: isHighlighted ? 600 : 400,
                      transition: "color 0.2s, font-weight 0.2s",
                    }}
                  >
                    --color-{name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: isHighlighted ? "#a5b4fc" : "#6c7086",
                      transition: "color 0.2s",
                    }}
                  >
                    → {token.ref}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
