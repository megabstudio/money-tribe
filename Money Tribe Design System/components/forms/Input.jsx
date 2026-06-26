import React from "react";

/** Money Tribe text input — Radix/shadcn-style field with focus ring. */
export function Input({
  size = "md",
  invalid = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  style = {},
  ...props
}) {
  const heights = { sm: "var(--control-sm)", md: "var(--control-md)", lg: "var(--control-lg)" };
  const [focus, setFocus] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : (focus ? "var(--ring)" : "var(--input)");

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
      {leftIcon && (
        <span style={{ position: "absolute", left: "var(--space-3)", display: "inline-flex", color: "var(--muted-foreground)", pointerEvents: "none" }}>{leftIcon}</span>
      )}
      <input
        disabled={disabled}
        onFocus={(e) => { setFocus(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); props.onBlur?.(e); }}
        style={{
          width: "100%",
          height: heights[size],
          padding: leftIcon ? "0 var(--space-3) 0 var(--space-9)" : "0 var(--space-3)",
          paddingRight: rightIcon ? "var(--space-9)" : "var(--space-3)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-medium)",
          color: "var(--text-body)",
          background: disabled ? "var(--muted)" : "var(--background)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          outline: "none",
          boxShadow: focus ? `0 0 0 var(--ring-width) color-mix(in srgb, ${invalid ? "var(--destructive)" : "var(--ring)"} 22%, transparent)` : "none",
          transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
          cursor: disabled ? "not-allowed" : "text",
          ...style,
        }}
        {...props}
      />
      {rightIcon && (
        <span style={{ position: "absolute", right: "var(--space-3)", display: "inline-flex", color: "var(--muted-foreground)" }}>{rightIcon}</span>
      )}
    </div>
  );
}
