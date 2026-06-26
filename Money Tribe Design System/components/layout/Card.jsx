import React from "react";

/** Surface container. Optional padding, hover lift, and selectable accent. */
export function Card({ padding = "lg", interactive = false, selected = false, style = {}, children, ...props }) {
  const pads = { none: 0, sm: "var(--space-3)", md: "var(--space-4)", lg: "var(--space-6)" };
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--surface-card)",
        color: "var(--surface-card-foreground)",
        border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        padding: pads[padding],
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/** Optional header row for a Card. */
export function CardHeader({ title, subtitle, action, style = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", marginBottom: "var(--space-4)", ...style }}>
      <div>
        {title && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-body)" }}>{title}</div>}
        {subtitle && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}
