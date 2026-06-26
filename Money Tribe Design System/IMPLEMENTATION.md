# Implementing the Money Tribe Design System with Claude Code

A step-by-step guide for dropping this system into an **existing** project. Paste this file (and the rest of the folder) into your repo, then point Claude Code at it.

> **Stack assumption:** React + a bundler that can import CSS (Vite, Next, CRA, etc.). The components are plain React + inline styles driven by CSS custom properties — **no runtime CSS-in-JS, no UI libraries, no dependencies beyond `react`.** They work in any React app and degrade to system fonts/colors if the tokens aren't loaded.

---

## 1. Copy the files in

```
your-app/
  src/
    design-system/
      tokens/         ← copy tokens/*.css
      components/     ← copy components/** (.jsx files; drop the .d.ts/.prompt.md/.card.html unless you want them)
      assets/         ← copy assets/logo-mark.svg
      styles.css      ← copy styles.css (the @import entry point)
```

If your bundler can't resolve the bare `@import "tokens/colors.css"` paths, make them relative (`@import "./tokens/colors.css";`).

## 2. Load the global stylesheet once

In your app entry (e.g. `main.tsx` / `_app.tsx` / root layout):

```js
import "./design-system/styles.css";
```

This pulls in the fonts (Manrope + Bricolage Grotesque from Google Fonts), all tokens, the dark-theme overrides, and a tiny base reset. **To self-host fonts** (recommended for production), replace the `@import url(...)` in `tokens/fonts.css` with local `@font-face` rules and ship the font files.

## 3. Wire up theming

Themes are pure CSS — no provider needed. Set an attribute on `<html>`:

```js
// Force a theme:
document.documentElement.setAttribute("data-theme", "dark");  // or "light"

// Or follow the OS (run before first paint):
const m = matchMedia("(prefers-color-scheme: dark)");
const sync = () => document.documentElement.dataset.theme = m.matches ? "dark" : "light";
sync(); m.addEventListener("change", sync);
```

A minimal toggle hook:

```jsx
function useTheme() {
  const [theme, setTheme] = React.useState(() =>
    document.documentElement.getAttribute("data-theme") || "light");
  React.useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  return [theme, () => setTheme(t => t === "dark" ? "light" : "dark")];
}
```

All components read **semantic tokens** (`--primary`, `--surface-card`, `--border`, …), so they re-theme automatically — you never branch on theme in component code.

## 4. Use components

Each component is a named export from its own file:

```jsx
import { Button } from "./design-system/components/forms/Button.jsx";
import { Card, CardHeader } from "./design-system/components/layout/Card.jsx";
import { Dialog } from "./design-system/components/overlay/Dialog.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./design-system/components/navigation/Tabs.jsx";
import { RadioGroup, Radio } from "./design-system/components/forms/RadioGroup.jsx";

function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <Card>
      <CardHeader title="House deposit" subtitle="£4,200 of £10,000" />
      <Tabs defaultValue="save" variant="pill">
        <TabsList>
          <TabsTrigger value="save">Save</TabsTrigger>
          <TabsTrigger value="spend">Spend</TabsTrigger>
        </TabsList>
        <TabsContent value="save">…</TabsContent>
        <TabsContent value="spend">…</TabsContent>
      </Tabs>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>Add money</Button>
      <Dialog open={open} onOpenChange={setOpen} title="Add to pot"
        footer={<Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>}>
        <RadioGroup defaultValue="weekly">
          <Radio value="once" label="Once" />
          <Radio value="weekly" label="Weekly" />
        </RadioGroup>
      </Dialog>
    </Card>
  );
}
```

### Component cheat-sheet
| Component | Key props |
|---|---|
| `Button` / `IconButton` | `variant` (primary, secondary, dark, outline, outline-dark, ghost) · `size` (sm/md/lg) · `shape` (rounded/pill/sharp) · `fullWidth` · `leftIcon`/`rightIcon` |
| `Input` / `Textarea` | `size` · `invalid` · `leftIcon`/`rightIcon` |
| `Checkbox` / `Switch` | `checked` · `onCheckedChange` · `label` · `size` |
| `RadioGroup` + `Radio` | group: `value`/`onValueChange`/`orientation`; radio: `value`/`label` |
| `Select` | `options: {value,label}[]` · `value`/`onValueChange` |
| `Tabs` | `variant` (underline/pill) · `value`/`onValueChange` + `TabsList`/`TabsTrigger`/`TabsContent` |
| `Dialog` | `open` · `onOpenChange` · `title`/`description`/`footer` · `size` |
| `Card` (+ `CardHeader`) | `padding` · `interactive` · `selected` |
| `Badge` | `variant` (primary, solid, dark, neutral, outline, destructive) · `size` |
| `Avatar` (+ `AvatarGroup`) | `name` · `src` · `size` · `ring` |

## 5. TypeScript

`.d.ts` files ship next to each component with full prop types. Keep them alongside the `.jsx` (or rename `.jsx → .tsx` and inline the types). If you only copied the `.jsx` files, the components still work — you just lose the typings.

## 6. Brand guardrails (give these to the agent)
- One green brand hue; primary CTA = bright green, "wealth"/hero surface = deep forest.
- Sentence case copy, warm + plural voice ("Save together"), `£` money, **no emoji**.
- Soft radii (12/16px), forest-tinted shadows, 1.5px hairline borders, 3px green focus rings.
- Press = `scale(0.97)`; hover = one ramp-step darker; durations 120–280ms, ease-out.
- Replace the UI-kit's placeholder line-icons with Money Tribe's real icon set before shipping.

## 7. Verify
Render `guidelines/*.card.html` and `ui_kits/money-tribe-app/index.html` in a browser to confirm tokens, fonts, and components resolve. Toggle `data-theme` to check both themes.
