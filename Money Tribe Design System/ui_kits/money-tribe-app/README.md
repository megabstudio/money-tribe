# Money Tribe — App UI kit

A high-fidelity, click-through recreation of the **Money Tribe** savings-circle mobile app, composed entirely from the design-system primitives (`Button`, `Card`, `Tabs`, `Dialog`, `RadioGroup`, `Switch`, `Avatar`, `Badge`, …).

## Files
- `index.html` — mounts the interactive app inside a 390×800 phone frame. Loads `styles.css`, the DS bundle (`_ds_bundle.js`), then `AppScreens.jsx`.
- `AppScreens.jsx` — all screens + the app shell. Assigns `window.MoneyTribeApp` (no ES exports, so the DS bundler ignores it).

## Flow
1. **Auth** — Join screen with email/password + "Keep me signed in".
2. **Home** — total-saved hero (dark forest card), pot list with progress + member avatars, bottom tab bar.
3. **Pot detail** — progress hero, Members / Activity pill-tabs, and an **Add to pot** modal (`Dialog`) with amount + repeat `RadioGroup`.
4. **Settings** — saving toggles (`Switch`), default-goal `Select`, reminder `RadioGroup`.

Light/dark toggle is top-right (the whole kit honours `data-theme`).

## Notes
- The app's nav/utility icons are a small inline line-icon set. The Figma source ships **no icon system** (only a search glyph), so these are a flagged substitution — swap for the brand's real icons when available.
- Data is mocked; this kit demonstrates visual + interaction fidelity, not production logic.
