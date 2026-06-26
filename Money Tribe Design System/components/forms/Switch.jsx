import React from "react";

/** Money Tribe toggle switch (Radix-style). */
export function Switch({ checked, defaultChecked = false, onCheckedChange, disabled = false, size = "md", label = null, style = {}, ...props }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const dims = { sm: { w: 32, h: 18 }, md: { w: 40, h: 22 }, lg: { w: 48, h: 26 } };
  const { w, h } = dims[size] || dims.md;
  const pad = 2;
  const knob = h - pad * 2;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  const track = (
    <span
      role="switch"
      aria-checked={on}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        flex: "none",
        width: w,
        height: h,
        borderRadius: "var(--radius-pill)",
        background: disabled ? "var(--surface-disabled)" : (on ? "var(--primary)" : "var(--border-strong)"),
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-base) var(--ease-out)",
        outline: "none",
        ...style,
      }}
      onFocus={(e) => { if (!disabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 30%, transparent)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...props}
    >
      <span style={{
        position: "absolute",
        top: pad,
        left: pad,
        width: knob,
        height: knob,
        borderRadius: "var(--radius-pill)",
        background: "#fff",
        boxShadow: "var(--shadow-sm)",
        transform: on ? `translateX(${w - knob - pad * 2}px)` : "translateX(0)",
        transition: "transform var(--duration-base) var(--ease-out)",
      }} />
    </span>
  );

  if (label == null) return track;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", cursor: disabled ? "not-allowed" : "pointer" }}>
      {track}
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: disabled ? "var(--text-disabled)" : "var(--text-body)", userSelect: "none" }}>{label}</span>
    </label>
  );
}
