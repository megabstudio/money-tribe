/* @ds-bundle: {"format":3,"namespace":"MoneyTribeDesignSystem_5369ed","components":[{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Label","sourcePath":"components/forms/Label.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Radio","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Avatar","sourcePath":"components/layout/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/layout/Avatar.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"CardHeader","sourcePath":"components/layout/Card.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TabsList","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TabsTrigger","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TabsContent","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"}],"sourceHashes":{"components/feedback/Badge.jsx":"a0f61d8936a4","components/forms/Button.jsx":"2129023e91f0","components/forms/Checkbox.jsx":"0d7a3060163d","components/forms/IconButton.jsx":"f80c7081c26d","components/forms/Input.jsx":"00085e38e43c","components/forms/Label.jsx":"d3db9c9b8e54","components/forms/RadioGroup.jsx":"7be7f8499508","components/forms/Select.jsx":"9c9eab9a43aa","components/forms/Switch.jsx":"debb10105ef6","components/forms/Textarea.jsx":"dddf2d070e7c","components/layout/Avatar.jsx":"0556ee862e73","components/layout/Card.jsx":"41a837da7553","components/navigation/Tabs.jsx":"4cbc991a9999","components/overlay/Dialog.jsx":"9385f474a2f1","ui_kits/money-tribe-app/AppScreens.jsx":"be7889114161"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MoneyTribeDesignSystem_5369ed = window.MoneyTribeDesignSystem_5369ed || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status / category label. */
function Badge({
  variant = "primary",
  size = "md",
  style = {},
  children,
  ...props
}) {
  const variants = {
    primary: {
      bg: "var(--green-100)",
      color: "var(--green-800)"
    },
    solid: {
      bg: "var(--primary)",
      color: "var(--primary-foreground)"
    },
    dark: {
      bg: "var(--green-900)",
      color: "#fff"
    },
    neutral: {
      bg: "var(--muted)",
      color: "var(--text-subtle)"
    },
    outline: {
      bg: "transparent",
      color: "var(--green-700)",
      border: "var(--primary)"
    },
    destructive: {
      bg: "color-mix(in srgb, var(--destructive) 14%, white)",
      color: "var(--destructive)"
    }
  };
  const v = variants[variant] || variants.primary;
  const sizes = {
    sm: {
      p: "2px 8px",
      f: "var(--text-2xs)"
    },
    md: {
      p: "3px 10px",
      f: "var(--text-xs)"
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Money Tribe Button.
 * Variants map to the Figma button family; shapes map to the corner set
 * (rounded / pill / sharp). Built on CSS custom properties from the DS.
 */
function Button({
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
    sm: {
      height: "var(--control-sm)",
      padding: "0 var(--space-4)",
      font: "var(--text-sm)",
      gap: "var(--space-2)"
    },
    md: {
      height: "var(--control-md)",
      padding: "0 var(--space-5)",
      font: "var(--text-sm)",
      gap: "var(--space-2)"
    },
    lg: {
      height: "var(--control-lg)",
      padding: "0 var(--space-8)",
      font: "var(--text-base)",
      gap: "var(--space-3)"
    }
  };
  const variants = {
    primary: {
      bg: "var(--primary)",
      color: "var(--primary-foreground)",
      border: "transparent",
      hoverBg: "var(--primary-hover)"
    },
    secondary: {
      bg: "var(--secondary)",
      color: "var(--secondary-foreground)",
      border: "transparent",
      hoverBg: "var(--secondary-hover)"
    },
    dark: {
      bg: "var(--green-900)",
      color: "#ffffff",
      border: "transparent",
      hoverBg: "var(--green-800)"
    },
    outline: {
      bg: "transparent",
      color: "var(--primary)",
      border: "var(--primary)",
      hoverBg: "var(--green-50)"
    },
    "outline-dark": {
      bg: "transparent",
      color: "var(--green-900)",
      border: "var(--green-900)",
      hoverBg: "var(--neutral-50)"
    },
    ghost: {
      bg: "transparent",
      color: "var(--green-900)",
      border: "transparent",
      hoverBg: "var(--muted)"
    }
  };
  const radii = {
    rounded: "var(--radius-md)",
    pill: "var(--radius-pill)",
    sharp: "var(--radius-none)"
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
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
      background: disabled ? "var(--surface-disabled)" : hover && !disabled ? v.hoverBg : v.bg,
      border: `1.5px solid ${disabled ? "transparent" : v.border === "transparent" ? "transparent" : v.border}`,
      borderRadius: radii[shape] || radii.rounded,
      cursor: disabled ? "not-allowed" : "pointer",
      transform: active && !disabled ? "scale(0.97)" : "scale(1)",
      transition: "background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
      outline: "none",
      userSelect: "none",
      ...style
    },
    onFocus: e => {
      if (!disabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-offset) var(--background), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) color-mix(in srgb, var(--ring) 45%, transparent)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, props), leftIcon, children, rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Money Tribe checkbox with animated brand checkmark (Radix-style). */
function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label = null,
  id,
  style = {},
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const dims = {
    sm: 16,
    md: 20,
    lg: 24
  };
  const d = dims[size] || dims.md;
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  const box = /*#__PURE__*/React.createElement("span", _extends({
    role: "checkbox",
    "aria-checked": on,
    "aria-disabled": disabled,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      width: d,
      height: d,
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${on ? "var(--primary)" : "var(--border-strong)"}`,
      background: disabled ? "var(--muted)" : on ? "var(--primary)" : "var(--background)",
      color: "var(--primary-foreground)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
      outline: "none",
      ...style
    },
    onFocus: e => {
      if (!disabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 30%, transparent)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, props), /*#__PURE__*/React.createElement("svg", {
    width: d * 0.66,
    height: d * 0.66,
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      opacity: on ? 1 : 0,
      transform: on ? "scale(1)" : "scale(0.6)",
      transition: "opacity var(--duration-fast) var(--ease-out), transform var(--duration-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.5 4.5 6.5 11.5 2.5 7.5",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  if (label == null) return box;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer"
    },
    onClick: toggle
  }, box, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: disabled ? "var(--text-disabled)" : "var(--text-body)",
      userSelect: "none"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Money Tribe IconButton — square button for a single icon.
 * Mirrors Button variants/shapes from the Figma "Button-icon" family.
 */
function IconButton({
  variant = "primary",
  size = "md",
  shape = "rounded",
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  children,
  ...props
}) {
  const dims = {
    sm: "var(--control-sm)",
    md: "var(--control-md)",
    lg: "var(--control-lg)"
  };
  const iconSize = {
    sm: 16,
    md: 18,
    lg: 22
  };
  const variants = {
    primary: {
      bg: "var(--primary)",
      color: "var(--primary-foreground)",
      border: "transparent",
      hoverBg: "var(--primary-hover)"
    },
    secondary: {
      bg: "var(--secondary)",
      color: "var(--secondary-foreground)",
      border: "transparent",
      hoverBg: "var(--secondary-hover)"
    },
    dark: {
      bg: "var(--green-900)",
      color: "#ffffff",
      border: "transparent",
      hoverBg: "var(--green-800)"
    },
    outline: {
      bg: "transparent",
      color: "var(--primary)",
      border: "var(--primary)",
      hoverBg: "var(--green-50)"
    },
    "outline-dark": {
      bg: "transparent",
      color: "var(--green-900)",
      border: "var(--green-900)",
      hoverBg: "var(--neutral-50)"
    },
    ghost: {
      bg: "transparent",
      color: "var(--green-900)",
      border: "transparent",
      hoverBg: "var(--muted)"
    }
  };
  const radii = {
    rounded: "var(--radius-md)",
    pill: "var(--radius-pill)",
    sharp: "var(--radius-none)"
  };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dims[size],
      height: dims[size],
      padding: 0,
      color: disabled ? "var(--text-disabled)" : v.color,
      background: disabled ? "var(--surface-disabled)" : hover && !disabled ? v.hoverBg : v.bg,
      border: `1.5px solid ${v.border === "transparent" ? "transparent" : v.border}`,
      borderRadius: radii[shape] || radii.rounded,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
      outline: "none",
      ...style
    }
  }, props), React.isValidElement(children) ? React.cloneElement(children, {
    width: iconSize[size],
    height: iconSize[size]
  }) : children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Money Tribe text input — Radix/shadcn-style field with focus ring. */
function Input({
  size = "md",
  invalid = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  style = {},
  ...props
}) {
  const heights = {
    sm: "var(--control-sm)",
    md: "var(--control-md)",
    lg: "var(--control-lg)"
  };
  const [focus, setFocus] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : focus ? "var(--ring)" : "var(--input)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%"
    }
  }, leftIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "var(--space-3)",
      display: "inline-flex",
      color: "var(--muted-foreground)",
      pointerEvents: "none"
    }
  }, leftIcon), /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
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
      ...style
    }
  }, props)), rightIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "var(--space-3)",
      display: "inline-flex",
      color: "var(--muted-foreground)"
    }
  }, rightIcon));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Form label. Pairs with Input, Select, Checkbox, Radio, Switch. */
function Label({
  required = false,
  disabled = false,
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: disabled ? "var(--text-disabled)" : "var(--text-body)",
      cursor: disabled ? "not-allowed" : "default",
      ...style
    }
  }, props), children, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--destructive)"
    }
  }, "*"));
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Label.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
const RadioCtx = React.createContext(null);

/** RadioGroup — wraps Radio children, manages selection (Radix-style). */
function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  orientation = "vertical",
  style = {},
  children
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const select = v => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return /*#__PURE__*/React.createElement(RadioCtx.Provider, {
    value: {
      current,
      select,
      groupDisabled: disabled
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: orientation === "horizontal" ? "row" : "column",
      gap: "var(--space-3)",
      ...style
    }
  }, children));
}

/** Radio — single option. Must be inside a RadioGroup. */
function Radio({
  value,
  label = null,
  disabled = false,
  size = "md",
  style = {}
}) {
  const ctx = React.useContext(RadioCtx);
  const dims = {
    sm: 16,
    md: 20,
    lg: 24
  };
  const d = dims[size] || dims.md;
  const selected = ctx?.current === value;
  const isDisabled = disabled || ctx?.groupDisabled;
  const dot = /*#__PURE__*/React.createElement("span", {
    role: "radio",
    "aria-checked": selected,
    "aria-disabled": isDisabled,
    tabIndex: isDisabled ? -1 : 0,
    onClick: () => !isDisabled && ctx?.select(value),
    onKeyDown: e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        ctx?.select(value);
      }
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      width: d,
      height: d,
      borderRadius: "var(--radius-pill)",
      border: `1.5px solid ${selected ? "var(--primary)" : "var(--border-strong)"}`,
      background: isDisabled ? "var(--muted)" : "var(--background)",
      cursor: isDisabled ? "not-allowed" : "pointer",
      transition: "border-color var(--duration-fast) var(--ease-out)",
      outline: "none",
      ...style
    },
    onFocus: e => {
      if (!isDisabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 30%, transparent)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: d * 0.5,
      height: d * 0.5,
      borderRadius: "var(--radius-pill)",
      background: "var(--primary)",
      transform: selected ? "scale(1)" : "scale(0)",
      transition: "transform var(--duration-base) var(--ease-out)"
    }
  }));
  if (label == null) return dot;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: isDisabled ? "not-allowed" : "pointer"
    }
  }, dot, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: isDisabled ? "var(--text-disabled)" : "var(--text-body)",
      userSelect: "none"
    }
  }, label));
}
Object.assign(__ds_scope, { RadioGroup, Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** Money Tribe Select — custom dropdown (Radix-style trigger + popover). */
function Select({
  value,
  defaultValue,
  onValueChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  size = "md",
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const heights = {
    sm: "var(--control-sm)",
    md: "var(--control-md)",
    lg: "var(--control-lg)"
  };
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const selected = options.find(o => o.value === current);
  const choose = v => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => !disabled && setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-2)",
      width: "100%",
      height: heights[size],
      padding: "0 var(--space-3)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: selected ? "var(--text-body)" : "var(--muted-foreground)",
      background: disabled ? "var(--muted)" : "var(--background)",
      border: `1.5px solid ${open ? "var(--ring)" : "var(--input)"}`,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      outline: "none",
      boxShadow: open ? "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 22%, transparent)" : "none",
      transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      flex: "none",
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "var(--muted-foreground)",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: 0,
      right: 0,
      zIndex: 50,
      padding: "var(--space-1)",
      background: "var(--surface-popover)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      maxHeight: 260,
      overflowY: "auto"
    }
  }, options.map(o => {
    const active = o.value === current;
    return /*#__PURE__*/React.createElement("div", {
      key: o.value,
      onClick: () => choose(o.value),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-2) var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
        color: active ? "var(--primary)" : "var(--text-body)",
        background: active ? "var(--green-50)" : "transparent",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer"
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = "var(--muted)";
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }
    }, o.label, active && /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 16 16",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M13.5 4.5 6.5 11.5 2.5 7.5",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })));
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Money Tribe toggle switch (Radix-style). */
function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label = null,
  style = {},
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const dims = {
    sm: {
      w: 32,
      h: 18
    },
    md: {
      w: 40,
      h: 22
    },
    lg: {
      w: 48,
      h: 26
    }
  };
  const {
    w,
    h
  } = dims[size] || dims.md;
  const pad = 2;
  const knob = h - pad * 2;
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  const track = /*#__PURE__*/React.createElement("span", _extends({
    role: "switch",
    "aria-checked": on,
    "aria-disabled": disabled,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      flex: "none",
      width: w,
      height: h,
      borderRadius: "var(--radius-pill)",
      background: disabled ? "var(--surface-disabled)" : on ? "var(--primary)" : "var(--border-strong)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--duration-base) var(--ease-out)",
      outline: "none",
      ...style
    },
    onFocus: e => {
      if (!disabled) e.currentTarget.style.boxShadow = "0 0 0 var(--ring-width) color-mix(in srgb, var(--ring) 30%, transparent)";
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = "none";
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: pad,
      left: pad,
      width: knob,
      height: knob,
      borderRadius: "var(--radius-pill)",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transform: on ? `translateX(${w - knob - pad * 2}px)` : "translateX(0)",
      transition: "transform var(--duration-base) var(--ease-out)"
    }
  }));
  if (label == null) return track;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, track, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: disabled ? "var(--text-disabled)" : "var(--text-body)",
      userSelect: "none"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text field matching Input styling. */
function Textarea({
  invalid = false,
  disabled = false,
  rows = 4,
  style = {},
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : focus ? "var(--ring)" : "var(--input)";
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
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
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/layout/Avatar.jsx
try { (() => {
/** Avatar — image with initials fallback and brand ring option. */
function Avatar({
  src,
  name = "",
  size = "md",
  ring = false,
  style = {}
}) {
  const dims = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72
  };
  const d = dims[size] || dims.md;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const [err, setErr] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      ...style
    }
  }, src && !err ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    onError: () => setErr(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "?");
}

/** Overlapping avatar group. */
function AvatarGroup({
  children,
  max = 4,
  size = "md"
}) {
  const items = React.Children.toArray(children);
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  const dims = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72
  };
  const d = dims[size] || dims.md;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center"
    }
  }, shown.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -d * 0.3,
      borderRadius: "var(--radius-pill)",
      boxShadow: "0 0 0 2px var(--background)"
    }
  }, c)), extra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -d * 0.3,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: d,
      height: d,
      borderRadius: "var(--radius-pill)",
      background: "var(--muted)",
      color: "var(--text-subtle)",
      fontFamily: "var(--font-sans)",
      fontSize: d * 0.32,
      fontWeight: "var(--weight-bold)",
      boxShadow: "0 0 0 2px var(--background)"
    }
  }, "+", extra));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. Optional padding, hover lift, and selectable accent. */
function Card({
  padding = "lg",
  interactive = false,
  selected = false,
  style = {},
  children,
  ...props
}) {
  const pads = {
    none: 0,
    sm: "var(--space-3)",
    md: "var(--space-4)",
    lg: "var(--space-6)"
  };
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--surface-card)",
      color: "var(--surface-card-foreground)",
      border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      padding: pads[padding],
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      transform: hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, props), children);
}

/** Optional header row for a Card. */
function CardHeader({
  title,
  subtitle,
  action,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      marginBottom: "var(--space-4)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-body)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--muted-foreground)",
      marginTop: 2
    }
  }, subtitle)), action);
}
Object.assign(__ds_scope, { Card, CardHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const TabsCtx = React.createContext(null);

/** Tabs root. Manages active tab (Radix-style). */
function Tabs({
  value,
  defaultValue,
  onValueChange,
  variant = "underline",
  style = {},
  children
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return /*#__PURE__*/React.createElement(TabsCtx.Provider, {
    value: {
      current,
      select,
      variant
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, children));
}

/** Row of tab triggers. */
function TabsList({
  style = {},
  children
}) {
  const ctx = React.useContext(TabsCtx);
  const pill = ctx?.variant === "pill";
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: pill ? "var(--space-1)" : "var(--space-1)",
      padding: pill ? "var(--space-1)" : 0,
      background: pill ? "var(--muted)" : "transparent",
      borderRadius: pill ? "var(--radius-pill)" : 0,
      borderBottom: pill ? "none" : "1.5px solid var(--border)",
      width: pill ? "auto" : "100%",
      ...style
    }
  }, children);
}

/** A single tab button. */
function TabsTrigger({
  value,
  disabled = false,
  children
}) {
  const ctx = React.useContext(TabsCtx);
  const active = ctx?.current === value;
  const pill = ctx?.variant === "pill";
  return /*#__PURE__*/React.createElement("button", {
    role: "tab",
    "aria-selected": active,
    disabled: disabled,
    onClick: () => !disabled && ctx?.select(value),
    style: {
      position: "relative",
      appearance: "none",
      padding: pill ? "var(--space-2) var(--space-4)" : "var(--space-3) var(--space-4)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: active ? "var(--weight-bold)" : "var(--weight-semibold)",
      color: disabled ? "var(--text-disabled)" : active ? pill ? "var(--green-900)" : "var(--primary)" : "var(--muted-foreground)",
      background: pill && active ? "var(--background)" : "transparent",
      border: "none",
      borderRadius: pill ? "var(--radius-pill)" : 0,
      boxShadow: pill && active ? "var(--shadow-sm)" : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
      marginBottom: pill ? 0 : "-1.5px"
    }
  }, children, !pill && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 2.5,
      borderRadius: "var(--radius-pill)",
      background: "var(--primary)",
      transform: active ? "scaleX(1)" : "scaleX(0)",
      transition: "transform var(--duration-base) var(--ease-out)"
    }
  }));
}

/** Panel shown when its value matches the active tab. */
function TabsContent({
  value,
  style = {},
  children
}) {
  const ctx = React.useContext(TabsCtx);
  if (ctx?.current !== value) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "tabpanel",
    style: {
      paddingTop: "var(--space-4)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tabs, TabsList, TabsTrigger, TabsContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
/**
 * Money Tribe Dialog (modal). Controlled via `open` + `onOpenChange`.
 * Renders an overlay + centered card with scale/fade entrance.
 */
function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  style = {}
}) {
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") onOpenChange?.(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onOpenChange]);
  if (!open) return null;
  const widths = {
    sm: 360,
    md: 480,
    lg: 640
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpenChange?.(false),
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-4)",
      background: "var(--overlay)",
      backdropFilter: "blur(2px)",
      animation: "mt-overlay-in var(--duration-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: widths[size],
      maxHeight: "90vh",
      overflowY: "auto",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xl)",
      padding: "var(--space-6)",
      animation: "mt-dialog-in var(--duration-slow) var(--ease-out)",
      ...style
    }
  }, (title || onOpenChange) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      marginBottom: description ? "var(--space-2)" : "var(--space-4)"
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-body)"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Close",
    onClick: () => onOpenChange?.(false),
    style: {
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      marginTop: -2,
      border: "none",
      borderRadius: "var(--radius-pill)",
      background: "transparent",
      color: "var(--muted-foreground)",
      cursor: "pointer"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--muted)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  })))), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--muted-foreground)",
      lineHeight: "var(--leading-normal)",
      marginBottom: "var(--space-5)"
    }
  }, description), /*#__PURE__*/React.createElement("div", null, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-2)",
      marginTop: "var(--space-6)"
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, `
        @keyframes mt-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mt-dialog-in { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: none; } }
      `));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/money-tribe-app/AppScreens.jsx
try { (() => {
// Money Tribe — finance app UI kit.
// Screens are assigned to window (NO exports) so the DS bundler ignores them.
// Composes the published Money Tribe primitives from the DS bundle.
(function () {
  const DS = window.MoneyTribeDesignSystem_5369ed;
  const {
    Button,
    IconButton,
    Input,
    Checkbox,
    RadioGroup,
    Radio,
    Switch,
    Select,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Dialog,
    Badge,
    Card,
    CardHeader,
    Avatar,
    AvatarGroup,
    Label
  } = DS;

  // ── Minimal line-icon set (no icon system exists in the Figma; flagged in README) ──
  const Icon = ({
    d,
    size = 22,
    sw = 1.8,
    fill = "none"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, d);
  const Icons = {
    home: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M3 10.5 12 3l9 7.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 9.5V20h14V9.5"
      }))
    }),
    tribe: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "8",
        r: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 5.5a3 3 0 0 1 0 5.8"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 20c0-2.4-1.4-4.5-3.5-5.4"
      }))
    }),
    pots: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
        x: "4",
        y: "8",
        width: "16",
        height: "12",
        rx: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 8V6a4 4 0 0 1 8 0v2"
      }))
    }),
    cog: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
      }))
    }),
    plus: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14M5 12h14"
      }),
      sw: 2.2
    }),
    bell: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10 20a2 2 0 0 0 4 0"
      }))
    }),
    arrow: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement("path", {
        d: "M5 12h14M13 6l6 6-6 6"
      }),
      sw: 2
    }),
    back: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement("path", {
        d: "M19 12H5M11 6l-6 6 6 6"
      }),
      sw: 2
    }),
    bolt: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement("path", {
        d: "M13 2 4 14h7l-1 8 9-12h-7z"
      }),
      fill: "currentColor",
      sw: 0
    }),
    target: /*#__PURE__*/React.createElement(Icon, {
      d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "1.4",
        fill: "currentColor"
      }))
    })
  };
  const money = n => "£" + n.toLocaleString("en-GB");

  // ───────────────────────────── AUTH ─────────────────────────────
  function AuthScreen({
    onJoin
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 24px",
        background: "var(--background)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.svg",
      alt: "",
      style: {
        width: 64,
        height: 64,
        color: "var(--green-600)",
        marginBottom: 8
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 30,
        fontWeight: 600,
        color: "var(--green-800)",
        lineHeight: 1.05
      }
    }, "Money Tribe"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        color: "var(--text-subtle)",
        maxWidth: 260,
        marginTop: 6
      }
    }, "Save together, faster. Join a circle and hit your goal as a team.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        paddingBottom: 8
      }
    }, /*#__PURE__*/React.createElement(Label, {
      htmlFor: "email"
    }, "Email"), /*#__PURE__*/React.createElement(Input, {
      id: "email",
      size: "lg",
      placeholder: "you@email.com",
      defaultValue: "ada@moneytribe.app"
    }), /*#__PURE__*/React.createElement(Label, {
      htmlFor: "pw"
    }, "Password"), /*#__PURE__*/React.createElement(Input, {
      id: "pw",
      size: "lg",
      type: "password",
      defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: "Keep me signed in",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 28,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      onClick: onJoin
    }, "Join tribe"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "lg",
      fullWidth: true
    }, "Create account")));
  }

  // ───────────────────────────── HOME ─────────────────────────────
  const POTS = [{
    id: "house",
    name: "House deposit",
    saved: 4200,
    goal: 10000,
    members: 6,
    status: "On track"
  }, {
    id: "trip",
    name: "Summer trip",
    saved: 1850,
    goal: 2400,
    members: 4,
    status: "Almost there"
  }, {
    id: "rainy",
    name: "Rainy day",
    saved: 760,
    goal: 3000,
    members: 2,
    status: "Behind"
  }];
  function Progress({
    value
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        borderRadius: 99,
        background: "var(--muted)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: value + "%",
        height: "100%",
        background: "var(--primary)",
        borderRadius: 99,
        transition: "width .5s var(--ease-out)"
      }
    }));
  }
  function HomeScreen({
    onOpenPot
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        overflowY: "auto",
        background: "var(--surface-muted)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Ada Lin",
      ring: true
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-subtle)"
      }
    }, "Good morning"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: "var(--text-body)"
      }
    }, "Ada"))), /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "Notifications",
      variant: "ghost"
    }, Icons.bell)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        background: "var(--green-900)",
        border: "none",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--green-200)"
      }
    }, "Total saved"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 34,
        fontWeight: 800,
        fontFamily: "var(--font-display)",
        marginTop: 2
      }
    }, money(6810))), /*#__PURE__*/React.createElement(Badge, {
      variant: "solid",
      style: {
        background: "var(--green-400)",
        color: "var(--green-900)"
      }
    }, "+\xA3240 this wk")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      leftIcon: Icons.plus
    }, "Add money"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      style: {
        color: "#fff",
        borderColor: "rgba(255,255,255,.4)"
      }
    }, "Transfer")))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 20px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        color: "var(--text-body)"
      }
    }, "Your pots"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      rightIcon: Icons.arrow
    }, "See all")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "0 20px 24px"
      }
    }, POTS.map(p => {
      const pct = Math.round(p.saved / p.goal * 100);
      return /*#__PURE__*/React.createElement(Card, {
        key: p.id,
        interactive: true,
        onClick: () => onOpenPot(p),
        padding: "md"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: 12,
          background: "var(--green-100)",
          color: "var(--green-700)"
        }
      }, Icons.target), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "var(--text-body)"
        }
      }, p.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "var(--text-subtle)"
        }
      }, money(p.saved), " of ", money(p.goal)))), /*#__PURE__*/React.createElement(Badge, {
        variant: p.status === "Behind" ? "destructive" : "primary"
      }, p.status)), /*#__PURE__*/React.createElement(Progress, {
        value: pct
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement(AvatarGroup, {
        max: 4,
        size: "xs"
      }, Array.from({
        length: p.members
      }).map((_, i) => /*#__PURE__*/React.createElement(Avatar, {
        key: i,
        name: ["Ada Lin", "Ben Ojo", "Cai Wu", "Dee Roy", "Eli Fox", "Fae Ito"][i % 6],
        size: "xs"
      }))), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: "var(--primary)"
        }
      }, pct, "%")));
    })));
  }

  // ─────────────────────────── POT DETAIL ──────────────────────────
  function PotScreen({
    pot,
    onBack
  }) {
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState("50");
    const [freq, setFreq] = React.useState("weekly");
    const pct = Math.round(pot.saved / pot.goal * 100);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        overflowY: "auto",
        background: "var(--background)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        position: "sticky",
        top: 0,
        background: "var(--background)",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "Back",
      variant: "ghost",
      onClick: onBack
    }, Icons.back), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        color: "var(--text-body)"
      }
    }, pot.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-subtle)"
      }
    }, "Saved together"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        fontWeight: 800,
        fontFamily: "var(--font-display)",
        color: "var(--green-700)"
      }
    }, money(pot.saved)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-subtle)",
        marginBottom: 14
      }
    }, "of ", money(pot.goal), " goal \xB7 ", pct, "%"), /*#__PURE__*/React.createElement(Progress, {
      value: pct
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      leftIcon: Icons.plus,
      onClick: () => setOpen(true)
    }, "Add to pot")))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      defaultValue: "members",
      variant: "pill"
    }, /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
      value: "members"
    }, "Members"), /*#__PURE__*/React.createElement(TabsTrigger, {
      value: "activity"
    }, "Activity")), /*#__PURE__*/React.createElement(TabsContent, {
      value: "members"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, ["Ada Lin", "Ben Ojo", "Cai Wu", "Dee Roy", "Eli Fox", "Fae Ito"].slice(0, pot.members).map((n, i) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 4px",
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: n,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 14,
        fontWeight: 600,
        color: "var(--text-body)"
      }
    }, n, i === 0 ? " (you)" : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "var(--text-subtle)"
      }
    }, money([1200, 980, 860, 740, 620, 410][i] || 200)))))), /*#__PURE__*/React.createElement(TabsContent, {
      value: "activity"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, [["Ben added money", "+£120", "2h ago"], ["Auto round-up", "+£3.40", "Today"], ["Cai added money", "+£60", "Yesterday"]].map(([t, a, w]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 4px",
        borderBottom: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--text-body)"
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-subtle)"
      }
    }, w)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: "var(--primary)"
      }
    }, a))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 24
      }
    }), /*#__PURE__*/React.createElement(Dialog, {
      open: open,
      onOpenChange: setOpen,
      title: "Add to pot",
      description: `Contribute to ${pot.name}.`,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        onClick: () => setOpen(false)
      }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        onClick: () => setOpen(false)
      }, "Add ", money(Number(amount) || 0)))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Amount"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(Input, {
      size: "lg",
      value: amount,
      onChange: e => setAmount(e.target.value.replace(/[^0-9]/g, "")),
      leftIcon: /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 800
        }
      }, "\xA3")
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Repeat"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(RadioGroup, {
      value: freq,
      onValueChange: setFreq,
      orientation: "horizontal"
    }, /*#__PURE__*/React.createElement(Radio, {
      value: "once",
      label: "Once"
    }), /*#__PURE__*/React.createElement(Radio, {
      value: "weekly",
      label: "Weekly"
    }), /*#__PURE__*/React.createElement(Radio, {
      value: "payday",
      label: "Payday"
    })))))));
  }

  // ─────────────────────────── SETTINGS ────────────────────────────
  function SettingsScreen() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        overflowY: "auto",
        background: "var(--surface-muted)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0",
        fontSize: 22,
        fontWeight: 800,
        fontFamily: "var(--font-display)",
        color: "var(--text-body)"
      }
    }, "Settings"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: "md"
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Saving"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      label: "Round up purchases",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Switch, {
      label: "Auto-save on payday",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Switch, {
      label: "Weekly summary email"
    }))), /*#__PURE__*/React.createElement(Card, {
      padding: "md"
    }, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Default goal"
    }), /*#__PURE__*/React.createElement(Select, {
      defaultValue: "house",
      options: [{
        value: "house",
        label: "House deposit"
      }, {
        value: "trip",
        label: "Summer trip"
      }, {
        value: "rainy",
        label: "Rainy day"
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Label, null, "Reminders"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(RadioGroup, {
      defaultValue: "weekly"
    }, /*#__PURE__*/React.createElement(Radio, {
      value: "daily",
      label: "Daily"
    }), /*#__PURE__*/React.createElement(Radio, {
      value: "weekly",
      label: "Weekly"
    }), /*#__PURE__*/React.createElement(Radio, {
      value: "off",
      label: "Off"
    }))))), /*#__PURE__*/React.createElement(Button, {
      variant: "outline-dark",
      size: "lg",
      fullWidth: true
    }, "Log out")));
  }

  // ───────────────────────────── SHELL ─────────────────────────────
  function App() {
    const [authed, setAuthed] = React.useState(false);
    const [tab, setTab] = React.useState("home");
    const [pot, setPot] = React.useState(null);
    let screen;
    if (!authed) screen = /*#__PURE__*/React.createElement(AuthScreen, {
      onJoin: () => setAuthed(true)
    });else if (pot) screen = /*#__PURE__*/React.createElement(PotScreen, {
      pot: pot,
      onBack: () => setPot(null)
    });else if (tab === "home") screen = /*#__PURE__*/React.createElement(HomeScreen, {
      onOpenPot: setPot
    });else if (tab === "tribe") screen = /*#__PURE__*/React.createElement(HomeScreen, {
      onOpenPot: setPot
    });else if (tab === "settings") screen = /*#__PURE__*/React.createElement(SettingsScreen, null);
    const nav = [["home", "Home", Icons.home], ["pots", "Pots", Icons.pots], ["tribe", "Tribe", Icons.tribe], ["settings", "Settings", Icons.cog]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 390,
        height: 800,
        background: "var(--background)",
        borderRadius: 40,
        overflow: "hidden",
        boxShadow: "var(--shadow-xl)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }
    }, screen), authed && !pot && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 8px 22px",
        background: "var(--surface-card)",
        borderTop: "1px solid var(--border)"
      }
    }, nav.map(([id, label, icon]) => {
      const active = tab === id;
      return /*#__PURE__*/React.createElement("button", {
        key: id,
        onClick: () => setTab(id),
        style: {
          border: "none",
          background: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
          color: active ? "var(--primary)" : "var(--muted-foreground)",
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 700
        }
      }, icon, label);
    })));
  }
  window.MoneyTribeApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/money-tribe-app/AppScreens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TabsList = __ds_scope.TabsList;

__ds_ns.TabsTrigger = __ds_scope.TabsTrigger;

__ds_ns.TabsContent = __ds_scope.TabsContent;

__ds_ns.Dialog = __ds_scope.Dialog;

})();
