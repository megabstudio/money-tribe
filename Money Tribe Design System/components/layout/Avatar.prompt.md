One-line: Circular avatar with image + initials fallback, optional brand ring, and an overlapping AvatarGroup.

```jsx
<Avatar name="Ada Lin" src="/ada.jpg" size="lg" ring />
<AvatarGroup max={3}>
  <Avatar name="Ada Lin" /><Avatar name="Ben Ojo" /><Avatar name="Cai Wu" /><Avatar name="Dee Roy" />
</AvatarGroup>
```
Sizes `xs|sm|md|lg|xl`. Falls back to initials when `src` is missing or fails to load.
