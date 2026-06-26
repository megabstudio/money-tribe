import React from "react";

/** Form label. Pairs with Input, Select, Checkbox, Radio, Switch. */
export function Label({ required = false, disabled = false, style = {}, children, ...props }) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        color: disabled ? "var(--text-disabled)" : "var(--text-body)",
        cursor: disabled ? "not-allowed" : "default",
        ...style,
      }}
      {...props}
    >
      {children}
      {required && <span style={{ color: "var(--destructive)" }}>*</span>}
    </label>
  );
}
