// Money Tribe — finance app UI kit.
// Screens are assigned to window (NO exports) so the DS bundler ignores them.
// Composes the published Money Tribe primitives from the DS bundle.
(function () {
  const DS = window.MoneyTribeDesignSystem_5369ed;
  const { Button, IconButton, Input, Checkbox, RadioGroup, Radio, Switch, Select,
          Tabs, TabsList, TabsTrigger, TabsContent, Dialog, Badge, Card, CardHeader,
          Avatar, AvatarGroup, Label } = DS;

  // ── Minimal line-icon set (no icon system exists in the Figma; flagged in README) ──
  const Icon = ({ d, size = 22, sw = 1.8, fill = "none" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
  const Icons = {
    home:   <Icon d={<><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/></>} />,
    tribe:  <Icon d={<><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M21 20c0-2.4-1.4-4.5-3.5-5.4"/></>} />,
    pots:   <Icon d={<><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>} />,
    cog:    <Icon d={<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></>} />,
    plus:   <Icon d={<path d="M12 5v14M5 12h14"/>} sw={2.2} />,
    bell:   <Icon d={<><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></>} />,
    arrow:  <Icon d={<path d="M5 12h14M13 6l6 6-6 6"/>} sw={2} />,
    back:   <Icon d={<path d="M19 12H5M11 6l-6 6 6 6"/>} sw={2} />,
    bolt:   <Icon d={<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>} fill="currentColor" sw={0} />,
    target: <Icon d={<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></>} />,
  };

  const money = (n) => "£" + n.toLocaleString("en-GB");

  // ───────────────────────────── AUTH ─────────────────────────────
  function AuthScreen({ onJoin }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 24px", background: "var(--background)" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 8 }}>
          <img src="../../assets/logo-mark.svg" alt="" style={{ width: 64, height: 64, color: "var(--green-600)", marginBottom: 8 }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--green-800)", lineHeight: 1.05 }}>Money Tribe</div>
          <p style={{ fontSize: 15, color: "var(--text-subtle)", maxWidth: 260, marginTop: 6 }}>Save together, faster. Join a circle and hit your goal as a team.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8 }}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" size="lg" placeholder="you@email.com" defaultValue="ada@moneytribe.app" />
          <Label htmlFor="pw">Password</Label>
          <Input id="pw" size="lg" type="password" defaultValue="••••••••" />
          <Checkbox label="Keep me signed in" defaultChecked />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 28, marginTop: 12 }}>
          <Button variant="primary" size="lg" fullWidth onClick={onJoin}>Join tribe</Button>
          <Button variant="ghost" size="lg" fullWidth>Create account</Button>
        </div>
      </div>
    );
  }

  // ───────────────────────────── HOME ─────────────────────────────
  const POTS = [
    { id: "house", name: "House deposit", saved: 4200, goal: 10000, members: 6, status: "On track" },
    { id: "trip",  name: "Summer trip",   saved: 1850, goal: 2400,  members: 4, status: "Almost there" },
    { id: "rainy", name: "Rainy day",     saved: 760,  goal: 3000,  members: 2, status: "Behind" },
  ];

  function Progress({ value }) {
    return (
      <div style={{ height: 8, borderRadius: 99, background: "var(--muted)", overflow: "hidden" }}>
        <div style={{ width: value + "%", height: "100%", background: "var(--primary)", borderRadius: 99, transition: "width .5s var(--ease-out)" }} />
      </div>
    );
  }

  function HomeScreen({ onOpenPot }) {
    return (
      <div style={{ height: "100%", overflowY: "auto", background: "var(--surface-muted)" }}>
        <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Ada Lin" ring />
            <div>
              <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>Good morning</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-body)" }}>Ada</div>
            </div>
          </div>
          <IconButton aria-label="Notifications" variant="ghost">{Icons.bell}</IconButton>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          <Card style={{ background: "var(--green-900)", border: "none", color: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--green-200)" }}>Total saved</div>
                <div style={{ fontSize: 34, fontWeight: 800, fontFamily: "var(--font-display)", marginTop: 2 }}>{money(6810)}</div>
              </div>
              <Badge variant="solid" style={{ background: "var(--green-400)", color: "var(--green-900)" }}>+£240 this wk</Badge>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <Button variant="primary" size="sm" leftIcon={Icons.plus}>Add money</Button>
              <Button variant="outline" size="sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>Transfer</Button>
            </div>
          </Card>
        </div>

        <div style={{ padding: "22px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-body)" }}>Your pots</div>
          <Button variant="ghost" size="sm" rightIcon={Icons.arrow}>See all</Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px 24px" }}>
          {POTS.map((p) => {
            const pct = Math.round((p.saved / p.goal) * 100);
            return (
              <Card key={p.id} interactive onClick={() => onOpenPot(p)} padding="md">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 12, background: "var(--green-100)", color: "var(--green-700)" }}>{Icons.target}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-body)" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{money(p.saved)} of {money(p.goal)}</div>
                    </div>
                  </div>
                  <Badge variant={p.status === "Behind" ? "destructive" : "primary"}>{p.status}</Badge>
                </div>
                <Progress value={pct} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <AvatarGroup max={4} size="xs">
                    {Array.from({ length: p.members }).map((_, i) => <Avatar key={i} name={["Ada Lin","Ben Ojo","Cai Wu","Dee Roy","Eli Fox","Fae Ito"][i % 6]} size="xs" />)}
                  </AvatarGroup>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)" }}>{pct}%</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ─────────────────────────── POT DETAIL ──────────────────────────
  function PotScreen({ pot, onBack }) {
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState("50");
    const [freq, setFreq] = React.useState("weekly");
    const pct = Math.round((pot.saved / pot.goal) * 100);
    return (
      <div style={{ height: "100%", overflowY: "auto", background: "var(--background)" }}>
        <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", gap: 8, position: "sticky", top: 0, background: "var(--background)", zIndex: 2 }}>
          <IconButton aria-label="Back" variant="ghost" onClick={onBack}>{Icons.back}</IconButton>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-body)" }}>{pot.name}</div>
        </div>

        <div style={{ padding: "0 20px" }}>
          <Card style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "var(--text-subtle)" }}>Saved together</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--green-700)" }}>{money(pot.saved)}</div>
            <div style={{ fontSize: 13, color: "var(--text-subtle)", marginBottom: 14 }}>of {money(pot.goal)} goal · {pct}%</div>
            <Progress value={pct} />
            <div style={{ marginTop: 18 }}>
              <Button variant="primary" size="lg" fullWidth leftIcon={Icons.plus} onClick={() => setOpen(true)}>Add to pot</Button>
            </div>
          </Card>
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          <Tabs defaultValue="members" variant="pill">
            <TabsList>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {["Ada Lin","Ben Ojo","Cai Wu","Dee Roy","Eli Fox","Fae Ito"].slice(0, pot.members).map((n, i) => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 4px", borderBottom: "1px solid var(--border)" }}>
                    <Avatar name={n} size="sm" />
                    <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "var(--text-body)" }}>{n}{i === 0 ? " (you)" : ""}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-subtle)" }}>{money([1200,980,860,740,620,410][i] || 200)}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="activity">
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[["Ben added money","+£120","2h ago"],["Auto round-up","+£3.40","Today"],["Cai added money","+£60","Yesterday"]].map(([t,a,w]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 4px", borderBottom: "1px solid var(--border)" }}>
                    <div><div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-body)" }}>{t}</div><div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{w}</div></div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--primary)" }}>{a}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div style={{ height: 24 }} />

        <Dialog
          open={open} onOpenChange={setOpen}
          title="Add to pot"
          description={`Contribute to ${pot.name}.`}
          footer={<>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Add {money(Number(amount) || 0)}</Button>
          </>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <Label>Amount</Label>
              <div style={{ marginTop: 6 }}><Input size="lg" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} leftIcon={<span style={{ fontWeight: 800 }}>£</span>} /></div>
            </div>
            <div>
              <Label>Repeat</Label>
              <div style={{ marginTop: 8 }}>
                <RadioGroup value={freq} onValueChange={setFreq} orientation="horizontal">
                  <Radio value="once" label="Once" />
                  <Radio value="weekly" label="Weekly" />
                  <Radio value="payday" label="Payday" />
                </RadioGroup>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  // ─────────────────────────── SETTINGS ────────────────────────────
  function SettingsScreen() {
    return (
      <div style={{ height: "100%", overflowY: "auto", background: "var(--surface-muted)" }}>
        <div style={{ padding: "20px 20px 0", fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text-body)" }}>Settings</div>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          <Card padding="md">
            <CardHeader title="Saving" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Switch label="Round up purchases" defaultChecked />
              <Switch label="Auto-save on payday" defaultChecked />
              <Switch label="Weekly summary email" />
            </div>
          </Card>
          <Card padding="md">
            <CardHeader title="Default goal" />
            <Select defaultValue="house" options={[{value:"house",label:"House deposit"},{value:"trip",label:"Summer trip"},{value:"rainy",label:"Rainy day"}]} />
            <div style={{ marginTop: 16 }}>
              <Label>Reminders</Label>
              <div style={{ marginTop: 8 }}>
                <RadioGroup defaultValue="weekly">
                  <Radio value="daily" label="Daily" />
                  <Radio value="weekly" label="Weekly" />
                  <Radio value="off" label="Off" />
                </RadioGroup>
              </div>
            </div>
          </Card>
          <Button variant="outline-dark" size="lg" fullWidth>Log out</Button>
        </div>
      </div>
    );
  }

  // ───────────────────────────── SHELL ─────────────────────────────
  function App() {
    const [authed, setAuthed] = React.useState(false);
    const [tab, setTab] = React.useState("home");
    const [pot, setPot] = React.useState(null);

    let screen;
    if (!authed) screen = <AuthScreen onJoin={() => setAuthed(true)} />;
    else if (pot) screen = <PotScreen pot={pot} onBack={() => setPot(null)} />;
    else if (tab === "home") screen = <HomeScreen onOpenPot={setPot} />;
    else if (tab === "tribe") screen = <HomeScreen onOpenPot={setPot} />;
    else if (tab === "settings") screen = <SettingsScreen />;

    const nav = [["home", "Home", Icons.home], ["pots", "Pots", Icons.pots], ["tribe", "Tribe", Icons.tribe], ["settings", "Settings", Icons.cog]];

    return (
      <div style={{ width: 390, height: 800, background: "var(--background)", borderRadius: 40, overflow: "hidden", boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column", position: "relative", border: "1px solid var(--border)" }}>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>{screen}</div>
        {authed && !pot && (
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 8px 22px", background: "var(--surface-card)", borderTop: "1px solid var(--border)" }}>
            {nav.map(([id, label, icon]) => {
              const active = tab === id;
              return (
                <button key={id} onClick={() => setTab(id)} style={{ border: "none", background: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", color: active ? "var(--primary)" : "var(--muted-foreground)", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700 }}>
                  {icon}{label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  window.MoneyTribeApp = App;
})();
