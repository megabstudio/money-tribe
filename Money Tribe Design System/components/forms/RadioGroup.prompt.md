One-line: Single-select radio buttons — `RadioGroup` manages the choice, each `Radio` is one option with the brand green dot.

```jsx
<RadioGroup defaultValue="weekly" onValueChange={setFreq}>
  <Radio value="weekly" label="Weekly" />
  <Radio value="monthly" label="Monthly" />
  <Radio value="payday" label="On payday" disabled />
</RadioGroup>
```
Use `orientation="horizontal"` for inline layouts. Controlled via `value` + `onValueChange`.
