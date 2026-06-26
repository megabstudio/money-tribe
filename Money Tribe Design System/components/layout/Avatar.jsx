import React from "react";

/** Avatar — image with initials fallback and brand ring option. */
export function Avatar({ src, name = "", size = "md", ring = false, style = {} }) {
  const dims = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
  const d = dims[size] || dims.md;
  const initials = name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const [err, setErr] = React.useState(false);
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: d,
      height: d,
      flex: "none",
      borderRadius: "var(--radius-pill)",
      background: "var(--green-100)",
      color: "var(--green-800)",
      fontFamily: "var(--font-sans)",
      fontSize: d * 0.4,
      fontWeight: "var(--weight-bold)",
      overflow: "hidden",
      boxShadow: ring ? "0 0 0 2px var(--background), 0 0 0 4px var(--primary)" : "none",
      ...style,
    }}>
      {src && !err
        ? <img src={src} alt={name} onError={() => setErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : (initials || "?")}
    </span>
  );
}

/** Overlapping avatar group. */
export function AvatarGroup({ children, max = 4, size = "md" }) {
  const items = React.Children.toArray(children);
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  const dims = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
  const d = dims[size] || dims.md;
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      {shown.map((c, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -d * 0.3, borderRadius: "var(--radius-pill)", boxShadow: "0 0 0 2px var(--background)" }}>{c}</span>
      ))}
      {extra > 0 && (
        <span style={{ marginLeft: -d * 0.3, display: "inline-flex", alignItems: "center", justifyContent: "center", width: d, height: d, borderRadius: "var(--radius-pill)", background: "var(--muted)", color: "var(--text-subtle)", fontFamily: "var(--font-sans)", fontSize: d * 0.32, fontWeight: "var(--weight-bold)", boxShadow: "0 0 0 2px var(--background)" }}>+{extra}</span>
      )}
    </div>
  );
}
