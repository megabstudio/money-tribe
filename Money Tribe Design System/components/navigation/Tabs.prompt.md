One-line: Tabbed navigation with an animated underline or a pill (segmented) variant.

```jsx
<Tabs defaultValue="save" variant="underline">
  <TabsList>
    <TabsTrigger value="save">Save</TabsTrigger>
    <TabsTrigger value="spend">Spend</TabsTrigger>
  </TabsList>
  <TabsContent value="save">Your pots…</TabsContent>
  <TabsContent value="spend">Your card…</TabsContent>
</Tabs>
```
Set `variant="pill"` for a segmented control on a muted track.
