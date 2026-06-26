One-line: Checkbox with the Money Tribe green fill + animated checkmark; works controlled or uncontrolled, with an optional inline label.

```jsx
<Checkbox label="Remember me" defaultChecked />
<Checkbox checked={agree} onCheckedChange={setAgree} label="I accept the tribe rules" />
<Checkbox disabled label="Unavailable" />
```
Sizes `sm|md|lg`. Omit `label` to render the box alone.
