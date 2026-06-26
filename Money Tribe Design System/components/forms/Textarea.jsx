import React from "react";

/** Multi-line text field matching Input styling. */
export function Textarea({ invalid = false, disabled = false, rows = 4, style = {}, ...props }) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : (focus ? "var(--ring)" : "var(--input)");
  return (
    <textarea
      rows={rows}
      disabled={disabled}
      onFocus={(e) => { setFocus(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocus(false); props.onBlur?.(e); }}
      style={{
        width: "100%",
        padding: "var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)",
        lineHeight: "var(--leading-normal)",
        color: "var(--text-body)",
        background: disabled ? "var(--muted)" : "var(--background)",
        border: `1.5px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        outline: "none",
        resize: "vertical",
        boxShadow: focus ? `0 0 0 var(--ring-width) color-mix(in srgb, ${invalid ? "var(--destructive)" : "var(--ring)"} 22%, transparent)` : "none",
        transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
        ...style,
      }}
      {...props}
    />
  );
}
