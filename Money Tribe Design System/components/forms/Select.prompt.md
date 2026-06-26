One-line: Dropdown select with a custom popover list (closes on outside click), brand-green active row + checkmark.

```jsx
<Select
  placeholder="Pick a goal"
  defaultValue="house"
  options={[{value:"house",label:"House deposit"},{value:"trip",label:"Trip fund"}]}
  onValueChange={setGoal}
/>
```
Pass `options` as `{value,label}[]`. Controlled via `value` + `onValueChange`.
