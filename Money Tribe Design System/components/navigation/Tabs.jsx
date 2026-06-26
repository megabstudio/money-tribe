import React from "react";

const TabsCtx = React.createContext(null);

/** Tabs root. Manages active tab (Radix-style). */
export function Tabs({ value, defaultValue, onValueChange, variant = "underline", style = {}, children }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onValueChange?.(v); };
  return (
    <TabsCtx.Provider value={{ current, select, variant }}>
      <div style={{ ...style }}>{children}</div>
    </TabsCtx.Provider>
  );
}

/** Row of tab triggers. */
export function TabsList({ style = {}, children }) {
  const ctx = React.useContext(TabsCtx);
  const pill = ctx?.variant === "pill";
  return (
    <div role="tablist" style={{
      display: "inline-flex",
      alignItems: "center",
      gap: pill ? "var(--space-1)" : "var(--space-1)",
      padding: pill ? "var(--space-1)" : 0,
      background: pill ? "var(--muted)" : "transparent",
      borderRadius: pill ? "var(--radius-pill)" : 0,
      borderBottom: pill ? "none" : "1.5px solid var(--border)",
      width: pill ? "auto" : "100%",
      ...style,
    }}>
      {children}
    </div>
  );
}

/** A single tab button. */
export function TabsTrigger({ value, disabled = false, children }) {
  const ctx = React.useContext(TabsCtx);
  const active = ctx?.current === value;
  const pill = ctx?.variant === "pill";
  return (
    <button
      role="tab"
      aria-selected={active}
      disabled={disabled}
      onClick={() => !disabled && ctx?.select(value)}
      style={{
        position: "relative",
        appearance: "none",
        padding: pill ? "var(--space-2) var(--space-4)" : "var(--space-3) var(--space-4)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? "var(--weight-bold)" : "var(--weight-semibold)",
        color: disabled ? "var(--text-disabled)" : (active ? (pill ? "var(--green-900)" : "var(--primary)") : "var(--muted-foreground)"),
        background: pill && active ? "var(--background)" : "transparent",
        border: "none",
        borderRadius: pill ? "var(--radius-pill)" : 0,
        boxShadow: pill && active ? "var(--shadow-sm)" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
        marginBottom: pill ? 0 : "-1.5px",
      }}
    >
      {children}
      {!pill && (
        <span style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2.5,
          borderRadius: "var(--radius-pill)",
          background: "var(--primary)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transition: "transform var(--duration-base) var(--ease-out)",
        }} />
      )}
    </button>
  );
}

/** Panel shown when its value matches the active tab. */
export function TabsContent({ value, style = {}, children }) {
  const ctx = React.useContext(TabsCtx);
  if (ctx?.current !== value) return null;
  return <div role="tabpanel" style={{ paddingTop: "var(--space-4)", ...style }}>{children}</div>;
}
