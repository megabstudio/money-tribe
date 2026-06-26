import React from "react";

/** Small status / category label. */
export function Badge({ variant = "primary", size = "md", style = {}, children, ...props }) {
  const variants = {
    primary:   { bg: "var(--green-100)", color: "var(--green-800)" },
    solid:     { bg: "var(--primary)", color: "var(--primary-foreground)" },
    dark:      { bg: "var(--green-900)", color: "#fff" },
    neutral:   { bg: "var(--muted)", color: "var(--text-subtle)" },
    outline:   { bg: "transparent", color: "var(--green-700)", border: "var(--primary)" },
    destructive:{ bg: "color-mix(in srgb, var(--destructive) 14%, white)", color: "var(--destructive)" },
  };
  const v = variants[variant] || variants.primary;
  const sizes = { sm: { p: "2px 8px", f: "var(--text-2xs)" }, md: { p: "3px 10px", f: "var(--text-xs)" } };
  const s = sizes[size] || sizes.md;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: s.p,
        fontFamily: "var(--font-sans)",
        fontSize: s.f,
        fontWeight: "var(--weight-bold)",
        lineHeight: 1.4,
        letterSpacing: "var(--tracking-wide)",
        color: v.color,
        background: v.bg,
        border: `1.5px solid ${v.border || "transparent"}`,
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
