import React from "react";

const RadioCtx = React.createContext(null);

/** RadioGroup — wraps Radio children, manages selection (Radix-style). */
export function RadioGroup({ value, defaultValue, onValueChange, disabled = false, orientation = "vertical", style = {}, children }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const select = (v) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <RadioCtx.Provider value={{ current, select, groupDisabled: disabled }}>
      <div role="radiogroup" style={{ display: "flex", flexDirection: orientation === "horizontal" ? "row" : "column", gap: "var(--space-3)", ...style }}>
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

/** Radio — single option. Must be inside a RadioGroup. */
export function Radio({ value, label = null, disabled = false, size = "md", style = {} }) {
  const ctx = React.useContext(RadioCtx);
  const dims = { sm: 16, md: 20, lg: 24 };
  const d = dims[size] || dims.md;
  const selected = ctx?.current === value;
  const isDisabled = disabled || ctx?.groupDisabled;

  const dot = (
    <span
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={() => !isDisabled && ctx?.select(value)}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); ctx?.select(value); } }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        width: d,
        height: d,
        borderRadius: "var(--radius-pill)",
        border: `1.5px solid ${selected ? "var(--primary)" : "var(--border-strong)"}`,
        background: isDisabled ? "var(--muted)" : "var(--background)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "border-color var(--duration-fast) var(--ease-out)",
        outline: "none",
        ...style,
      }}
      onFocus={(e) => { if (!isDisabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 30%, transparent)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      <span style={{
        width: d * 0.5,
        height: d * 0.5,
        borderRadius: "var(--radius-pill)",
        background: "var(--primary)",
        transform: selected ? "scale(1)" : "scale(0)",
        transition: "transform var(--duration-base) var(--ease-out)",
      }} />
    </span>
  );

  if (label == null) return dot;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", cursor: isDisabled ? "not-allowed" : "pointer" }}>
      {dot}
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: isDisabled ? "var(--text-disabled)" : "var(--text-body)", userSelect: "none" }}>{label}</span>
    </label>
  );
}
