One-line: Centered modal dialog with overlay, backdrop blur, Escape/overlay-click close, and a footer action row.

```jsx
const [open, setOpen] = React.useState(false);
<Button onClick={() => setOpen(true)}>Leave tribe</Button>
<Dialog
  open={open} onOpenChange={setOpen}
  title="Leave this tribe?"
  description="You'll stop contributing to the shared pot."
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="dark" onClick={() => setOpen(false)}>Leave</Button>
  </>}
>
  <p>Your saved balance stays yours.</p>
</Dialog>
```
Sizes `sm|md|lg`. Always pass `open` + `onOpenChange`.
