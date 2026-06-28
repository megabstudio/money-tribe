import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Search, X, Calendar, ChevronRight, Check, ChevronLeft,
} from "lucide-react";
import MobileStatusBar from "./MobileStatusBar";

// ── Types ──────────────────────────────────────────────────────────────────────

type Period = "Weekly" | "Biweekly" | "Monthly";
type AmountFilter = "<500" | "500-1000" | "1000+";
type SizeFilter = "small" | "medium" | "large";

interface TakenSlot { position: number; initials: string; }

interface OpenTribe {
  id: string;
  name: string;
  emoji: string;
  contribution: number;
  paymentPeriod: Period;
  size: number;
  takenSlots: TakenSlot[];
  startDate: string;
  endDate: string;
  adminName: string;
  adminInitials: string;
  description: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const TODAY = new Date("2026-06-22T00:00:00");

const OPEN_TRIBES: OpenTribe[] = [
  {
    id: "1", name: "Sunset Savers", emoji: "🌅",
    contribution: 500, paymentPeriod: "Monthly", size: 8,
    takenSlots: [
      { position: 0, initials: "TD" }, { position: 2, initials: "SK" }, { position: 4, initials: "NM" },
    ],
    startDate: "2026-07-01", endDate: "2027-03-01",
    adminName: "Thandi Dlamini", adminInitials: "TD",
    description: "Monthly savings circle for young professionals in Joburg. Focused on building emergency funds and holiday savings.",
  },
  {
    id: "2", name: "Weekly Grind", emoji: "💪",
    contribution: 200, paymentPeriod: "Weekly", size: 5,
    takenSlots: [{ position: 1, initials: "BZ" }],
    startDate: "2026-07-07", endDate: "2026-08-11",
    adminName: "Bongani Zulu", adminInitials: "BZ",
    description: "Fast-moving weekly stokvel for small, consistent savings. Perfect for beginners building the savings habit.",
  },
  {
    id: "3", name: "Big Dreams Fund", emoji: "🏠",
    contribution: 2000, paymentPeriod: "Monthly", size: 10,
    takenSlots: [
      { position: 0, initials: "LM" }, { position: 1, initials: "KS" },
      { position: 3, initials: "AM" }, { position: 6, initials: "PN" },
    ],
    startDate: "2026-08-01", endDate: "2027-06-01",
    adminName: "Lerato Mokoena", adminInitials: "LM",
    description: "High-value savings circle for property deposits and major life goals. Join serious savers planning for the future.",
  },
  {
    id: "4", name: "Biweekly Boost", emoji: "⚡",
    contribution: 350, paymentPeriod: "Biweekly", size: 6,
    takenSlots: [
      { position: 0, initials: "AN" }, { position: 2, initials: "MM" },
      { position: 4, initials: "KS" }, { position: 5, initials: "LD" },
    ],
    startDate: "2026-07-14", endDate: "2026-10-20",
    adminName: "Ayanda Ndlovu", adminInitials: "AN",
    description: "Biweekly savings to bridge the payday gap and build a small emergency buffer.",
  },
  {
    id: "5", name: "Cape Town Collective", emoji: "🌊",
    contribution: 750, paymentPeriod: "Monthly", size: 12,
    takenSlots: [
      { position: 1, initials: "SK" }, { position: 4, initials: "NM" },
    ],
    startDate: "2026-09-01", endDate: "2027-09-01",
    adminName: "Sipho Nkosi", adminInitials: "SK",
    description: "12-person savings group for Cape Town residents. Perfect for annual December holiday savings.",
  },
  {
    id: "6", name: "Township Tycoons", emoji: "💼",
    contribution: 1000, paymentPeriod: "Monthly", size: 6,
    takenSlots: [
      { position: 0, initials: "MP" }, { position: 1, initials: "TN" }, { position: 3, initials: "BK" },
    ],
    startDate: "2026-07-01", endDate: "2026-12-01",
    adminName: "Mpho Molefe", adminInitials: "MP",
    description: "Entrepreneurship-focused savings circle. Payouts support small business investments in the township economy.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmtAmt = (n: number) =>
  "R " + n.toLocaleString("en-ZA", { minimumFractionDigits: 0 });

const fmtDateShort = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric", month: "short", year: "numeric",
  });

function isStartingSoon(startDate: string): boolean {
  const start = new Date(startDate + "T00:00:00");
  const diff = (start.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 30;
}

function slotPayoutDate(startDate: string, period: Period, slotIndex: number): string {
  const d = new Date(startDate + "T00:00:00");
  switch (period) {
    case "Weekly":   d.setDate(d.getDate() + slotIndex * 7);  break;
    case "Biweekly": d.setDate(d.getDate() + slotIndex * 14); break;
    case "Monthly":  d.setMonth(d.getMonth() + slotIndex);    break;
  }
  return d.toLocaleDateString("en-ZA", { month: "short", year: "numeric" });
}

// ── FilterChip ─────────────────────────────────────────────────────────────────

function FilterChip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex-shrink-0 h-8 px-3.5 rounded-full text-[12px] font-semibold transition-all active:scale-95 ${
        active ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
      style={active ? { background: "var(--cta-gradient)" } : undefined}
    >
      {label}
    </button>
  );
}

// ── TribeCard ──────────────────────────────────────────────────────────────────

function TribeCard({ tribe, onClick }: { tribe: OpenTribe; onClick: () => void }) {
  const spots = tribe.size - tribe.takenSlots.length;
  const soon = isStartingSoon(tribe.startDate);
  const takenSet = new Set(tribe.takenSlots.map(s => s.position));

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
    >
      <div className="h-[3px]" style={{ background: "var(--cta-gradient)" }} />

      <div className="p-4">
        {/* Name + spots badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] flex-shrink-0 bg-muted">
              {tribe.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-foreground font-bold text-[15px] leading-tight truncate">{tribe.name}</p>
              <p className="text-muted-foreground text-[11px] truncate">by {tribe.adminName}</p>
            </div>
          </div>
          <span
            className="flex-shrink-0 px-2.5 py-1 rounded-full text-white text-[11px] font-bold"
            style={{ background: "var(--cta-gradient)" }}
          >
            {spots} left
          </span>
        </div>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-1.5 mb-3">
          <span className="px-2 py-0.5 bg-muted rounded-md text-foreground text-[12px] font-semibold">
            {fmtAmt(tribe.contribution)} / {tribe.paymentPeriod.toLowerCase()}
          </span>
          <span className="px-2 py-0.5 bg-muted rounded-md text-muted-foreground text-[12px]">
            {tribe.size} members
          </span>
          {soon && (
            <span className="px-2 py-0.5 rounded-md text-[12px] font-semibold text-muted-foreground bg-muted">
              Starting soon
            </span>
          )}
        </div>

        {/* Slot fill bar */}
        <div className="flex gap-[3px] mb-3">
          {Array.from({ length: tribe.size }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full"
              style={
                takenSet.has(i)
                  ? { backgroundColor: "var(--color-foreground)" }
                  : { backgroundColor: "var(--color-border, hsl(var(--border)))" }
              }
            />
          ))}
        </div>

        {/* Date + view link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar size={12} />
            <span className="text-[12px]">Starts {fmtDateShort(tribe.startDate)}</span>
          </div>
          <div className="flex items-center gap-0.5 text-muted-foreground text-[12px] font-semibold">
            View <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </button>
  );
}

// ── TribeDetailSheet ───────────────────────────────────────────────────────────

function TribeDetailSheet({ tribe, onClose }: { tribe: OpenTribe; onClose: () => void }) {
  const [visible, setVisible]     = useState(false);
  const [stage, setStage]         = useState<"detail" | "slots" | "success">("detail");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  useEffect(() => {
    // Defer one frame so the CSS transition fires from the initial off-screen position
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const spots      = tribe.size - tribe.takenSlots.length;
  const takenMap   = new Map(tribe.takenSlots.map(s => [s.position, s.initials]));
  const totalPayout = tribe.contribution * tribe.size;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out overflow-hidden"
        style={{
          maxHeight: "90%",
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* Drag handle */}
        <div className="flex-shrink-0 pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* ── DETAIL ── */}
        {stage === "detail" && (
          <>
            <div className="flex-shrink-0 flex items-center justify-between px-5 pt-2 pb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[24px] bg-muted flex-shrink-0">
                  {tribe.emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-foreground font-bold text-[17px] truncate">{tribe.name}</p>
                  <p className="text-muted-foreground text-[12px]">by {tribe.adminName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ml-3"
              >
                <X size={16} className="text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-3 space-y-3">
              <p className="text-muted-foreground text-[13px] leading-relaxed">{tribe.description}</p>

              {/* Financials */}
              <div className="p-4 bg-muted/40 rounded-2xl">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-3">
                  Financials
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-muted-foreground text-[11px]">Per round</p>
                    <p className="text-foreground font-bold text-[18px]">{fmtAmt(tribe.contribution)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-[11px]">You receive</p>
                    <p
                      className="font-bold text-[22px]"
                      style={{
                        background: "var(--cta-gradient)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {fmtAmt(totalPayout)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="p-4 bg-muted/40 rounded-2xl">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-3">
                  Schedule
                </p>
                <div className="flex items-center gap-4 mb-2">
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Starts</p>
                    <p className="text-foreground font-semibold text-[13px]">{fmtDateShort(tribe.startDate)}</p>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <div className="text-right">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Ends</p>
                    <p className="text-foreground font-semibold text-[13px]">{fmtDateShort(tribe.endDate)}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-[12px]">
                  {tribe.paymentPeriod} payments · {tribe.size} rounds
                </p>
              </div>

              {/* Spots overview */}
              <div className="p-4 bg-muted/40 rounded-2xl">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-3">
                  Spots — {spots} of {tribe.size} available
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {Array.from({ length: tribe.size }).map((_, i) => {
                    const taken = takenMap.has(i);
                    return (
                      <div
                        key={i}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold ${
                          taken ? "text-white/80" : "bg-border/60 text-muted-foreground"
                        }`}
                        style={taken ? { background: "var(--cta-gradient)" } : undefined}
                      >
                        {taken ? takenMap.get(i) : i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-5 pb-8 pt-4 border-t border-border">
              <button
                onClick={() => setStage("slots")}
                disabled={spots === 0}
                className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[15px] font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
                style={{ background: "var(--cta-gradient)" }}
              >
                Join this tribe — {spots} spot{spots !== 1 ? "s" : ""} left
              </button>
            </div>
          </>
        )}

        {/* ── SLOT PICKER ── */}
        {stage === "slots" && (
          <>
            <div className="flex-shrink-0 flex items-center gap-3 px-5 pt-2 pb-4">
              <button
                onClick={() => { setStage("detail"); setSelectedSlot(null); }}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0"
              >
                <ChevronLeft size={16} className="text-foreground" />
              </button>
              <div>
                <p className="text-foreground font-bold text-[16px]">Choose your spot</p>
                <p className="text-muted-foreground text-[12px]">Select when you receive your payout</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-3 space-y-4">
              <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: tribe.size }).map((_, i) => {
                  const taken  = takenMap.has(i);
                  const active = selectedSlot === i;
                  return (
                    <button
                      key={i}
                      disabled={taken}
                      onClick={() => setSelectedSlot(active ? null : i)}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${
                        taken
                          ? "bg-muted/40 opacity-50 cursor-not-allowed"
                          : active
                          ? "text-white shadow-lg"
                          : "bg-muted text-foreground"
                      }`}
                      style={active ? { background: "var(--cta-gradient)" } : undefined}
                    >
                      <span
                        className={`font-bold text-[17px] leading-none ${
                          taken ? "text-muted-foreground" : active ? "text-white" : "text-foreground"
                        }`}
                      >
                        {taken ? takenMap.get(i) : i + 1}
                      </span>
                      <span
                        className={`text-[9px] leading-none mt-0.5 ${
                          taken ? "text-muted-foreground/50" : active ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        {taken ? "taken" : slotPayoutDate(tribe.startDate, tribe.paymentPeriod, i)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedSlot !== null && (
                <div className="p-4 rounded-2xl border border-border bg-muted/40">
                  <p className="text-foreground font-bold text-[14px] mb-0.5">
                    Spot {selectedSlot + 1} · {slotPayoutDate(tribe.startDate, tribe.paymentPeriod, selectedSlot)}
                  </p>
                  <p className="text-muted-foreground text-[12px]">
                    You'll receive{" "}
                    <span className="font-bold text-foreground">{fmtAmt(totalPayout)}</span>{" "}
                    in {slotPayoutDate(tribe.startDate, tribe.paymentPeriod, selectedSlot)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 px-5 pb-8 pt-4 border-t border-border">
              <button
                onClick={() => setStage("success")}
                disabled={selectedSlot === null}
                className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[15px] font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
                style={{ background: "var(--cta-gradient)" }}
              >
                {selectedSlot !== null ? `Confirm spot ${selectedSlot + 1}` : "Select a spot"}
              </button>
            </div>
          </>
        )}

        {/* ── SUCCESS ── */}
        {stage === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12 text-center gap-5">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "var(--cta-gradient)" }}
            >
              <Check size={44} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-foreground font-bold text-[22px] mb-2">Request sent!</p>
              <p className="text-muted-foreground text-[14px] leading-relaxed">
                Your request to join{" "}
                <strong className="text-foreground">{tribe.name}</strong>{" "}
                (spot {selectedSlot! + 1}) has been sent to {tribe.adminName}. You'll be notified once approved.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[15px] font-bold hover:opacity-90 active:scale-[0.98] transition-all"
              style={{ background: "var(--cta-gradient)" }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function FindTribe() {
  const navigate = useNavigate();

  const [query,        setQuery]        = useState("");
  const [periodFilter, setPeriodFilter] = useState<Period | null>(null);
  const [amountFilter, setAmountFilter] = useState<AmountFilter | null>(null);
  const [sizeFilter,   setSizeFilter]   = useState<SizeFilter | null>(null);
  const [soonFilter,   setSoonFilter]   = useState(false);
  const [selectedTribe, setSelectedTribe] = useState<OpenTribe | null>(null);

  const filtered = useMemo(() => {
    return OPEN_TRIBES.filter(t => {
      if (t.size - t.takenSlots.length === 0) return false;
      if (query.trim() && !t.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (periodFilter && t.paymentPeriod !== periodFilter) return false;
      if (amountFilter === "<500"      && t.contribution >= 500)                          return false;
      if (amountFilter === "500-1000"  && (t.contribution < 500 || t.contribution > 1000)) return false;
      if (amountFilter === "1000+"     && t.contribution <= 1000)                          return false;
      if (sizeFilter === "small"  && t.size > 5)               return false;
      if (sizeFilter === "medium" && (t.size < 6 || t.size > 8)) return false;
      if (sizeFilter === "large"  && t.size < 9)               return false;
      if (soonFilter && !isStartingSoon(t.startDate)) return false;
      return true;
    });
  }, [query, periodFilter, amountFilter, sizeFilter, soonFilter]);

  const AMOUNT_FILTERS: { label: string; key: AmountFilter }[] = [
    { label: "<R500",    key: "<500"      },
    { label: "R500–1K",  key: "500-1000"  },
    { label: "R1K+",     key: "1000+"     },
  ];

  const SIZE_FILTERS: { label: string; key: SizeFilter }[] = [
    { label: "≤5 spots", key: "small"  },
    { label: "6–8",      key: "medium" },
    { label: "9+",       key: "large"  },
  ];

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        <MobileStatusBar />

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex items-center gap-3 px-5 pt-3 pb-4 border-b border-border">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold text-[17px]">Find a tribe</p>
            <p className="text-muted-foreground text-[11px]">
              {filtered.length} open tribe{filtered.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="flex-shrink-0 px-5 pt-4 pb-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by tribe name…"
              className="w-full h-11 bg-input-background border border-border rounded-xl pl-9 pr-9 text-foreground text-[14px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* ── Filter chips ── */}
        <div className="flex-shrink-0 pb-3">
          <div className="flex gap-2 px-5 overflow-x-auto scrollbar-hide py-1">
            <FilterChip
              label="Starting soon"
              active={soonFilter}
              onToggle={() => setSoonFilter(v => !v)}
            />

            <div className="w-px bg-border flex-shrink-0 h-5 self-center" />

            {(["Weekly", "Biweekly", "Monthly"] as Period[]).map(p => (
              <FilterChip
                key={p} label={p} active={periodFilter === p}
                onToggle={() => setPeriodFilter(v => v === p ? null : p)}
              />
            ))}

            <div className="w-px bg-border flex-shrink-0 h-5 self-center" />

            {AMOUNT_FILTERS.map(({ label, key }) => (
              <FilterChip
                key={key} label={label} active={amountFilter === key}
                onToggle={() => setAmountFilter(v => v === key ? null : key)}
              />
            ))}

            <div className="w-px bg-border flex-shrink-0 h-5 self-center" />

            {SIZE_FILTERS.map(({ label, key }) => (
              <FilterChip
                key={key} label={label} active={sizeFilter === key}
                onToggle={() => setSizeFilter(v => v === key ? null : key)}
              />
            ))}
          </div>
        </div>

        {/* ── Tribe list ── */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-52 text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4 text-[28px]">
                🔍
              </div>
              <p className="text-foreground font-bold text-[16px] mb-1">No tribes found</p>
              <p className="text-muted-foreground text-[13px]">Try adjusting your filters</p>
            </div>
          ) : (
            filtered.map(tribe => (
              <TribeCard key={tribe.id} tribe={tribe} onClick={() => setSelectedTribe(tribe)} />
            ))
          )}
        </div>

        {/* ── Detail bottom sheet ── */}
        {selectedTribe && (
          <TribeDetailSheet
            key={selectedTribe.id}
            tribe={selectedTribe}
            onClose={() => setSelectedTribe(null)}
          />
        )}
      </div>
    </div>
  );
}
