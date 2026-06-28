import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Moon, Sun, ChevronRight, Plus,
  Home, MessageCircle, LayoutGrid, Calendar, Menu, Compass,
} from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import MobileStatusBar from "./MobileStatusBar";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tribe {
  id: number;
  name: string;
  emoji: string;
  accentColor: string;
  isCreator?: boolean;
  status?: "open" | "starting_soon" | "active" | "closed";
  filledSlots?: number;
  totalSlots?: number;
  startDate?: string;
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
    isCreator: true, status: "starting_soon", filledSlots: 10, totalSlots: 10, startDate: "Jul 1, 2025",
    currentRound: 0, totalRounds: 10, cashDate: "Dec 31, 2025", endDate: "Dec 31, 2026",
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
  const isOpen         = tribe.isCreator && tribe.status === "open";
  const isStartingSoon = tribe.isCreator && tribe.status === "starting_soon";
  const emptySlots     = isOpen ? (tribe.totalSlots ?? 0) - (tribe.filledSlots ?? 0) : 0;

  const cardStyle = isOpen
    ? { boxShadow: "0 6px 28px rgba(34, 197, 94, 0.22)" }
    : {};

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
      style={cardStyle}
    >
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #b9ec9c 0%, #92e06a 100%)" }} />

      <div className="p-4">
        {/* Name + status badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] flex-shrink-0 bg-muted">
              {tribe.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-foreground font-bold text-[15px] leading-tight truncate">{tribe.name}</p>
              <p className="text-muted-foreground text-[11px]">
                {(isOpen || isStartingSoon)
                  ? `${tribe.filledSlots} of ${tribe.totalSlots} members`
                  : `${tribe.totalRounds} rounds total`}
              </p>
            </div>
          </div>

          {isOpen && (
            <span className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              OPEN
            </span>
          )}
          {!isOpen && !isStartingSoon && (
            <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-muted text-foreground text-[11px] font-bold">
              Rnd {tribe.currentRound}/{tribe.totalRounds}
            </span>
          )}
        </div>

        {isOpen && (
          <>
            <div className="flex flex-wrap gap-[5px] mb-3">
              {Array.from({ length: tribe.totalSlots ?? 0 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                    i < (tribe.filledSlots ?? 0)
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-transparent border-dashed border-border"
                  }`}
                >
                  {i < (tribe.filledSlots ?? 0) && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="3.5" r="2" fill="white" />
                      <path d="M1 9c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground">
                <span className="font-semibold text-foreground">{emptySlots}</span> slot{emptySlots !== 1 ? "s" : ""} still open
              </span>
              <div className="flex items-center gap-0.5 text-muted-foreground text-[12px] font-semibold">
                Invite <ChevronRight size={13} />
              </div>
            </div>
          </>
        )}

        {isStartingSoon && (
          <>
            <div className="flex items-center flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 bg-muted rounded-md text-foreground text-[12px] font-semibold">
                {tribe.totalSlots} members
              </span>
              <span className="px-2 py-0.5 rounded-md text-[12px] font-semibold text-muted-foreground bg-muted">
                Starting soon
              </span>
            </div>
            <div className="flex gap-[3px] mb-3">
              {Array.from({ length: tribe.totalSlots ?? 0 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full"
                  style={
                    i < (tribe.filledSlots ?? 0)
                      ? { backgroundColor: "var(--color-foreground)" }
                      : { backgroundColor: "var(--color-border, hsl(var(--border)))" }
                  }
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={12} />
                <span className="text-[12px]">Starts {tribe.startDate}</span>
              </div>
              <div className="flex items-center gap-0.5 text-muted-foreground text-[12px] font-semibold">
                View <ChevronRight size={13} />
              </div>
            </div>
          </>
        )}

        {!isOpen && !isStartingSoon && (
          <>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="px-2 py-0.5 bg-muted rounded-md text-foreground text-[12px] font-semibold">
                Cash {tribe.cashDate}
              </span>
              <span className="px-2 py-0.5 bg-muted rounded-md text-muted-foreground text-[12px]">
                Ends {tribe.endDate}
              </span>
            </div>
            <div className="flex gap-[3px] mb-3">
              {Array.from({ length: tribe.totalRounds }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full"
                  style={
                    i < tribe.currentRound
                      ? { backgroundColor: "var(--color-foreground)" }
                      : { backgroundColor: "var(--color-border, hsl(var(--border)))" }
                  }
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={12} />
                <span className="text-[12px]">Next cash {tribe.cashDate}</span>
              </div>
              <div className="flex items-center gap-0.5 text-muted-foreground text-[12px] font-semibold">
                View <ChevronRight size={13} />
              </div>
            </div>
          </>
        )}
      </div>
    </button>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────────

type NavTab = "home" | "messages" | "find" | "tribes"

const NAV_ITEMS_LEFT:  { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "home",     Icon: Home,          label: "Home"     },
  { id: "messages", Icon: MessageCircle, label: "Messages" },
]
const NAV_ITEMS_RIGHT: { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "find",   Icon: Compass,     label: "Find"       },
  { id: "tribes", Icon: LayoutGrid,  label: "Your tribes" },
]

export default function Dashboard() {
  const navigate = useNavigate();
  const [darkMode,  setDarkMode]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>("home")

  const handleNavClick = (id: NavTab) => {
    if (id === "messages") { navigate("/messages"); return; }
    if (id === "find")     { navigate("/find-tribe"); return; }
    if (id === "tribes")   { navigate("/your-tribes"); return; }
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
        <MobileStatusBar />

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
              <p className="text-[28px] font-bold leading-tight mt-2 text-foreground">
                Jun 15
              </p>
              <p className="text-[12px] text-muted-foreground">2025</p>
              <div className="mt-auto pt-3">
                <p className="text-[12px] font-semibold text-foreground truncate">Vacation Fund</p>
                <p className="text-[11px] font-bold text-muted-foreground mt-0.5">In 20 days</p>
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
                className="flex items-center gap-0.5 text-[13px] font-semibold text-muted-foreground"
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
