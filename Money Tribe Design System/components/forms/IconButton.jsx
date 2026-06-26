import React from "react";

/**
 * Money Tribe IconButton — square button for a single icon.
 * Mirrors Button variants/shapes from the Figma "Button-icon" family.
 */
export function IconButton({
  variant = "primary",
  size = "md",
  shape = "rounded",
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  children,
  ...props
}) {
  const dims = { sm: "var(--control-sm)", md: "var(--control-md)", lg: "var(--control-lg)" };
  const iconSize = { sm: 16, md: 18, lg: 22 };
  const variants = {
    primary:   { bg: "var(--primary)", color: "var(--primary-foreground)", border: "transparent", hoverBg: "var(--primary-hover)" },
    secondary: { bg: "var(--secondary)", color: "var(--secondary-foreground)", border: "transparent", hoverBg: "var(--secondary-hover)" },
    dark:      { bg: "var(--green-900)", color: "#ffffff", border: "transparent", hoverBg: "var(--green-800)" },
    outline:   { bg: "transparent", color: "var(--primary)", border: "var(--primary)", hoverBg: "var(--green-50)" },
    "outline-dark": { bg: "transparent", color: "var(--green-900)", border: "var(--green-900)", hoverBg: "var(--neutral-50)" },
    ghost:     { bg: "transparent", color: "var(--green-900)", border: "transparent", hoverBg: "var(--muted)" },
  };
  const radii = { rounded: "var(--radius-md)", pill: "var(--radius-pill)", sharp: "var(--radius-none)" };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims[size],
        height: dims[size],
        padding: 0,
        color: disabled ? "var(--text-disabled)" : v.color,
        background: disabled ? "var(--surface-disabled)" : (hover && !disabled ? v.hoverBg : v.bg),
        border: `1.5px solid ${v.border === "transparent" ? "transparent" : v.border}`,
        borderRadius: radii[shape] || radii.rounded,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
        outline: "none",
        ...style,
      }}
      {...props}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, { width: iconSize[size], height: iconSize[size] })
        : children}
    </button>
  );
}
