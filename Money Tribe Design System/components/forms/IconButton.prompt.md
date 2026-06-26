One-line: Square button for a single icon — same variants/shapes as Button, used for search, toolbar, and compact actions.

```jsx
<IconButton aria-label="Search" variant="primary"><SearchIcon/></IconButton>
<IconButton aria-label="More" variant="ghost" shape="pill"><DotsIcon/></IconButton>
```

Pass exactly one SVG/icon child; it is auto-sized to the control. Always supply `aria-label`.
