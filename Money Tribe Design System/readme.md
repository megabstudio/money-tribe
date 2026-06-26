# Money Tribe — Design System

A modern, rounded, **Shadcn/Radix-flavoured** component system for **Money Tribe**, a community savings product ("Save together, faster — join a tribe and hit your goal as a team"). Built from the brand's Figma elements file: a vivid-green palette, the Money Tribe logo, Plus Jakarta Sans + Poppins type, and an extensive rounded-button family — extended here into a full set of primitives (forms, navigation, overlay, layout) with **light + dark themes**.

## Sources
- **Figma:** `money-tribe-elements.fig` (attached, mounted read-only). One page, one frame ("Money Tribe logo") containing the logo, color/type specimens, and the button library (65 button variants: 6 colors × 5 corner radii × default/small/icon sizes).
- No codebase was provided. Product framing ("Join tribe", "Accept") is taken verbatim from the Figma button labels; the savings-circle product model is inferred from the brand name and is illustrative.

---

## Index / manifest
- `styles.css` — global entry point (imports only). **Consumers link this one file.**
- `tokens/` — `colors.css` (+ dark theme), `typography.css`, `spacing.css`, `radius.css`, `fonts.css`.
- `components/`
  - `forms/` — Button, IconButton, Input, Textarea, Label, Checkbox, RadioGroup + Radio, Switch, Select
  - `navigation/` — Tabs (+ TabsList/Trigger/Content)
  - `overlay/` — Dialog (modal)
  - `feedback/` — Badge
  - `layout/` — Card (+ CardHeader), Avatar (+ AvatarGroup)
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) for the Design System tab.
- `ui_kits/money-tribe-app/` — interactive savings-app recreation.
- `assets/` — `logo-mark.svg` (the Money Tribe mark, `fill: currentColor`).
- `SKILL.md` — Agent-Skill manifest. `IMPLEMENTATION.md` — drop-in guide for Claude Code on an existing project.

---

## CONTENT FUNDAMENTALS
- **Voice:** warm, plural, encouraging. The brand is about *togetherness* — "Save **together**, faster", "Join **tribe**", "hit your goal as a **team**". Lean on collective framing.
- **Person:** address the user as **you** ("Your pots", "You're 42% of the way there"). Refer to the group as **your tribe** / **members**.
- **Tone:** optimistic and plain-spoken, never preachy or finance-jargon-heavy. Short, active sentences. "Add to pot", "On track", "Almost there", "Behind".
- **Casing:** Sentence case everywhere — buttons, headings, labels ("Join tribe", "Add money", "Default goal"). Avoid Title Case and ALL-CAPS except tiny overline/eyebrow labels (uppercase, wide tracking).
- **Numbers/money:** GBP, `£` prefix, thousands separators (`£4,200`). Percentages are whole numbers ("42%").
- **Emoji:** none. The brand is clean and typographic.
- **Examples:** "Save together, faster" · "You'll stop contributing to the shared pot, but your saved balance stays yours." · "+£240 this wk".

---

## VISUAL FOUNDATIONS
- **Color:** a single confident brand hue — **green** — from vivid lime (`#5CD624`, `#3DBF00`) down to deep forest (`#0D2700`). Primary actions are bright green; the hero/"wealth" surface is near-black forest green. Neutrals are plain grays (`#E1E1E1`, `#999`, `#2C2C2C`). One soft light-green tint (`#D7F0DD`) for secondary fills and badges. Semantic red only for destructive/overdue.
- **Type:** **Manrope** for all UI and body (buttons are **Bold 700**, 16px default / 14px small, 24px line-height); **Bricolage Grotesque** for the wordmark and large display lockups. Headings use Manrope 700–800 with tight tracking.
- **Backgrounds:** flat and clean. Light theme is white / very-light-green-gray (`--surface-muted`). The app uses one subtle radial green wash behind the device. **No** photographic imagery, **no** loud gradients, **no** textures. The only "imagery" is the logo mark.
- **Corner radii:** soft and rounded is the default — controls `12px` (`--radius-md`), cards `16px` (`--radius-lg`), pills `999px`. The Figma exposes a full corner family (sharp/4/8/16/pill); `Button`/`IconButton` expose `shape="rounded|pill|sharp"` to honour it.
- **Cards:** white surface, `1.5px` hairline border (`--border`), `16px` radius, soft **forest-tinted** shadow (`--shadow-sm`); hover lifts `-2px` with `--shadow-md`. Selected state swaps the border to brand green.
- **Borders:** hairlines are `1.5px`. Inputs/controls use `--input` grey, brighten to `--ring` green on focus.
- **Shadows:** low, soft, tinted toward `rgba(13,39,0,…)` (forest) rather than neutral black — xs → xl scale.
- **Focus:** Radix-style — a `3px` ring at ~22–30% brand-green, applied on `:focus-visible`/keyboard focus, never a default browser outline.
- **Hover:** fills go one ramp-step darker (primary `green-500 → green-600`); ghost/outline pick up a faint `--muted` / `--green-50` wash.
- **Press:** buttons scale to `0.97` (subtle squash); switches/checks animate their knob/check.
- **Animation:** quick and gentle. Durations `120/180/280ms`; easing `cubic-bezier(0.16,1,0.3,1)` (out) for entrances. Dialog scales+fades in from `translateY(8px) scale(0.97)`. No bounces, no infinite loops.
- **Transparency/blur:** reserved for the modal overlay (forest-tinted scrim + `2px` backdrop blur). Otherwise surfaces are opaque.
- **Layout:** generous whitespace, 4px spacing grid. Mobile-first in the UI kit (390px frame, 44px+ hit targets, bottom tab bar).
- **Dark theme:** deep forest surfaces (`#0a1604` bg, `#11210a` cards); brand green brightens to `--green-400` so CTAs glow. Toggle via `<html data-theme="dark">`; apps can mirror the OS by syncing `data-theme` to `prefers-color-scheme` in JS (see IMPLEMENTATION.md §3).

---

## ICONOGRAPHY
- The Figma file ships **no icon system** — only a single search/magnifier glyph used inside the button specimens, plus the logo mark.
- **Substitution (flagged):** the UI kit uses a small, consistent **inline line-icon set** (1.8px stroke, round caps, 24px grid) for app chrome (home, tribe, pots, settings, bell, plus, target, arrows). These are placeholders matching the brand's clean line aesthetic — **please supply Money Tribe's real icon set** (or confirm a CDN library such as Lucide / Phosphor) and they'll be swapped.
- **No emoji, no unicode-as-icon.** Icons are SVG only.
- **Logo:** `assets/logo-mark.svg` is the actual Money Tribe mark (multi-arch "M", `fill: currentColor` so it themes — `--green-600` on light, `--green-400` on dark). The wordmark is set in Bricolage Grotesque; mark + "Money Tribe" stack or sit side-by-side (see Brand cards).

---

## Using the system
Link `styles.css`, load `_ds_bundle.js` (auto-generated), then read components off the global namespace:
```js
const { Button, Card, Dialog, Tabs, TabsList, TabsTrigger, RadioGroup, Radio } = window.MoneyTribeDesignSystem_5369ed;
```
For production React, see **IMPLEMENTATION.md**.
