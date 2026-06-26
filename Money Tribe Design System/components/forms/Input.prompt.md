One-line: Text input field with a green focus ring, optional left/right icons, and an invalid state.

```jsx
<Input placeholder="you@email.com" />
<Input leftIcon={<SearchIcon/>} placeholder="Search the tribe" />
<Input invalid defaultValue="bad@" />
```
Sizes `sm|md|lg`. Pair with `<Label>`. Set `invalid` to flag validation errors (red border + ring).
