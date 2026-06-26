import React from "react";

/** Money Tribe Select — custom dropdown (Radix-style trigger + popover). */
export function Select({
  value,
  defaultValue,
  onValueChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  size = "md",
  style = {},
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const heights = { sm: "var(--control-sm)", md: "var(--control-md)", lg: "var(--control-lg)" };

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = options.find((o) => o.value === current);
  const choose = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", ...style }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-2)",
          width: "100%",
          height: heights[size],
          padding: "0 var(--space-3)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-medium)",
          color: selected ? "var(--text-body)" : "var(--muted-foreground)",
          background: disabled ? "var(--muted)" : "var(--background)",
          border: `1.5px solid ${open ? "var(--ring)" : "var(--input)"}`,
          borderRadius: "var(--radius-md)",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          boxShadow: open ? "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 22%, transparent)" : "none",
          transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected ? selected.label : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: "none", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-out)" }}>
          <path d="M4 6l4 4 4-4" stroke="var(--muted-foreground)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "var(--space-1)",
          background: "var(--surface-popover)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          maxHeight: 260,
          overflowY: "auto",
        }}>
          {options.map((o) => {
            const active = o.value === current;
            return (
              <div
                key={o.value}
                onClick={() => choose(o.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-2) var(--space-3)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
                  color: active ? "var(--primary)" : "var(--text-body)",
                  background: active ? "var(--green-50)" : "transparent",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--muted)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {o.label}
                {active && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5 6.5 11.5 2.5 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
