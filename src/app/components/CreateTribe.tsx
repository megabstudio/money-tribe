import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MoreVertical, Check, Upload, X, ChevronDown, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Calendar Picker ──────────────────────────────────────────────────────────

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function CalendarPicker({ value, onChange, onClose }: {
  value: string;
  onChange: (date: string) => void;
  onClose: () => void;
}) {
  const today = new Date();
  const parsed = value ? new Date(value + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
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

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
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
    <div className="absolute z-50 bg-white rounded-2xl shadow-2xl border border-[#EAF1EC] p-4 w-[280px]" style={{ top: "100%", left: 0, marginTop: 4 }}>
      {/* Month/Year nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-[#EAF1EC] transition-colors">
          <ChevronLeft size={18} className="text-[#10451d]" />
        </button>
        <span className="font-semibold text-[#10451d] text-[14px]">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-[#EAF1EC] transition-colors">
          <ChevronRight size={18} className="text-[#10451d]" />
        </button>
      </div>
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] text-[#91BD9C] font-medium py-1">{d}</div>
        ))}
      </div>
      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center">
            {day ? (
              <button
                onClick={() => selectDay(day)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] transition-colors"
                style={
                  isSelected(day)
                    ? { background: "linear-gradient(140deg,#3DBF00,#10441D)", color: "white" }
                    : isToday(day)
                    ? { border: "1.5px solid #3DBF00", color: "#10451d" }
                    : { color: "#10451d" }
                }
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
    <div className="flex-1 relative" ref={ref}>
      <label className="text-muted-foreground text-[11px] block mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 w-full h-11 border rounded-lg px-3 text-left transition-colors bg-input-background ${open ? "border-primary ring-1 ring-primary/20" : "border-border"}`}
      >
        <Calendar size={16} className="text-muted-foreground flex-shrink-0" />
        <span className={`text-[12px] truncate ${value ? "text-foreground" : "text-muted-foreground"}`}>
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

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

interface TribeForm {
  name: string;
  size: number;
  paymentPeriod: string;
  amount: string;
  startDate: string;
  endDate: string;
  coverImage: string | null;
  members: string[];
  notifications: {
    changeInTurns: boolean;
    messagesInWall: boolean;
    completedCycle: boolean;
    delayInCycle: boolean;
    delayDays: string;
    reportedMember: boolean;
  };
}

// ─── Stepper indicator ────────────────────────────────────────────────────────

function StepCircle({ num, state }: { num: number; state: "done" | "active" | "idle" }) {
  if (state === "done") {
    return (
      <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[14px]"
        style={{ background: "linear-gradient(180deg, #3DBF00 0%, #10441D 100%)" }}>
        {num}
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="relative flex items-center justify-center w-14 h-14">
        {/* Outer faint ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#3DBF00]/30" />
        {/* Middle faint ring */}
        <div className="absolute inset-[5px] rounded-full border-[3px] border-[#3DBF00]/30" />
        {/* Inner solid */}
        <div className="w-11 h-11 rounded-full border-[5px] border-[#3DBF00] flex items-center justify-center text-[#10451d] text-[14px]">
          {num}
        </div>
      </div>
    );
  }
  return (
    <div className="w-11 h-11 rounded-full border border-[#91BD9C] flex items-center justify-center text-[#10451d] text-[14px]">
      {num}
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = [
    { num: 1, label: "General" },
    { num: 2, label: "Members" },
    { num: 3, label: "Notifications" },
  ];

  function state(n: number): "done" | "active" | "idle" {
    if (n < step) return "done";
    if (n === step) return "active";
    return "idle";
  }

  return (
    <div className="px-6 pt-2 pb-4">
      {/* Circles row */}
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <StepCircle num={s.num} state={state(s.num)} />
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-1 h-[2px] rounded-full mx-2"
                style={{ backgroundColor: step > s.num ? "#3DBF00" : "#91BD9C" }} />
            )}
          </div>
        ))}
      </div>
      {/* Labels row */}
      <div className="flex justify-between mt-1 px-1">
        {steps.map((s) => (
          <span key={s.num} className="text-[12px] text-[#10451d]" style={{ fontWeight: step >= s.num ? 500 : 400 }}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Upload Image Modal ───────────────────────────────────────────────────────

function UploadImageModal({
  onClose,
  onConfirm,
  previewUrl,
  onImageSelected,
}: {
  onClose: () => void;
  onConfirm: () => void;
  previewUrl: string | null;
  onImageSelected: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onImageSelected(url);
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="w-full bg-card rounded-t-3xl p-6 space-y-4" style={{ minHeight: "55%" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-[#10441d] text-[16px]">Upload cover image</p>
          <button onClick={onClose} className="p-1">
            <X size={20} className="text-[#10441d]" />
          </button>
        </div>

        {/* Upload area */}
        {previewUrl ? (
          <div className="relative rounded-lg overflow-hidden h-[200px]">
            <img src={previewUrl} alt="Cover" className="w-full h-full object-cover rounded-lg" />
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="h-[200px] rounded-lg border border-dashed border-[#d6dcec] bg-[#f5f6fa] flex flex-col items-center justify-center gap-3 cursor-pointer"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C20.1 4 16.5 5.7 14 8.5C10.1 9.3 7 12.8 7 17C7 21.4 10.4 25 14.7 25H32.9C37.9 25 42 20.9 42 15.9C42 11.5 38.8 7.8 34.5 7.1C32.5 5.1 29.4 4 26.1 4H24ZM28 20V26H20V20H15L24 11L33 20H28Z" fill="#3DBF00" />
              <path d="M8 32V40H40V32H36V36H12V32H8Z" fill="#3DBF00" />
            </svg>
            <p className="text-[#343e5a] text-[16px] text-center px-4">Tap here to upload your cover image</p>
            <p className="text-[#808db0] text-[13px]">Support for single upload</p>
          </div>
        )}

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          {previewUrl && (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex-1 h-[52px] rounded-xl border-2 border-foreground flex items-center justify-center gap-2 text-foreground text-[14px] font-bold hover:bg-muted transition-colors"
            >
              <Upload size={18} className="rotate-180" />
              Reupload
            </button>
          )}
          <button
            onClick={onConfirm}
            className="flex-1 h-[52px] rounded flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
            style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: General ──────────────────────────────────────────────────────────

function StepGeneral({ form, setForm, onNext, onUpload }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onNext: () => void;
  onUpload: () => void;
}) {
  const periods = ["Weekly", "Biweekly", "Monthly", "Quarterly"];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4 space-y-5">
      {/* Tribe Name */}
      <div>
        <label className="text-foreground text-[14px] block mb-1.5">Tribe name</label>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Enter tribe name"
          className="w-full h-11 border border-border rounded-lg px-3 text-foreground text-[13px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-input-background transition-colors"
        />
      </div>

      {/* Tribe Size */}
      <div>
        <label className="text-foreground text-[14px] block mb-1.5">Tribe size</label>
        <div className="flex items-center gap-4">
          {/* Slider */}
          <div className="flex-1">
            <div className="h-[6px] bg-[#e7e7e7] rounded">
              <div className="h-full bg-[#38B000] rounded" style={{ width: `${(form.size / 20) * 100}%` }} />
            </div>
            <input
              type="range"
              min={2} max={20}
              value={form.size}
              onChange={(e) => setForm((f) => ({ ...f, size: Number(e.target.value) }))}
              className="w-full mt-1 accent-[#38B000]"
            />
          </div>
          {/* Spinner */}
          <div className="flex flex-col items-center">
            <button onClick={() => setForm((f) => ({ ...f, size: Math.min(20, f.size + 1) }))}
              className="text-[#10441D] text-lg leading-none px-2">▲</button>
            <span className="text-[#10451d] text-[48px] font-semibold leading-none">{form.size}</span>
            <button onClick={() => setForm((f) => ({ ...f, size: Math.max(2, f.size - 1) }))}
              className="text-[#10441D] text-lg leading-none px-2">▼</button>
          </div>
        </div>
      </div>

      {/* Period of Payments + Amount */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-foreground text-[14px] block mb-1.5">Period of payments</label>
          <div className="relative">
            <select
              value={form.paymentPeriod}
              onChange={(e) => setForm((f) => ({ ...f, paymentPeriod: e.target.value }))}
              className="w-full h-11 border border-border rounded-lg px-3 text-foreground text-[12px] appearance-none bg-input-background outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            >
              <option value="">Select a period</option>
              {periods.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#10451d]/50 pointer-events-none" />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-foreground text-[14px] block mb-1.5">Amount</label>
          <input
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            placeholder="$ Amount to pay"
            type="number"
            className="w-full h-11 border border-border rounded-lg px-3 text-foreground text-[12px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-input-background transition-colors"
          />
        </div>
      </div>

      {/* Period of Time */}
      <div>
        <label className="text-foreground text-[14px] block mb-1.5">Period of time</label>
        <div className="flex gap-3">
          <DateField
            label="Start"
            value={form.startDate}
            onChange={(v) => setForm((f) => ({ ...f, startDate: v }))}
          />
          <DateField
            label="End"
            value={form.endDate}
            onChange={(v) => setForm((f) => ({ ...f, endDate: v }))}
          />
        </div>
      </div>

      {/* Upload cover image */}
      <div>
        {form.coverImage ? (
          <div className="relative rounded-lg overflow-hidden h-[120px]">
            <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={onUpload}
              className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2 text-white text-[14px] font-bold"
            >
              <Upload size={18} className="rotate-180" /> Change image
            </button>
          </div>
        ) : (
          <button
            onClick={onUpload}
            className="w-full h-14 border-2 border-foreground rounded-xl flex items-center justify-center gap-2 text-foreground text-[14px] font-bold hover:bg-muted transition-colors"
          >
            <Upload size={18} className="rotate-180" />
            Upload a cover image
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next button */}
      <button
        onClick={onNext}
        className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold mt-4 hover:opacity-90 active:scale-[0.98] transition-all duration-150"
        style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
      >
        Next
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M19 11.5H5.4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13 17.5L19 11.5L13 5.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

// ─── Step 2: Members ──────────────────────────────────────────────────────────

function StepMembers({ form, setForm, onNext }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onNext: () => void;
}) {
  const slots = Array.from({ length: form.size }, (_, i) => i);

  function updateMember(i: number, val: string) {
    setForm((f) => {
      const members = [...f.members];
      members[i] = val;
      return { ...f, members };
    });
  }

  const altColor = (i: number) =>
    i % 2 === 0 ? "#3DBF00" : "#10441D";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <p className="px-6 pt-4 pb-2 font-semibold text-foreground text-[16px]">Invite your tribe members</p>

      <div className="flex-1 overflow-y-auto px-6 space-y-3 pb-4">
        {slots.map((i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Number badge */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] flex-shrink-0"
              style={{ backgroundColor: altColor(i) }}
            >
              {i + 1}
            </div>
            {/* Email input */}
            <div className="flex-1 h-11 border border-border rounded-lg flex items-center px-3 bg-input-background">
              <input
                value={form.members[i] || ""}
                onChange={(e) => updateMember(i, e.target.value)}
                placeholder="Type member email here"
                type="email"
                className="w-full text-[#10451d] text-[12px] placeholder:text-[#91bd9c] outline-none bg-transparent"
              />
            </div>
            {/* Check */}
            <Check size={20} className="text-[#81A289] flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Send button */}
      <div className="px-6 pb-6 pt-2">
        <button
          onClick={onNext}
          className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
        >
          Send
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M19 11.5H5.4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M13 17.5L19 11.5L13 5.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Toggle Row ───────────────────────────────────────────────────────────────

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(!checked)}
        className="relative flex-shrink-0 w-[46px] h-[24px] rounded-full transition-colors duration-200"
        style={{ backgroundColor: checked ? "#3DBF00" : "#b3bdd8" }}
      >
        <div
          className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform duration-200"
          style={{ left: checked ? "calc(100% - 21px)" : "3px" }}
        />
      </button>
      <span className="text-[#10451d] text-[14px]">{label}</span>
    </div>
  );
}

// ─── Step 3: Notifications ────────────────────────────────────────────────────

function StepNotifications({ form, setForm, onPublish }: {
  form: TribeForm;
  setForm: React.Dispatch<React.SetStateAction<TribeForm>>;
  onPublish: () => void;
}) {
  const { notifications: n } = form;
  const set = (key: keyof typeof n, val: boolean | string) =>
    setForm((f) => ({ ...f, notifications: { ...f.notifications, [key]: val } }));

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 py-4 space-y-5">
      <p className="font-semibold text-foreground text-[16px] leading-snug">
        Decide how you want general<br />notifications in the tribe
      </p>

      <ToggleRow label="Change in turns" checked={n.changeInTurns} onChange={(v) => set("changeInTurns", v)} />
      <ToggleRow label="Messages in the wall" checked={n.messagesInWall} onChange={(v) => set("messagesInWall", v)} />
      <ToggleRow label="A completed cycle" checked={n.completedCycle} onChange={(v) => set("completedCycle", v)} />

      <div className="space-y-2">
        <ToggleRow label="Delay in cycle completion after" checked={n.delayInCycle} onChange={(v) => set("delayInCycle", v)} />
        {n.delayInCycle && (
          <div className="flex items-center gap-3 pl-14">
            <input
              value={n.delayDays}
              onChange={(e) => set("delayDays", e.target.value)}
              placeholder="Type number"
              type="number"
              className="w-[127px] h-11 border border-border rounded-lg px-3 text-foreground text-[12px] placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-input-background transition-colors"
            />
            <span className="text-[#10451d] text-[14px]">days</span>
          </div>
        )}
      </div>

      <ToggleRow label="Reported tribe member" checked={n.reportedMember} onChange={(v) => set("reportedMember", v)} />

      <div className="flex-1" />

      <button
        onClick={onPublish}
        className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold mt-4 hover:opacity-90 active:scale-[0.98] transition-all duration-150"
        style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
      >
        Publish tribe
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M19 11.5H5.4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13 17.5L19 11.5L13 5.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CreateTribe() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [showUpload, setShowUpload] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  const [form, setForm] = useState<TribeForm>({
    name: "",
    size: 4,
    paymentPeriod: "",
    amount: "",
    startDate: "",
    endDate: "",
    coverImage: null,
    members: [],
    notifications: {
      changeInTurns: true,
      messagesInWall: true,
      completedCycle: true,
      delayInCycle: false,
      delayDays: "",
      reportedMember: false,
    },
  });

  function handleBack() {
    if (step === 1) navigate(-1);
    else setStep((s) => (s - 1) as Step);
  }

  function handleNext() {
    if (step < 3) setStep((s) => (s + 1) as Step);
  }

  function handlePublish() {
    navigate("/your-tribes");
  }

  function handleUploadConfirm() {
    setForm((f) => ({ ...f, coverImage: pendingImage }));
    setShowUpload(false);
  }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 pt-16 pb-2">
          <button onClick={handleBack} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-[#10451d]" />
          </button>
          <span className="font-bold text-[#10451d] text-[16px]">Create new tribe</span>
          <button className="w-6 h-6 flex items-center justify-center">
            <MoreVertical size={20} className="text-[#10451d]" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex-shrink-0">
          <Stepper step={step} />
        </div>

        {/* Content */}
        {step === 1 && (
          <StepGeneral
            form={form}
            setForm={setForm}
            onNext={handleNext}
            onUpload={() => { setPendingImage(form.coverImage); setShowUpload(true); }}
          />
        )}
        {step === 2 && (
          <StepMembers form={form} setForm={setForm} onNext={handleNext} />
        )}
        {step === 3 && (
          <StepNotifications form={form} setForm={setForm} onPublish={handlePublish} />
        )}

        {/* Upload modal */}
        {showUpload && (
          <UploadImageModal
            onClose={() => setShowUpload(false)}
            onConfirm={handleUploadConfirm}
            previewUrl={pendingImage}
            onImageSelected={setPendingImage}
          />
        )}
      </div>
    </div>
  );
}
