import React from "react";

/**
 * Money Tribe Dialog (modal). Controlled via `open` + `onOpenChange`.
 * Renders an overlay + centered card with scale/fade entrance.
 */
export function Dialog({ open, onOpenChange, title, description, children, footer, size = "md", style = {} }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onOpenChange?.(false); };
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onOpenChange]);

  if (!open) return null;
  const widths = { sm: 360, md: 480, lg: 640 };

  return (
    <div
      onClick={() => onOpenChange?.(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
        background: "var(--overlay)",
        backdropFilter: "blur(2px)",
        animation: "mt-overlay-in var(--duration-base) var(--ease-out)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: widths[size],
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--surface-card)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          padding: "var(--space-6)",
          animation: "mt-dialog-in var(--duration-slow) var(--ease-out)",
          ...style,
        }}
      >
        {(title || onOpenChange) && (
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", marginBottom: description ? "var(--space-2)" : "var(--space-4)" }}>
            {title && <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-body)" }}>{title}</h2>}
            <button
              aria-label="Close"
              onClick={() => onOpenChange?.(false)}
              style={{ flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, marginTop: -2, border: "none", borderRadius: "var(--radius-pill)", background: "transparent", color: "var(--muted-foreground)", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--muted)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
            </button>
          </div>
        )}
        {description && <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: "var(--leading-normal)", marginBottom: "var(--space-5)" }}>{description}</p>}
        <div>{children}</div>
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>{footer}</div>}
      </div>
      <style>{`
        @keyframes mt-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mt-dialog-in { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
