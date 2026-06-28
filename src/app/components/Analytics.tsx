import { useNavigate } from "react-router";
import {
  ArrowLeft, TrendingUp, TrendingDown, Flame, CheckCircle,
  AlertCircle, Clock, Trophy,
} from "lucide-react";
import MobileStatusBar from "./MobileStatusBar";

// ── Types ──────────────────────────────────────────────────────────────────────

type RiskTier      = "A" | "B" | "C" | "D";
type PaymentStatus = "on_time" | "late" | "missed";

// ── Mock data ──────────────────────────────────────────────────────────────────

const STATS = {
  tribesCompleted:   4,
  tribesJoined:      7,
  riskTier:          "A" as RiskTier,
  punctualityStreak: 14,
  missedDates:       0,
  latePayments:      1,
};

const TRIBE_HISTORY = [
  { month: "Oct", count: 2 },
  { month: "Nov", count: 2 },
  { month: "Dec", count: 3 },
  { month: "Jan", count: 4 },
  { month: "Feb", count: 4 },
  { month: "Mar", count: 5 },
  { month: "Apr", count: 6 },
  { month: "May", count: 7 },
];

interface Payment { id: number; date: string; tribe: string; status: PaymentStatus }

const PAYMENT_HISTORY: Payment[] = [
  { id: 1, date: "Jun 15", tribe: "Vacation Fund",   status: "on_time" },
  { id: 2, date: "Jun 1",  tribe: "Emergency Stash", status: "on_time" },
  { id: 3, date: "May 15", tribe: "Vacation Fund",   status: "on_time" },
  { id: 4, date: "May 1",  tribe: "Emergency Stash", status: "on_time" },
  { id: 5, date: "Apr 15", tribe: "New Car Fund",    status: "on_time" },
  { id: 6, date: "Apr 1",  tribe: "Vacation Fund",   status: "on_time" },
  { id: 7, date: "Mar 15", tribe: "Emergency Stash", status: "late"    },
  { id: 8, date: "Mar 1",  tribe: "New Car Fund",    status: "on_time" },
];

// ── Config maps ────────────────────────────────────────────────────────────────

const RISK_CONFIG: Record<RiskTier, { label: string; desc: string; text: string; bg: string; border: string }> = {
  A: { label: "Excellent", desc: "Consistently on time. Strong payment record.",  text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  B: { label: "Good",      desc: "Minor delays recorded. No defaults on record.", text: "text-sky-600 dark:text-sky-400",         bg: "bg-sky-500/10",     border: "border-sky-500/20"     },
  C: { label: "Fair",      desc: "Occasional late payments. Under review.",       text: "text-amber-600 dark:text-amber-400",     bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
  D: { label: "High risk", desc: "Missed payments or defaults on record.",        text: "text-red-500",                           bg: "bg-red-500/10",     border: "border-red-500/20"     },
};

const STATUS_CONFIG: Record<PaymentStatus, { label: string; bg: string; text: string; Icon: React.ElementType }> = {
  on_time: { label: "On time", bg: "bg-emerald-500/10 border border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", Icon: CheckCircle },
  late:    { label: "Late",    bg: "bg-amber-500/10 border border-amber-500/20",     text: "text-amber-600 dark:text-amber-400",     Icon: Clock       },
  missed:  { label: "Missed",  bg: "bg-red-500/10 border border-red-500/20",         text: "text-red-500",                           Icon: AlertCircle  },
};

const LEAGUES = [
  { name: "Starter",  emoji: "🌱", min: 1,  max: 2    },
  { name: "Member",   emoji: "⭐", min: 3,  max: 5    },
  { name: "Veteran",  emoji: "🏆", min: 6,  max: 10   },
  { name: "Guardian", emoji: "👑", min: 11, max: null  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function getLeague(joined: number) {
  const league = LEAGUES.slice().reverse().find(l => joined >= l.min) ?? LEAGUES[0];
  const next   = LEAGUES[LEAGUES.indexOf(league) + 1] ?? null;
  const progress = next ? Math.min((joined - league.min) / (next.min - league.min), 1) : 1;
  return { league, next, progress };
}

function catmullRomPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  const d = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[Math.max(i - 2, 0)];
    const p1 = pts[i - 1];
    const p2 = pts[i];
    const p3 = pts[Math.min(i + 1, pts.length - 1)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
  }
  return d.join(" ");
}

// ── Chart ──────────────────────────────────────────────────────────────────────

function TribeChart() {
  const VW = 340, VH = 110;
  const PAD = { t: 16, r: 10, b: 24, l: 10 };
  const pW = VW - PAD.l - PAD.r;
  const pH = VH - PAD.t - PAD.b;

  const counts = TRIBE_HISTORY.map(d => d.count);
  const minC   = Math.min(...counts) - 1;
  const maxC   = Math.max(...counts) + 1;

  const xOf = (i: number) => PAD.l + (i / (TRIBE_HISTORY.length - 1)) * pW;
  const yOf = (v: number) => PAD.t + (1 - (v - minC) / (maxC - minC)) * pH;

  const pts: [number, number][] = TRIBE_HISTORY.map((d, i) => [xOf(i), yOf(d.count)]);
  const line    = catmullRomPath(pts);
  const lastPt  = pts[pts.length - 1];
  const fill    = `${line} L ${lastPt[0].toFixed(1)} ${(VH - PAD.b).toFixed(1)} L ${PAD.l} ${(VH - PAD.b).toFixed(1)} Z`;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      <defs>
        {/* CSS-in-SVG so stop-color picks up the CSS variable */}
        <style>{`.chart-stop { stop-color: var(--color-primary); }`}</style>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   className="chart-stop" stopOpacity="0.22" />
          <stop offset="100%" className="chart-stop" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Subtle guide lines */}
      {[0.33, 0.66].map(t => (
        <line
          key={t}
          x1={PAD.l} x2={VW - PAD.r}
          y1={PAD.t + t * pH} y2={PAD.t + t * pH}
          stroke="currentColor" strokeOpacity="0.06" strokeWidth="1"
          className="text-foreground"
        />
      ))}

      {/* Fill */}
      <path d={fill} fill="url(#chartGrad)" />

      {/* Line */}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />

      {/* Dots */}
      {pts.map(([x, y], i) => {
        const isLast = i === pts.length - 1;
        return (
          <circle
            key={i}
            cx={x} cy={y}
            r={isLast ? 5 : 3.5}
            fill={isLast ? "currentColor" : "var(--color-background)"}
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        );
      })}

      {/* Latest value label */}
      <text
        x={lastPt[0]}
        y={yOf(TRIBE_HISTORY[TRIBE_HISTORY.length - 1].count) - 9}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="currentColor"
        className="text-primary"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {TRIBE_HISTORY[TRIBE_HISTORY.length - 1].count}
      </text>

      {/* Month labels */}
      {TRIBE_HISTORY.map((d, i) => (
        <text
          key={i}
          x={xOf(i)}
          y={VH - 4}
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
          className="text-muted-foreground"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Analytics() {
  const navigate = useNavigate();
  const risk = RISK_CONFIG[STATS.riskTier];
  const { league, next, progress } = getLeague(STATS.tribesJoined);

  const trendDelta  = TRIBE_HISTORY[TRIBE_HISTORY.length - 1].count - TRIBE_HISTORY[0].count;
  const trendUp     = trendDelta > 0;
  const TrendIcon   = trendUp ? TrendingUp : TrendingDown;
  const trendLabel  = trendUp
    ? `+${trendDelta} tribes since ${TRIBE_HISTORY[0].month}`
    : `${trendDelta} since ${TRIBE_HISTORY[0].month}`;

  return (
    <div className="h-screen overflow-hidden bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ height: "100svh" }}
      >
        <MobileStatusBar />

        {/* Header */}
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 bg-background border-b border-border">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center text-foreground hover:text-foreground/70 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-bold text-foreground text-base">Analytics</h1>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-10">

          {/* ── Risk tier ─────────────────────────────────────────── */}
          <div className={`mt-4 p-5 rounded-2xl border ${risk.bg} ${risk.border}`}>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-4">
              Risk level
            </p>
            <div className="flex items-center gap-4 mb-5">
              <div
                className={`w-[68px] h-[68px] rounded-2xl flex items-center justify-center font-extrabold text-[38px] flex-shrink-0 border-2 ${risk.bg} ${risk.border} ${risk.text}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {STATS.riskTier}
              </div>
              <div className="min-w-0">
                <p className={`font-bold text-[21px] leading-tight ${risk.text}`} style={{ fontFamily: "var(--font-display)" }}>
                  {risk.label}
                </p>
                <p className="text-muted-foreground text-[13px] leading-snug mt-1 max-w-[180px]">
                  {risk.desc}
                </p>
              </div>
            </div>

            {/* A → B → C → D track */}
            <div className="flex items-center gap-2">
              {(["A", "B", "C", "D"] as RiskTier[]).map(t => {
                const active = t === STATS.riskTier;
                return (
                  <div key={t} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={`w-full h-1.5 rounded-full transition-colors ${active ? "" : "bg-border"}`}
                      style={active ? { background: "var(--color-primary)" } : undefined}
                    />
                    <span className={`text-[10px] font-bold ${active ? risk.text : "text-muted-foreground/40"}`}>{t}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Tribe activity chart ───────────────────────────────── */}
          <div className="mt-4 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex items-start justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                  Tribe activity
                </p>
                <div className={`flex items-center gap-1.5 mt-1.5 ${trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                  <TrendIcon size={13} />
                  <p className="text-[13px] font-semibold">{trendLabel}</p>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground mt-1">8 months</span>
            </div>
            <div className="px-3 pb-2">
              <TribeChart />
            </div>
          </div>

          {/* ── Behavior stats 2×2 ────────────────────────────────── */}
          <div className="mt-4 grid grid-cols-2 gap-3">

            {/* Tribes completed */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p
                className="text-[40px] font-extrabold text-foreground leading-none mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {STATS.tribesCompleted}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight">
                Tribes<br />completed
              </p>
              <div className="mt-3 flex items-center gap-1.5 pt-3 border-t border-border">
                <Trophy size={11} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{STATS.tribesJoined} total joined</span>
              </div>
            </div>

            {/* Punctuality streak */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-end gap-1.5 mb-1">
                <p
                  className="text-[40px] font-extrabold text-foreground leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {STATS.punctualityStreak}
                </p>
                <Flame size={18} className="text-amber-500 mb-1.5 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight">
                Punctuality<br />streak
              </p>
              <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border">
                on-time in a row
              </p>
            </div>

            {/* Missed dates */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between mb-1">
                <p
                  className="text-[40px] font-extrabold text-foreground leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {STATS.missedDates}
                </p>
                {STATS.missedDates === 0
                  ? <CheckCircle size={16} className="text-emerald-500 mt-1" />
                  : <AlertCircle size={16} className="text-red-500 mt-1" />}
              </div>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight">
                Missed<br />dates
              </p>
              <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border">
                {STATS.missedDates === 0 ? "Clean record" : `${STATS.missedDates} total`}
              </p>
            </div>

            {/* Late payments */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between mb-1">
                <p
                  className="text-[40px] font-extrabold text-foreground leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {STATS.latePayments}
                </p>
                {STATS.latePayments === 0
                  ? <CheckCircle size={16} className="text-emerald-500 mt-1" />
                  : <Clock size={16} className="text-amber-500 mt-1" />}
              </div>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight">
                Late<br />payments
              </p>
              <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border">
                {STATS.latePayments === 0 ? "Always on time" : "3+ months ago"}
              </p>
            </div>
          </div>

          {/* ── League ───────────────────────────────────────────────── */}
          <div className="mt-4 bg-card border border-border rounded-2xl p-5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-4">
              League
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[38px] leading-none">{league.emoji}</span>
              <div>
                <p
                  className="font-extrabold text-[22px] leading-tight text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {league.name}
                </p>
                <p className="text-muted-foreground text-[12px] mt-0.5">
                  {STATS.tribesJoined} tribes joined
                </p>
              </div>
            </div>

            {next ? (
              <>
                <div className="h-2 bg-border rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progress * 100}%`, background: "var(--cta-gradient)" }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">
                    {next.min - STATS.tribesJoined} more to{" "}
                    <span className="font-semibold text-foreground">{next.name} {next.emoji}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">{Math.round(progress * 100)}%</p>
                </div>
              </>
            ) : (
              <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle size={13} />
                Maximum league reached
              </p>
            )}

            {/* All-tier parade */}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-around">
              {LEAGUES.map(l => (
                <div key={l.name} className="flex flex-col items-center gap-1">
                  <span className={`text-[20px] ${l.name === league.name ? "" : "opacity-25"}`}>{l.emoji}</span>
                  <span className={`text-[9px] font-semibold ${l.name === league.name ? "text-foreground" : "text-muted-foreground/40"}`}>
                    {l.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Payment history ────────────────────────────────────── */}
          <div className="mt-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-3 px-1">
              Payment history
            </p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
              {PAYMENT_HISTORY.map(p => {
                const cfg = STATUS_CONFIG[p.status];
                const Icon = cfg.Icon;
                return (
                  <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground truncate">{p.tribe}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{p.date}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.text}`}>
                      <Icon size={11} />
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
