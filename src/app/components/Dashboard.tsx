import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Moon, Sun, ChevronRight, Plus,
  Home, MessageCircle, User, Calendar, Menu, Compass,
} from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tribe {
  id: number;
  name: string;
  emoji: string;
  accentColor: string;
  currentRound: number;
  totalRounds: number;
  cashDate: string;
  endDate: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MY_TRIBES: Tribe[] = [
  {
    id: 1, name: "Vacation Fund", emoji: "✈️", accentColor: "#3dbf00",
    currentRound: 4, totalRounds: 6, cashDate: "Jun 15, 2025", endDate: "Aug 1, 2025",
  },
  {
    id: 2, name: "Emergency Stash", emoji: "🛡️", accentColor: "#2a8a00",
    currentRound: 3, totalRounds: 6, cashDate: "Jul 1, 2025", endDate: "Oct 1, 2025",
  },
  {
    id: 3, name: "New Car Fund", emoji: "🚗", accentColor: "#10451d",
    currentRound: 6, totalRounds: 10, cashDate: "Dec 31, 2025", endDate: "Dec 31, 2026",
  },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function MoneyTribeLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Bold M-arch stroke — two arches side by side forming the Money Tribe mark */}
      <path
        d="M 10 66 L 10 38 Q 10 10 23 10 Q 36 10 36 38 Q 36 10 51 10 Q 62 10 62 38 L 62 66"
        stroke="var(--color-primary)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ─── Tribe Card ───────────────────────────────────────────────────────────────

function TribeCard({ tribe, onClick }: { tribe: Tribe; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="w-full flex bg-card border border-border rounded-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
    >
      {/* Left: solid gradient thumbnail */}
      <div
        className="w-[68px] flex-shrink-0 flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${tribe.accentColor}cc, ${tribe.accentColor}55)` }}
      >
        <span className="text-[30px]">{tribe.emoji}</span>
      </div>

      {/* Right: content + segmented bar */}
      <div className="flex-1 min-w-0 flex flex-col px-3.5 pt-3 pb-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-foreground font-bold text-[14px] leading-snug truncate">{tribe.name}</p>
          <ChevronRight size={14} className="text-border flex-shrink-0 mt-0.5" />
        </div>

        <p className="text-muted-foreground text-[11px] mt-0.5">
          Round{" "}
          <span className="font-semibold" style={{ color: tribe.accentColor }}>
            {tribe.currentRound}
          </span>{" "}
          of {tribe.totalRounds}
        </p>

        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] text-muted-foreground">Cash {tribe.cashDate}</span>
          <span className="text-[10px] text-border">·</span>
          <span className="text-[10px] text-muted-foreground">Ends {tribe.endDate}</span>
        </div>

        {/* Segmented round progress bar */}
        <div className="flex gap-[3px] mt-2.5">
          {Array.from({ length: tribe.totalRounds }).map((_, i) => (
            <div
              key={i}
              className="h-[4px] flex-1 rounded-full"
              style={{ backgroundColor: i < tribe.currentRound ? tribe.accentColor : `${tribe.accentColor}28` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────────

type NavTab = "home" | "messages" | "find" | "user"

const NAV_ITEMS_LEFT:  { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "home",     Icon: Home,          label: "Home"     },
  { id: "messages", Icon: MessageCircle, label: "Messages" },
]
const NAV_ITEMS_RIGHT: { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "find", Icon: Compass, label: "Find" },
  { id: "user", Icon: User,    label: "Profile" },
]

export default function Dashboard() {
  const navigate = useNavigate();
  const [darkMode,  setDarkMode]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>("home")

  const handleNavClick = (id: NavTab) => {
    if (id === "messages") { navigate("/messages"); return; }
    if (id === "find")     { navigate("/find-tribe"); return; }
    setActiveTab(id);
  }
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      {/* Phone frame */}
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        {/* ── Status bar ── */}
        <div className="flex-shrink-0 flex justify-between items-center px-7 pt-4 pb-1">
          <span className="text-[12px] font-semibold text-foreground/70">9:41</span>
          <div className="flex items-center gap-2 text-foreground/70">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px]">
              {[1, 2, 3, 4].map((h) => (
                <div
                  key={h}
                  className="w-[3px] rounded-[1px] bg-current"
                  style={{ height: `${h * 3}px` }}
                />
              ))}
            </div>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M7.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              <path d="M3.5 5.2a5.7 5.7 0 0 1 8 0l1.1-1.1a7.3 7.3 0 0 0-10.2 0l1.1 1.1z" />
              <path d="M5.7 7.4a2.8 2.8 0 0 1 3.6 0l1.1-1.1a4.3 4.3 0 0 0-5.8 0l1.1 1.1z" />
              <path d="M1.4 2.9a9.3 9.3 0 0 1 12.2 0l1-1A10.8 10.8 0 0 0 .4 1.9l1 1z" />
            </svg>
            {/* Battery */}
            <div className="relative w-[22px] h-[11px] rounded-[3px] border border-current/60">
              <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[13px] bg-current rounded-[1px]" />
              <div className="absolute right-[-3px] top-[3px] bottom-[3px] w-[2px] bg-current/60 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2.5">
              <MoneyTribeLogo size={34} />
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Good morning,</p>
                <p className="text-[14px] font-bold text-foreground leading-tight">Amara Johnson 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Open menu"
              >
                <Menu size={17} />
              </button>
            </div>
          </div>

          {/* ── Summary Cards ── */}
          <div className="px-4 mb-5 grid grid-cols-2 gap-3">
            {/* Active tribes */}
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Active Tribes
              </p>
              <p className="text-[44px] font-bold text-foreground leading-none mt-2">
                {MY_TRIBES.length}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">tribes running</p>
              <div className="flex gap-1.5 mt-auto pt-3">
                {MY_TRIBES.map(t => (
                  <div
                    key={t.id}
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: t.accentColor }}
                  />
                ))}
              </div>
            </div>

            {/* Next cash date */}
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-1.5">
                <Calendar size={10} className="text-muted-foreground" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Next Cash
                </p>
              </div>
              <p
                className="text-[28px] font-bold leading-tight mt-2"
                style={{
                  background: "var(--cta-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Jun 15
              </p>
              <p className="text-[12px] text-muted-foreground">2025</p>
              <div className="mt-auto pt-3">
                <p className="text-[12px] font-semibold text-foreground truncate">Vacation Fund</p>
                <p className="text-[11px] font-bold text-primary mt-0.5">In 20 days</p>
              </div>
            </div>
          </div>

          {/* ── Your Tribes ── */}
          <div className="mb-5">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2
                className="font-bold text-foreground text-[15px] cursor-pointer"
                onClick={() => navigate('/your-tribes')}
              >
                Your Tribes
              </h2>
              <button
                onClick={() => navigate('/your-tribes')}
                className="flex items-center gap-0.5 text-[13px] font-semibold text-primary"
              >
                See all <ChevronRight size={14} />
              </button>
            </div>
            <div className="px-4 space-y-3">
              {MY_TRIBES.map(tribe => (
                <TribeCard key={tribe.id} tribe={tribe} onClick={() => navigate(`/tribes/${tribe.id}`)} />
              ))}
            </div>
          </div>

          {/* Spacer for bottom nav */}
          <div className="h-20" />
        </div>

        {/* ── Hamburger menu ── */}
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* ── Bottom Nav ── */}
        <div className="flex-shrink-0 bg-card border-t border-border">
          <div className="flex items-center justify-around py-2 px-2">
            {NAV_ITEMS_LEFT.map(({ id, Icon, label }) => {
              const isActive = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all relative"
                >
                  <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  <span className={`text-[10px] font-semibold transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {isActive && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-primary" />}
                </button>
              )
            })}

            {/* Center FAB */}
            <button
              onClick={() => navigate("/create-tribe")}
              className="relative -mt-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              style={{ background: "var(--cta-gradient)" }}
              aria-label="Create new tribe"
            >
              <Plus size={28} className="text-white" />
            </button>

            {NAV_ITEMS_RIGHT.map(({ id, Icon, label }) => {
              const isActive = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all relative"
                >
                  <span className="relative">
                    <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  </span>
                  <span className={`text-[10px] font-semibold transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {isActive && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-primary" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
