import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Bell, Moon, Sun, ChevronRight, Plus,
  Home, MessageCircle, User, Calendar, TrendingUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tribe {
  id: number;
  name: string;
  emoji: string;
  members: number;
  maxMembers: number;
  saved: number;
  goal: number;
  cashDate: string;
  monthlyContribution: number;
  accentColor: string;
  avatarInitials: string[];
  currentRound: number;
  totalRounds: number;
}

interface UpcomingTribe {
  id: number;
  name: string;
  emoji: string;
  members: number;
  maxMembers: number;
  cashDate: string;
  monthlyContribution: number;
  gradientFrom: string;
  gradientTo: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MY_TRIBES: Tribe[] = [
  {
    id: 1,
    name: "Vacation Fund",
    emoji: "✈️",
    members: 6,
    maxMembers: 6,
    saved: 4200,
    goal: 6000,
    cashDate: "Jun 15, 2025",
    monthlyContribution: 700,
    accentColor: "#38B000",
    avatarInitials: ["AM", "BK", "CJ", "DL", "EO", "FN"],
    currentRound: 4,
    totalRounds: 6,
  },
  {
    id: 2,
    name: "Emergency Stash",
    emoji: "🛡️",
    members: 4,
    maxMembers: 6,
    saved: 2800,
    goal: 5000,
    cashDate: "Jul 1, 2025",
    monthlyContribution: 500,
    accentColor: "#2E7D32",
    avatarInitials: ["AJ", "BM", "CK", "DT"],
    currentRound: 3,
    totalRounds: 5,
  },
  {
    id: 3,
    name: "New Car Fund",
    emoji: "🚗",
    members: 8,
    maxMembers: 10,
    saved: 12000,
    goal: 20000,
    cashDate: "Dec 31, 2025",
    monthlyContribution: 1500,
    accentColor: "#1B5E20",
    avatarInitials: ["AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH"],
    currentRound: 6,
    totalRounds: 10,
  },
];

const UPCOMING_TRIBES: UpcomingTribe[] = [
  {
    id: 4,
    name: "Home Deposit",
    emoji: "🏠",
    members: 3,
    maxMembers: 8,
    cashDate: "Mar 1, 2026",
    monthlyContribution: 2000,
    gradientFrom: "#10451D",
    gradientTo: "#38B000",
  },
  {
    id: 5,
    name: "Tech Upgrade",
    emoji: "💻",
    members: 5,
    maxMembers: 5,
    cashDate: "Aug 15, 2025",
    monthlyContribution: 800,
    gradientFrom: "#2E7D32",
    gradientTo: "#66BB6A",
  },
  {
    id: 6,
    name: "School Fees",
    emoji: "📚",
    members: 6,
    maxMembers: 6,
    cashDate: "Jan 15, 2026",
    monthlyContribution: 1200,
    gradientFrom: "#1B5E20",
    gradientTo: "#43A047",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "R " + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Logo ─────────────────────────────────────────────────────────────────────

function MoneyTribeLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Bold M-arch stroke — two arches side by side forming the Money Tribe mark */}
      <path
        d="M 10 66 L 10 38 Q 10 10 23 10 Q 36 10 36 38 Q 36 10 51 10 Q 62 10 62 38 L 62 66"
        stroke="#38B000"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ─── Tribe Card (horizontal scroll) ──────────────────────────────────────────

function TribeCard({ tribe, onClick }: { tribe: Tribe; onClick: () => void }) {
  const pct = Math.round((tribe.saved / tribe.goal) * 100);
  return (
    <div onClick={onClick} className="min-w-[220px] bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 cursor-pointer active:scale-[0.98] transition-transform">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-card-foreground text-[13px] leading-tight">{tribe.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex -space-x-1">
              {tribe.avatarInitials.slice(0, 3).map((init, i) => (
                <div key={i} className="w-[18px] h-[18px] rounded-full bg-muted border-[1.5px] border-card flex items-center justify-center text-[7px] font-semibold text-muted-foreground flex-shrink-0">
                  {init}
                </div>
              ))}
              {tribe.avatarInitials.length > 3 && (
                <div className="w-[18px] h-[18px] rounded-full bg-accent border-[1.5px] border-card flex items-center justify-center text-[7px] font-semibold text-muted-foreground flex-shrink-0">
                  +{tribe.avatarInitials.length - 3}
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-[11px]">{tribe.members}/{tribe.maxMembers}</p>
          </div>
        </div>

        {/* Member payout circle — each dash = 1 member, green = paid out */}
        <div className="w-[40px] h-[40px] flex-shrink-0 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {Array.from({ length: tribe.maxMembers }).map((_, index) => {
              const circumference = 2 * Math.PI * 15;
              const dashLength = (circumference / tribe.maxMembers) * 0.6;
              const gapLength = (circumference / tribe.maxMembers) * 0.4;
              const offset = -index * (circumference / tribe.maxMembers);
              const isPaidOut = index < tribe.currentRound;
              return (
                <circle
                  key={index}
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={isPaidOut ? tribe.accentColor : "currentColor"}
                  strokeOpacity={isPaidOut ? 1 : 0.15}
                  strokeWidth="3"
                  strokeDasharray={`${dashLength} ${gapLength}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-card-foreground">
              {tribe.currentRound}/{tribe.maxMembers}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar with percentage on top */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold" style={{ color: tribe.accentColor }}>
            {pct}%
          </span>
        </div>
        <div className="h-[5px] bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: tribe.accentColor }}
          />
        </div>
      </div>

      {/* Cash out and Total section */}
      <div className="mt-auto pt-2 border-t border-border space-y-2">
        <div className="flex items-center gap-1.5">
          <Calendar size={10} className="text-muted-foreground flex-shrink-0" />
          <span className="text-[11px] text-muted-foreground">
            Cash out:{" "}
            <span className="text-card-foreground font-semibold">{tribe.cashDate}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp size={10} className="text-muted-foreground flex-shrink-0" />
          <span className="text-[11px] text-muted-foreground">
            Total:{" "}
            <span className="text-card-foreground font-semibold">
              {fmt(tribe.goal)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Upcoming Tribe Slide ─────────────────────────────────────────────────────

function UpcomingSlide({ tribe }: { tribe: UpcomingTribe }) {
  return (
    <div
      className="w-full flex-shrink-0 snap-start px-4"
      style={{ scrollSnapAlign: "start" }}
    >
      <div
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{
          background: `linear-gradient(140deg, ${tribe.gradientFrom} 0%, ${tribe.gradientTo} 100%)`,
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

        {/* Top row */}
        <div className="flex justify-between items-start mb-5 relative z-10">
          <div>
            <span className="text-2xl leading-none block mb-1">{tribe.emoji}</span>
            <h3 className="font-bold text-[17px] text-white leading-tight">{tribe.name}</h3>
            <p className="text-white/60 text-xs mt-0.5">
              {tribe.members}/{tribe.maxMembers} spots filled
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-[10px] font-medium uppercase tracking-wide">Monthly</p>
            <p className="font-bold text-[22px] text-white leading-none mt-0.5">
              {fmt(tribe.monthlyContribution)}
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-white/60 text-[10px] font-medium uppercase tracking-wide mb-1">
              Cash Date
            </p>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-white/80" />
              <p className="font-semibold text-white text-sm">{tribe.cashDate}</p>
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors rounded-full px-5 py-2 text-sm font-bold text-white">
            Join →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────────

type NavTab = "home" | "messages" | "notifications" | "user"

const NAV_ITEMS_LEFT:  { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "home",     Icon: Home,          label: "Home"     },
  { id: "messages", Icon: MessageCircle, label: "Messages" },
]
const NAV_ITEMS_RIGHT: { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "notifications", Icon: Bell, label: "Alerts"  },
  { id: "user",          Icon: User, label: "Profile" },
]

export default function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<NavTab>("home")

  const handleNavClick = (id: NavTab) => {
    setActiveTab(id)
  }
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const slide = Math.round(scrollLeft / clientWidth);
    setActiveSlide(Math.min(Math.max(slide, 0), UPCOMING_TRIBES.length - 1));
  };

  const goToSlide = (i: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({ left: i * sliderRef.current.clientWidth, behavior: "smooth" });
    setActiveSlide(i);
  };

  const totalSavedMonth = 3750;
  const totalAllTime = MY_TRIBES.reduce((s, t) => s + t.saved, 0);

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
                className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
                aria-label="Notifications"
              >
                <Bell size={15} />
                <span className="absolute top-[9px] right-[9px] w-2 h-2 rounded-full bg-destructive border-2 border-muted" />
              </button>
            </div>
          </div>

          {/* ── Hero: Total Saved ── */}
          <div className="px-4 mb-4">
            <div
              className="rounded-3xl p-5 relative overflow-hidden"
              style={{ background: "linear-gradient(140deg, #10451D 0%, #38B000 100%)" }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={13} className="text-white/60" />
                  <p className="text-white/70 text-xs font-medium">Total Saved This Month</p>
                </div>
                <p className="text-[38px] font-bold text-white leading-none mb-5 tracking-tight">
                  {fmt(totalSavedMonth)}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/10 rounded-xl p-3">
                    <p className="text-white/60 text-[10px] font-medium uppercase tracking-wide mb-1">
                      Total Savings
                    </p>
                    <p className="text-white font-bold text-[13px]">{fmt(totalAllTime)}</p>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-xl p-3">
                    <p className="text-white/60 text-[10px] font-medium uppercase tracking-wide mb-1">
                      Active Tribes
                    </p>
                    <p className="text-white font-bold text-[13px]">{MY_TRIBES.length} Tribes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Cash Date ── */}
          <div className="px-4 mb-5">
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-primary/10">
                <Calendar size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                  Next Cash Date
                </p>
                <p className="font-bold text-card-foreground text-[15px] leading-tight">June 15, 2025</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  Vacation Fund payout
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Days left</p>
                <p className="font-bold text-[30px] leading-none text-primary">
                  20
                </p>
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

            <div
              className="flex gap-3 overflow-x-scroll px-4 pb-2 scrollbar-hide"
            >
              {MY_TRIBES.map((tribe) => (
                <TribeCard key={tribe.id} tribe={tribe} onClick={() => navigate(`/tribes/${tribe.id}`)} />
              ))}

              {/* New tribe CTA */}
              <div
                className="min-w-[160px] bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-colors"
                style={{ minHeight: 210 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#38B00018" }}
                >
                  <Plus size={18} style={{ color: "#38B000" }} />
                </div>
                <p className="text-[11px] text-muted-foreground font-semibold text-center px-2 leading-tight">
                  New<br />Tribe
                </p>
              </div>
            </div>
          </div>

          {/* ── Upcoming Tribes Slider ── */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-bold text-foreground text-[15px]">Upcoming Tribes</h2>
              <button
                className="flex items-center gap-0.5 text-[13px] font-semibold text-primary"
              >
                Browse <ChevronRight size={14} />
              </button>
            </div>

            <div
              ref={sliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleSliderScroll}
            >
              {UPCOMING_TRIBES.map((tribe) => (
                <UpcomingSlide key={tribe.id} tribe={tribe} />
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center items-center gap-1.5 mt-4">
              {UPCOMING_TRIBES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeSlide === i ? 22 : 8,
                    height: 8,
                    backgroundColor: activeSlide === i ? "#38B000" : "#38B00038",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Spacer for bottom nav */}
          <div className="h-20" />
        </div>

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
              style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
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
                    {id === "notifications" && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive border-2 border-card" />
                    )}
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
