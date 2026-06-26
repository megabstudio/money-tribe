import React from "react";

/** Money Tribe checkbox with animated brand checkmark (Radix-style). */
export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label = null,
  id,
  style = {},
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const dims = { sm: 16, md: 20, lg: 24 };
  const d = dims[size] || dims.md;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  const box = (
    <span
      role="checkbox"
      aria-checked={on}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        width: d,
        height: d,
        borderRadius: "var(--radius-xs)",
        border: `1.5px solid ${on ? "var(--primary)" : "var(--border-strong)"}`,
        background: disabled ? "var(--muted)" : (on ? "var(--primary)" : "var(--background)"),
        color: "var(--primary-foreground)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
        outline: "none",
        ...style,
      }}
      onFocus={(e) => { if (!disabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 30%, transparent)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...props}
    >
      <svg width={d * 0.66} height={d * 0.66} viewBox="0 0 16 16" fill="none"
        style={{ opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(0.6)", transition: "opacity var(--duration-fast) var(--ease-out), transform var(--duration-base) var(--ease-out)" }}>
        <path d="M13.5 4.5 6.5 11.5 2.5 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  if (label == null) return box;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", cursor: disabled ? "not-allowed" : "pointer" }} onClick={toggle}>
      {box}
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: disabled ? "var(--text-disabled)" : "var(--text-body)", userSelect: "none" }}>{label}</span>
    </span>
  );
}
