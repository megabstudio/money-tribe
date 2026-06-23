import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MoreVertical, Check, Search, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

// ─── Calendar Picker ──────────────────────────────────────────────────────────

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function CalendarPicker({ value, onChange, onClose }: {
  value: string;
  onChange: (date: string) => void;
  onClose: () => void;
}) {
  const today  = new Date();
  const parsed = value ? new Date(value + "T00:00:00") : today;
  const [viewYear,  setViewYear]  = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());
  const selected = value ? new Date(value + "T00:00:00") : null;

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function selectDay(day: number) {
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${viewYear}-${m}-${d}`);
    onClose();
  }

  function isSelected(day: number) {
    if (!selected) return false;
    return selected.getFullYear() === viewYear && selected.getMonth() === viewMonth && selected.getDate() === day;
  }

  function isToday(day: number) {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
  }

  return (
    <div className="absolute z-50 bg-popover rounded-2xl shadow-2xl border border-border p-4 w-[280px]" style={{ top: "100%", left: 0, marginTop: 4 }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <span className="font-semibold text-foreground text-[14px]">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronRight size={18} className="text-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] text-muted-foreground font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center">
            {day ? (
              <button
                onClick={() => selectDay(day)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] transition-colors hover:bg-muted ${
                  isSelected(day) ? "text-white" : isToday(day) ? "border border-primary text-foreground" : "text-foreground"
                }`}
                style={isSelected(day) ? { background: "var(--cta-gradient)" } : undefined}
              >
                {day}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function fmt(v: string) {
    if (!v) return "";
    const d = new Date(v + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 w-full h-11 border rounded-lg px-3 text-left transition-colors bg-input-background ${open ? "border-primary ring-1 ring-primary/20" : "border-border"}`}
      >
        <Calendar size={16} className="text-muted-foreground flex-shrink-0" />
        <span className={`text-[13px] truncate ${value ? "text-foreground" : "text-muted-foreground"}`}>
          {value ? fmt(value) : label}
        </span>
      </button>
      {open && (
        <CalendarPicker
          value={value}
          onChange={(v) => { onChange(v); setOpen(false); }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Circular Slider ─────────────────────────────────────────────────────────

function CircularSlider({
  value,
  onChange,
  min = 2,
  max = 20,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);

  const SIZE = 240;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const RADIUS = 90;
  const STROKE = 22;
  const HANDLE_R = 16;
  const START = 225;
  const SWEEP = 270;

  function polarToXY(deg: number) {
    const rad = (deg - 90) * (Math.PI / 180);
    return { x: CX + RADIUS * Math.cos(rad), y: CY + RADIUS * Math.sin(rad) };
  }

  function buildArc(fromDeg: number, toDeg: number) {
    const s = polarToXY(fromDeg);
    const e = polarToXY(toDeg);
    const sweep = ((toDeg - fromDeg) % 360 + 360) % 360;
    if (sweep < 0.5) return "";
    const large = sweep > 180 ? 1 : 0;
    return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
  }

  const progress = (value - min) / (max - min);
  const currentDeg = START + progress * SWEEP;
  const handleXY = polarToXY(currentDeg);
  const trackPath = buildArc(START, START + SWEEP);
  const fillPath = progress > 0.005 ? buildArc(START, currentDeg) : "";

  function calcValue(e: React.PointerEvent<SVGSVGElement>): number {
    if (!svgRef.current) return value;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * SIZE;
    const py = ((e.clientY - rect.top) / rect.height) * SIZE;
    const svgAngle = Math.atan2(py - CY, px - CX) * (180 / Math.PI);
    let angle = svgAngle + 90;
    if (angle < 0) angle += 360;
    let rel = (angle - START + 360) % 360;
    if (rel > SWEEP) {
      rel = 360 - rel < rel - SWEEP ? 0 : SWEEP;
    }
    return Math.max(min, Math.min(max, Math.round(min + (rel / SWEEP) * (max - min))));
  }

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    isDragging.current = true;
    (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
    onChange(calcValue(e));
  }
  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!isDragging.current) return;
    onChange(calcValue(e));
  }
  function onPointerUp() { isDragging.current = false; }

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-[200px] h-[200px] touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <path d={trackPath} fill="none" stroke="var(--color-border)" strokeWidth={STROKE} strokeLinecap="round" />
        {fillPath && (
          <path d={fillPath} fill="none" stroke="var(--color-primary)" strokeWidth={STROKE} strokeLinecap="round" />
        )}
        <circle
          cx={handleXY.x}
          cy={handleXY.y}
          r={HANDLE_R}
          fill="var(--color-foreground)"
          stroke="white"
          strokeWidth={3.5}
          style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.28))" }}
        />
        <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="auto" fontSize="62" fontWeight="800" fill="var(--color-foreground)">
          {value}
        </text>
        <text x={CX} y={CY + 26} textAnchor="middle" dominantBaseline="auto" fontSize="13" fontWeight="500" fill="var(--color-muted-foreground)">
          people
        </text>
      </svg>

      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label="Decrease"
          className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center text-[22px] font-light text-foreground hover:bg-muted active:scale-95 transition-all"
        >
          −
        </button>
        <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
          {min} – {max} members
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label="Increase"
          className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center text-[22px] font-light text-foreground hover:bg-muted active:scale-95 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── Mock Users ───────────────────────────────────────────────────────────────

interface TribeMember {
  id: string;
  name: string;
  email: string;
}

const MOCK_USERS: TribeMember[] = [
  { id: "1", name: "Thandi Dlamini",  email: "thandi.d@mail.com"  },
  { id: "2", name: "Sipho Nkosi",     email: "sipho.n@mail.com"   },
  { id: "3", name: "Lerato Mokoena",  email: "lerato.m@mail.com"  },
  { id: "4", name: "Kabelo Sithole",  email: "kabelo.s@mail.com"  },
  { id: "5", name: "Nomvula Khumalo", email: "nomvula.k@mail.com" },
  { id: "6", name: "Bongani Zulu",    email: "bongani.z@mail.com" },
  { id: "7", name: "Ayanda Ndlovu",   email: "ayanda.n@mail.com"  },
  { id: "8", name: "Mpho Molefe",     email: "mpho.m@mail.com"    },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

interface TribeForm {
  name: string;
  size: number;
  contribution: string;
  paymentPeriod: string;
  startDate: string;
  endDate: string;
  members: TribeMember[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcEndDate(startDate: string, size: number, period: string): string {
  if (!startDate || !period) return "";
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(start);
  switch (period) {
    case "Weekly":   end.setDate(end.getDate() + size * 7);  break;
    case "Biweekly": end.setDate(end.getDate() + size * 14); break;
    case "Monthly":  end.setMonth(end.getMonth() + size);    break;
  }
  const y = end.getFullYear();
  const m = String(end.getMonth() + 1).padStart(2, "0");
  const d = String(end.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fmtDate(v: string) {
  if (!v) return "—";
  return new Date(v + "T00:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

function fmtAmount(v: number) {
  return v.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function StepCircle({ num, state }: { num: number; state: "done" | "active" | "idle" }) {
  if (state === "done") {
    return (
      <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[14px]"
        style={{ background: "var(--cta-gradient)" }}>
        {num}
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="relative flex items-center justify-center w-14 h-14">
        <div className="absolute inset-0 rounded-full border-[3px] border-primary/30" />
        <div className="absolute inset-[5px] rounded-full border-[3px] border-primary/30" />
        <div className="w-11 h-11 rounded-full border-[5px] border-primary flex items-center justify-center text-foreground text-[14px]">
          {num}
        </div>
      </div>
    );
  }
  return (
    <div className="w-11 h-11 rounded-full border border-muted-foreground/40 flex items-center justify-center text-foreground text-[14px]">
      {num}
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = [
    { num: 1, label: "Size"     },
    { num: 2, label: "Schedule" },
    { num: 3, label: "Members"  },
    { num: 4, label: "Summary"  },
  ];

  function state(n: number): "done" | "active" | "idle" {
    if (n < step) return "done";
    if (n === step) return "active";
    return "idle";
  }

  return (
    <div className="px-5 pt-2 pb-4">
      <div className="flex items-start">
        {steps.map((s, i) => (
          <div key={s.num} className={`flex items-start ${i < steps.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="h-14 flex items-center justify-center">
                <StepCircle num={s.num} state={state(s.num)} />
              </div>
              <span className="text-[11px] text-foreground text-center" style={{ fontWeight: step >= s.num ? 500 : 400 }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 mx-1 h-[2px] rounded-full"
                style={{
                  marginTop: "28px",
                  backgroundColor: step > s.num ? "var(--color-primary)" : "var(--color-muted-foreground)",
                  opacity: step > s.num ? 1 : 0.3,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CTA Arrow ────────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path d="M19 11.5H5.4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M13 17.5L19 11.5L13 5.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Step 1: Tribe Size ──────────────────────────────────────────────────────

function StepTribeSize({ form, setForm, onNext }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onNext: () => void;
}) {
  const contributionNum = parseFloat(form.contribution);
  const totalSaved = !isNaN(contributionNum) && contributionNum > 0 ? contributionNum * form.size : null;
  const canContinue = form.size >= 2 && totalSaved !== null;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4 space-y-5">
      {/* Total saved hero */}
      <div className="flex flex-col items-center text-center min-h-[72px] justify-center">
        {totalSaved !== null ? (
          <>
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-1">
              Total saved per participant
            </p>
            <p
              className="text-[44px] font-extrabold leading-none tabular-nums"
              style={{ background: "var(--cta-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              R {fmtAmount(totalSaved)}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground text-[13px]">
            Set your tribe size and contribution to see total savings
          </p>
        )}
      </div>

      {/* Circular slider */}
      <div className="flex flex-col items-center gap-1">
        <label className="text-foreground text-[14px] font-medium self-start">Number of participants</label>
        <CircularSlider
          value={form.size}
          onChange={(v) => setForm(f => ({ ...f, size: v }))}
          min={2}
          max={20}
        />
      </div>

      {/* Individual contribution */}
      <div>
        <label className="text-foreground text-[14px] font-medium block mb-1.5">
          Individual contribution per period
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[14px] font-semibold select-none">
            R
          </span>
          <input
            value={form.contribution}
            onChange={(e) => setForm(f => ({ ...f, contribution: e.target.value }))}
            placeholder="0.00"
            type="number"
            min="0"
            className="w-full h-11 border border-border rounded-lg pl-8 pr-3 text-foreground text-[14px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-input-background transition-colors"
          />
        </div>
        <p className="text-muted-foreground text-[11px] mt-1">
          Amount each member contributes per payment period
        </p>
      </div>

      <div className="flex-1" />

      <button
        onClick={onNext}
        disabled={!canContinue}
        className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40"
        style={{ background: "var(--cta-gradient)" }}
      >
        Next <ArrowRight />
      </button>
    </div>
  );
}

// ─── Step 2: Schedule ─────────────────────────────────────────────────────────

const PERIODS = ["Weekly", "Biweekly", "Monthly"] as const;

function StepSchedule({ form, setForm, onNext }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onNext: () => void;
}) {
  useEffect(() => {
    if (form.startDate && form.paymentPeriod) {
      const end = calcEndDate(form.startDate, form.size, form.paymentPeriod);
      setForm(f => ({ ...f, endDate: end }));
    }
  }, [form.startDate, form.paymentPeriod, form.size, setForm]);

  const canContinue = !!form.paymentPeriod && !!form.startDate;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4 space-y-6">
      {/* Payment period pills */}
      <div>
        <label className="text-foreground text-[14px] font-medium block mb-3">Payment period</label>
        <div className="flex gap-2">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setForm(f => ({ ...f, paymentPeriod: p }))}
              className={`flex-1 h-11 rounded-full text-[13px] font-semibold transition-all ${
                form.paymentPeriod === p
                  ? "text-white"
                  : "border border-border text-foreground hover:bg-muted"
              }`}
              style={form.paymentPeriod === p ? { background: "var(--cta-gradient)" } : undefined}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Start date */}
      <div>
        <label className="text-foreground text-[14px] font-medium block mb-1.5">Start date</label>
        <DateField
          label="Select start date"
          value={form.startDate}
          onChange={(v) => setForm(f => ({ ...f, startDate: v }))}
        />
      </div>

      {/* End date — auto-calculated */}
      {form.endDate && (
        <div className="p-4 bg-muted/40 rounded-2xl border border-border">
          <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-1.5">
            Tribe ends on
          </p>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={18} className="text-primary flex-shrink-0" />
            <p className="text-foreground font-bold text-[20px]">{fmtDate(form.endDate)}</p>
          </div>
          <p className="text-muted-foreground text-[12px]">
            {form.size} rounds · {form.paymentPeriod.toLowerCase()} payments
          </p>
        </div>
      )}

      <div className="flex-1" />

      <button
        onClick={onNext}
        disabled={!canContinue}
        className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40"
        style={{ background: "var(--cta-gradient)" }}
      >
        Next <ArrowRight />
      </button>
    </div>
  );
}

// ─── Step 3: Members ─────────────────────────────────────────────────────────

function StepMembers({ form, setForm, onNext }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onNext: () => void;
}) {
  const [query, setQuery] = useState("");

  const addedIds = new Set(form.members.map(m => m.id));
  const results = query.trim().length > 1
    ? MOCK_USERS.filter(u =>
        !addedIds.has(u.id) && (
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase())
        )
      )
    : [];

  const allFilled = form.members.length >= form.size;

  function addMember(user: TribeMember) {
    if (allFilled) return;
    setForm(f => ({ ...f, members: [...f.members, user] }));
    setQuery("");
  }

  function removeMember(id: string) {
    setForm(f => ({ ...f, members: f.members.filter(m => m.id !== id) }));
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-4 pb-3">
        <p className="text-foreground font-semibold text-[16px]">Add tribe members</p>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          {form.members.length} of {form.size} slots filled
        </p>
      </div>

      {/* Search bar */}
      <div className="px-6 mb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            disabled={allFilled}
            className="w-full h-11 border border-border rounded-lg pl-9 pr-9 text-foreground text-[13px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-input-background transition-colors disabled:opacity-50"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      {results.length > 0 && (
        <div className="px-6 mb-3 space-y-2">
          {results.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl">
              <div className="min-w-0 mr-3">
                <p className="text-foreground text-[13px] font-semibold truncate">{user.name}</p>
                <p className="text-muted-foreground text-[11px] truncate">{user.email}</p>
              </div>
              <button
                onClick={() => addMember(user)}
                className="h-9 px-3 rounded-lg text-white text-[12px] font-semibold flex-shrink-0 hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "var(--cta-gradient)" }}
              >
                Add {user.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {query.trim().length > 1 && results.length === 0 && (
        <p className="px-6 text-muted-foreground text-[13px] text-center py-2 mb-2">No members found</p>
      )}

      {/* Member slots */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-2">
        {Array.from({ length: form.size }, (_, i) => {
          const member = form.members[i];
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0 ${member ? "text-white" : "bg-muted text-muted-foreground"}`}
                style={member ? { background: "var(--cta-gradient)" } : undefined}
              >
                {member ? <Check size={16} /> : i + 1}
              </div>
              {member ? (
                <div className="flex-1 h-12 border border-primary/30 rounded-xl flex items-center justify-between px-3 bg-primary/5">
                  <div className="min-w-0">
                    <p className="text-foreground text-[13px] font-semibold truncate">{member.name}</p>
                    <p className="text-muted-foreground text-[11px] truncate">{member.email}</p>
                  </div>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="text-muted-foreground hover:text-foreground ml-2 flex-shrink-0 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex-1 h-12 border border-dashed border-border rounded-xl flex items-center px-3">
                  <span className="text-muted-foreground text-[12px]">Empty slot</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Continue */}
      <div className="px-6 pb-6 pt-2">
        <button
          onClick={onNext}
          disabled={!allFilled}
          className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40"
          style={{ background: "var(--cta-gradient)" }}
        >
          Continue to summary <ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Summary ─────────────────────────────────────────────────────────

function StepSummary({ form, setForm, onPublish }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onPublish: () => void;
}) {
  const contributionNum = parseFloat(form.contribution) || 0;
  const totalSaved = contributionNum * form.size;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4 space-y-4">
      <p className="font-semibold text-foreground text-[16px]">Review your tribe</p>

      {/* Tribe name */}
      <div>
        <label className="text-foreground text-[14px] font-medium block mb-1.5">Tribe name</label>
        <input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Give your tribe a name"
          className="w-full h-11 border border-border rounded-lg px-3 text-foreground text-[14px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-input-background transition-colors"
        />
      </div>

      {/* Financial summary */}
      <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Contribution</p>
            <p className="text-foreground font-bold text-[20px] tabular-nums">R {fmtAmount(contributionNum)}</p>
            <p className="text-muted-foreground text-[11px]">{form.paymentPeriod.toLowerCase()} · per member</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Total saved</p>
            <p
              className="font-extrabold text-[24px] tabular-nums leading-tight"
              style={{ background: "var(--cta-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              R {fmtAmount(totalSaved)}
            </p>
            <p className="text-muted-foreground text-[11px]">per participant</p>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="p-4 bg-muted/40 rounded-2xl">
        <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-1">Participants</p>
        <p className="text-foreground font-bold text-[16px]">{form.size} members · {form.size} rounds</p>
      </div>

      {/* Schedule */}
      <div className="p-4 bg-muted/40 rounded-2xl">
        <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-1">Schedule</p>
        <p className="text-foreground font-bold text-[16px] mb-3">{form.paymentPeriod} payments</p>
        <div className="flex gap-4 items-center">
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Starts</p>
            <p className="text-foreground text-[13px] font-semibold">{fmtDate(form.startDate)}</p>
          </div>
          <div className="w-8 h-[2px] bg-border rounded-full" />
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Ends</p>
            <p className="text-foreground text-[13px] font-semibold">{fmtDate(form.endDate)}</p>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="p-4 bg-muted/40 rounded-2xl">
        <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-3">
          Members ({form.members.length})
        </p>
        <div className="space-y-2.5">
          {form.members.map((m, i) => (
            <div key={m.id} className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] text-white font-bold flex-shrink-0"
                style={{ background: "var(--cta-gradient)" }}
              >
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-[13px] font-semibold truncate">{m.name}</p>
                <p className="text-muted-foreground text-[11px] truncate">{m.email}</p>
              </div>
              <Check size={15} className="text-primary flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={onPublish}
        disabled={!form.name.trim()}
        className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold mt-2 hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40"
        style={{ background: "var(--cta-gradient)" }}
      >
        Publish tribe <ArrowRight />
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CreateTribe() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const [form, setForm] = useState<TribeForm>({
    name: "",
    size: 4,
    contribution: "",
    paymentPeriod: "",
    startDate: "",
    endDate: "",
    members: [],
  });

  function handleBack() { if (step === 1) navigate(-1); else setStep(s => (s - 1) as Step); }
  function handleNext() { if (step < 4) setStep(s => (s + 1) as Step); }
  function handlePublish() { navigate("/your-tribes"); }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 pt-16 pb-2">
          <button onClick={handleBack} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <span className="font-bold text-foreground text-[16px]">Create new tribe</span>
          <button className="w-6 h-6 flex items-center justify-center">
            <MoreVertical size={20} className="text-foreground" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex-shrink-0">
          <Stepper step={step} />
        </div>

        {/* Step content */}
        {step === 1 && <StepTribeSize form={form} setForm={setForm} onNext={handleNext} />}
        {step === 2 && <StepSchedule  form={form} setForm={setForm} onNext={handleNext} />}
        {step === 3 && <StepMembers   form={form} setForm={setForm} onNext={handleNext} />}
        {step === 4 && <StepSummary   form={form} setForm={setForm} onPublish={handlePublish} />}
      </div>
    </div>
  );
}
