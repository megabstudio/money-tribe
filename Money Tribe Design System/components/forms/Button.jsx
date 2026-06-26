import React from "react";

/**
 * Money Tribe Button.
 * Variants map to the Figma button family; shapes map to the corner set
 * (rounded / pill / sharp). Built on CSS custom properties from the DS.
 */
export function Button({
  variant = "primary",
  size = "md",
  shape = "rounded",
  fullWidth = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  type = "button",
  style = {},
  children,
  ...props
}) {
  const sizes = {
    sm: { height: "var(--control-sm)", padding: "0 var(--space-4)", font: "var(--text-sm)", gap: "var(--space-2)" },
    md: { height: "var(--control-md)", padding: "0 var(--space-5)", font: "var(--text-sm)", gap: "var(--space-2)" },
    lg: { height: "var(--control-lg)", padding: "0 var(--space-8)", font: "var(--text-base)", gap: "var(--space-3)" },
  };

  const variants = {
    primary:   { bg: "var(--primary)", color: "var(--primary-foreground)", border: "transparent", hoverBg: "var(--primary-hover)" },
    secondary: { bg: "var(--secondary)", color: "var(--secondary-foreground)", border: "transparent", hoverBg: "var(--secondary-hover)" },
    dark:      { bg: "var(--green-900)", color: "#ffffff", border: "transparent", hoverBg: "var(--green-800)" },
    outline:   { bg: "transparent", color: "var(--primary)", border: "var(--primary)", hoverBg: "var(--green-50)" },
    "outline-dark": { bg: "transparent", color: "var(--green-900)", border: "var(--green-900)", hoverBg: "var(--neutral-50)" },
    ghost:     { bg: "transparent", color: "var(--green-900)", border: "transparent", hoverBg: "var(--muted)" },
  };

  const radii = { rounded: "var(--radius-md)", pill: "var(--radius-pill)", sharp: "var(--radius-none)" };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        width: fullWidth ? "100%" : "auto",
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: "var(--weight-bold)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: disabled ? "var(--text-disabled)" : v.color,
        background: disabled ? "var(--surface-disabled)" : (hover && !disabled ? v.hoverBg : v.bg),
        border: `1.5px solid ${disabled ? "transparent" : (v.border === "transparent" ? "transparent" : v.border)}`,
        borderRadius: radii[shape] || radii.rounded,
        cursor: disabled ? "not-allowed" : "pointer",
        transform: active && !disabled ? "scale(0.97)" : "scale(1)",
        transition: "background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
        outline: "none",
        userSelect: "none",
        ...style,
      }}
      onFocus={(e) => { if (!disabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-offset) var(--background), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) color-mix(in srgb, var(--ring) 45%, transparent)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
