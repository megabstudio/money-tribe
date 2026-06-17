import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, MoreVertical, Target, Wallet, Clock,
  Users, RefreshCw, Calendar, Send, X, ChevronDown, ChevronRight, CheckCircle,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface TribeMember {
  id: number;
  name: string;
  email: string;
  turnNumber: number;
  turnDate: string;
  status: "paid" | "waiting" | "declined" | "active" | "upcoming";
  initials: string;
}

interface TribeData {
  id: number;
  name: string;
  goal: number;
  payment: number;
  yourTurn: string;
  adminName: string;
  tribeSize: number;
  paymentPeriod: string;
  periodFrom: string;
  periodTo: string;
  paidOut: number;
  accentColor: string;
  currentUserMemberId: number;
  members: TribeMember[];
  messages: { id: number; sender: string; initials: string; text: string; time: string; isSelf: boolean }[];
}

const TRIBES: Record<string, TribeData> = {
  "1": {
    id: 1,
    name: "Buy your car in 2023",
    goal: 40000,
    payment: 5000,
    yourTurn: "Aug. 12 - 23",
    currentUserMemberId: 5,
    adminName: "Joshua Martinez",
    tribeSize: 8,
    paymentPeriod: "Biweekly",
    periodFrom: "12.3.23",
    periodTo: "12.7.23",
    paidOut: 4,
    accentColor: "#38B000",
    members: [
      { id: 1, name: "José Pérez",        email: "jperez@hotmail.com",    turnNumber: 1, turnDate: "12.2.23", status: "paid",     initials: "JP" },
      { id: 2, name: "Joshua Fernández",  email: "jfernandez@hotmail.com",turnNumber: 2, turnDate: "12.2.23", status: "paid",     initials: "JF" },
      { id: 3, name: "Emily Guerra",      email: "eguerra@hotmail.com",   turnNumber: 3, turnDate: "12.2.23", status: "paid",     initials: "EG" },
      { id: 4, name: "Juan García",       email: "jgarcia@hotmail.com",   turnNumber: 4, turnDate: "12.2.23", status: "active",   initials: "JG" },
      { id: 5, name: "Amy Gómez",         email: "agomez@hotmail.com",    turnNumber: 5, turnDate: "12.2.23", status: "waiting",  initials: "AG" },
      { id: 6, name: "Penelope Cruz",     email: "pcruz@hotmail.com",     turnNumber: 6, turnDate: "12.2.23", status: "waiting",  initials: "PC" },
      { id: 7, name: "Alice García",      email: "agarcia@hotmail.com",   turnNumber: 7, turnDate: "12.2.23", status: "upcoming", initials: "AG" },
      { id: 8, name: "Devendra Banhart",  email: "dbanhart@hotmail.com",  turnNumber: 8, turnDate: "12.2.23", status: "upcoming", initials: "DB" },
    ],
    messages: [
      { id: 1, sender: "José Pérez",  initials: "JP", text: "Wow! things are getting bad, the person that is missing the payment please do it now!", time: "12.3.23", isSelf: false },
      { id: 2, sender: "Juan García", initials: "JG", text: "Come on! you know who this is, don't push us to tag you man!", time: "12.3.23", isSelf: false },
      { id: 3, sender: "Me",          initials: "Me", text: "I'm sick of this! pay @Oliver Hernandez", time: "12.3.23", isSelf: true },
    ],
  },
  "2": {
    id: 2,
    name: "Emergency Stash",
    goal: 5000,
    payment: 1000,
    yourTurn: "Mar. 1 - 15",
    adminName: "Maria Lopez",
    tribeSize: 5,
    paymentPeriod: "Monthly",
    periodFrom: "01.1.23",
    periodTo: "06.1.23",
    paidOut: 3,
    accentColor: "#2E7D32",
    members: [
      { id: 1, name: "AJ Smith",     email: "aj@hotmail.com", turnNumber: 1, turnDate: "01.1.23", status: "paid",     initials: "AJ" },
      { id: 2, name: "Beth Morales", email: "bm@hotmail.com", turnNumber: 2, turnDate: "02.1.23", status: "paid",     initials: "BM" },
      { id: 3, name: "Carlos Kim",   email: "ck@hotmail.com", turnNumber: 3, turnDate: "03.1.23", status: "paid",     initials: "CK" },
      { id: 4, name: "Diana Torres", email: "dt@hotmail.com", turnNumber: 4, turnDate: "04.1.23", status: "active",   initials: "DT" },
      { id: 5, name: "Evan Ortiz",   email: "eo@hotmail.com", turnNumber: 5, turnDate: "05.1.23", status: "upcoming", initials: "EO" },
    ],
    messages: [
      { id: 1, sender: "AJ Smith",   initials: "AJ", text: "Hey everyone, don't forget the payment is due tomorrow!", time: "01.3.23", isSelf: false },
      { id: 2, sender: "Carlos Kim", initials: "CK", text: "Thanks for the reminder!", time: "01.3.23", isSelf: false },
    ],
  },
};

function getFallbackTribe(id: string): TribeData {
  return TRIBES[id] ?? TRIBES["1"];
}

// ─── Payment Badge (Turns tab) ────────────────────────────────────────────────

function PaymentBadge({ status }: { status: "Paid" | "Unpaid" }) {
  if (status === "Paid") return (
    <span className="px-2.5 py-1 rounded-lg text-[11px] bg-primary/20 text-primary font-semibold">Paid</span>
  );
  return (
    <span className="px-2.5 py-1 rounded-lg text-[11px] bg-muted text-muted-foreground font-medium">Unpaid</span>
  );
}

// ─── Turn Badge ───────────────────────────────────────────────────────────────

function TurnBadge({ member, highlighted }: { member: TribeMember; highlighted?: boolean }) {
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-medium ${
      highlighted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {member.turnNumber}
    </div>
  );
}

// ─── Member detail modal ──────────────────────────────────────────────────────

type ModalView = "options" | "swap" | "message";

function MemberModal({
  member,
  allMembers,
  currentUser,
  onClose,
  onSwapRequested,
}: {
  member: TribeMember;
  allMembers: TribeMember[];
  currentUser: TribeMember;
  onClose: () => void;
  onSwapRequested: () => void;
}) {
  const [view, setView] = useState<ModalView>("options");
  const [messageText, setMessageText] = useState("");

  function handleSend() {
    if (!messageText.trim()) return;
    onClose();
  }

  return (
    <div
      className="absolute inset-0 z-20 flex items-end"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full bg-card rounded-t-3xl flex flex-col" style={{ maxHeight: "85%" }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Top bar: back (if in sub-view) + close */}
        <div className="flex items-center px-5 pt-1 pb-2 flex-shrink-0">
          {view !== "options" ? (
            <button
              onClick={() => setView("options")}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Member identity — shown at top only in sub-views */}
        {view !== "options" && (
          <div className="flex items-center gap-4 px-6 pb-4 flex-shrink-0 border-b border-border">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-foreground text-lg font-semibold flex-shrink-0">
              {member.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-[17px] leading-tight">{member.name}</p>
              <p className="text-muted-foreground text-[13px] mt-0.5 truncate">{member.email}</p>
            </div>
            <div className="flex-shrink-0 bg-primary/10 px-3 py-1.5 rounded-full">
              <span className="text-[12px] font-semibold text-primary">Turn {member.turnNumber}</span>
            </div>
          </div>
        )}

        {/* ── View: Options ── */}
        {view === "options" && (
          <div className="px-6 pb-10 pt-2 space-y-3">
              {/* Member identity */}
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground text-base font-semibold flex-shrink-0">
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-[15px] leading-tight">{member.name}</p>
                  <p className="text-muted-foreground text-[12px] mt-0.5 truncate">{member.email}</p>
                </div>
                <div className="flex-shrink-0 bg-primary/10 px-2.5 py-1 rounded-full">
                  <span className="text-[11px] font-semibold text-primary">Turn {member.turnNumber}</span>
                </div>
              </div>
              <button
                onClick={() => setView("swap")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-muted/40 active:bg-muted transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-[15px]">Request turn swap</p>
                  <p className="text-muted-foreground text-[13px] mt-0.5">
                    Ask to swap payment turns with another member
                  </p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
              </button>

              <button
                onClick={() => setView("message")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-muted/40 active:bg-muted transition-colors text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Send size={20} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-[15px]">Send a message</p>
                  <p className="text-muted-foreground text-[13px] mt-0.5">
                    Send a direct message to this member
                  </p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
              </button>
          </div>
        )}

        {/* ── View: Swap ── */}
        {view === "swap" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                You're requesting to swap your turn with <span className="font-semibold text-foreground">{member.name.split(" ")[0]}</span>.
                They'll receive a notification to approve.
              </p>

              {/* Their turn */}
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-[15px] font-bold">{member.turnNumber}</span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                    {member.name.split(" ")[0]}'s turn
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar size={14} className="text-foreground" />
                    <p className="text-foreground text-[15px] font-semibold">{member.turnDate}</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <RefreshCw size={18} className="text-muted-foreground" />
              </div>

              {/* Your turn */}
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-[15px] font-bold">{currentUser.turnNumber}</span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                    Your turn
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar size={14} className="text-foreground" />
                    <p className="text-foreground text-[15px] font-semibold">{currentUser.turnDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-border">
              <button
                onClick={onSwapRequested}
                className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
              >
                <RefreshCw size={18} />
                Request swap
              </button>
            </div>
          </>
        )}

        {/* ── View: Message ── */}
        {view === "message" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-[14px] font-semibold text-foreground mb-1">Message</p>
              <p className="text-[13px] text-muted-foreground mb-3">
                Send a direct message to {member.name.split(" ")[0]}.
              </p>
              <textarea
                autoFocus
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your message…"
                rows={5}
                className="w-full rounded-xl border border-border px-4 py-3 text-foreground text-[14px] resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-card placeholder:text-muted-foreground transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                }}
              />
            </div>

            <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-border">
              <button
                onClick={handleSend}
                disabled={!messageText.trim()}
                className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
              >
                <Send size={18} />
                Send message
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = "turns" | "members" | "messages" | "info";

function TurnsTab({ tribe, onMemberClick }: { tribe: TribeData; onMemberClick: (m: TribeMember) => void }) {
  const currentRound = tribe.paidOut;
  const [selectedRound, setSelectedRound] = useState(currentRound);

  function paymentStatus(memberTurnNumber: number): "Paid" | "Unpaid" {
    if (selectedRound < currentRound) return "Paid";
    if (selectedRound > currentRound) return "Unpaid";
    return memberTurnNumber <= currentRound ? "Paid" : "Unpaid";
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Round selector */}
      <div className="px-6 pt-4 pb-3 border-b border-border">
        <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide block mb-1.5">
          Round
        </label>
        <div className="relative">
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
            className="w-full h-11 border border-border rounded-lg px-3 pr-8 text-foreground text-[14px] font-medium appearance-none bg-input-background outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          >
            {Array.from({ length: tribe.tribeSize }, (_, i) => i + 1).map((r) => (
              <option key={r} value={r}>
                Round {r}{r === currentRound ? "  (Current)" : ""}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />
        </div>
      </div>

      {/* Member list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {tribe.members.map((m) => {
          const isRecipient = m.turnNumber === selectedRound;
          return (
            <button
              key={m.id}
              onClick={() => onMemberClick(m)}
              className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-colors ${
                isRecipient
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-muted/40"
              }`}
            >
              <TurnBadge member={m} highlighted={isRecipient} />
              <div className="flex-1 text-left min-w-0">
                <p className={`text-[15px] truncate ${isRecipient ? "font-semibold text-foreground" : "text-foreground"}`}>
                  {m.name}
                </p>
                {isRecipient && (
                  <p className="text-[11px] text-primary font-medium">Recipient this round</p>
                )}
              </div>
              <PaymentBadge status={paymentStatus(m.turnNumber)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MembersTab({ tribe, onMemberClick }: { tribe: TribeData; onMemberClick: (m: TribeMember) => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Table header */}
      <div className="flex items-center px-6 h-[46px] bg-muted/40">
        <span className="w-8 text-center text-foreground text-[13px] font-medium">#</span>
        <span className="flex-1 ml-2 text-foreground text-[13px] font-medium">Name</span>
        <span className="text-foreground text-[13px] font-medium">Turn</span>
      </div>
      {tribe.members.map((m, i) => (
        <button
          key={m.id}
          onClick={() => onMemberClick(m)}
          className={`w-full flex items-center px-6 h-[48px] ${i % 2 === 0 ? "bg-muted/40" : "bg-card"}`}
        >
          <span className="w-8 text-center text-foreground text-[13px]">{m.turnNumber}</span>
          <span className={`flex-1 ml-2 text-foreground text-[15px] ${m.status === "active" ? "font-semibold" : ""}`}>{m.name}</span>
          <span className="text-foreground text-[13px]">{m.turnDate}</span>
        </button>
      ))}
    </div>
  );
}

function MessagesTab({ tribe }: { tribe: TribeData }) {
  const [text, setText] = useState("");
  const [composing, setComposing] = useState(false);
  const [messages, setMessages] = useState(tribe.messages);

  function handleSend() {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "Me", initials: "Me", text: text.trim(), time: "now", isSelf: true },
    ]);
    setText("");
    setComposing(false);
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-3 border-b border-border">
        <p className="text-foreground text-[15px] font-semibold">General chat</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isSelf ? "flex-row-reverse" : ""}`}>
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium text-foreground flex-shrink-0">
              {msg.initials}
            </div>
            <div className={`max-w-[75%] rounded-xl px-3 py-2 ${msg.isSelf ? "bg-primary/15" : "bg-muted"}`}>
              {!msg.isSelf && <p className="text-foreground text-[11px] font-medium mb-0.5">{msg.sender}</p>}
              <p className="text-foreground text-[12px] leading-[18px]">{msg.text}</p>
              <p className="text-muted-foreground text-[10px] mt-1 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        {composing ? (
          <div className="flex flex-col gap-2">
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message..."
              rows={3}
              className="w-full rounded-xl border border-border px-4 py-3 text-foreground text-[14px] resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-card placeholder:text-muted-foreground transition-colors"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setComposing(false); setText(""); }}
                className="flex-1 h-[44px] rounded-xl border border-border text-foreground text-[14px] font-semibold bg-card hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="flex-1 h-[44px] rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
                style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setComposing(true)}
            className="w-full h-[52px] rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
            style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
          >
            <Send size={18} />
            Type message
          </button>
        )}
      </div>
    </div>
  );
}

function InfoTab({ tribe }: { tribe: TribeData }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
      {/* Stats row */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Target size={16} className="text-muted-foreground" />
            <span className="text-foreground text-[11px]">Tribe Goal</span>
          </div>
          <p className="text-primary text-[18px] font-semibold">R {tribe.goal.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Wallet size={16} className="text-muted-foreground" />
            <span className="text-foreground text-[11px]">Payment</span>
          </div>
          <p className="text-primary text-[18px] font-semibold">R {tribe.payment.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-foreground text-[11px]">Your turn</span>
          </div>
          <p className="text-primary text-[14px] font-semibold">{tribe.yourTurn}</p>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Admin */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <Users size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-foreground text-[15px] font-medium">{tribe.adminName}</p>
          <p className="text-muted-foreground text-[13px]">Admin</p>
        </div>
      </div>

      {/* Tribe size */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <Users size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-foreground text-[15px] font-semibold">{tribe.tribeSize}</p>
          <p className="text-muted-foreground text-[13px]">Tribe size</p>
        </div>
      </div>

      {/* Payment period */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <RefreshCw size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-foreground text-[15px] font-medium">{tribe.paymentPeriod}</p>
          <p className="text-muted-foreground text-[13px]">Payment period</p>
        </div>
      </div>

      {/* Tribe period */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <Calendar size={18} className="text-foreground" />
        </div>
        <div>
          <div className="flex items-center gap-1 text-[15px]">
            <span className="text-muted-foreground">from</span>
            <span className="text-foreground font-semibold">{tribe.periodFrom}</span>
            <span className="text-muted-foreground">to</span>
            <span className="text-foreground font-semibold">{tribe.periodTo}</span>
          </div>
          <p className="text-muted-foreground text-[13px]">Tribe period</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TribeDetail() {
  const { id = "1" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tribe = getFallbackTribe(id);
  const [activeTab, setActiveTab] = useState<Tab>("turns");
  const [selectedMember, setSelectedMember] = useState<TribeMember | null>(null);
  const [showSwapToast, setShowSwapToast] = useState(false);

  useEffect(() => {
    if (!showSwapToast) return;
    const t = setTimeout(() => setShowSwapToast(false), 3500);
    return () => clearTimeout(t);
  }, [showSwapToast]);

  function handleSwapRequested() {
    setSelectedMember(null);
    setShowSwapToast(true);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "turns",    label: "Turns"    },
    { key: "members",  label: "Members"  },
    { key: "messages", label: "Messages" },
    { key: "info",     label: "Info"     },
  ];

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        {/* ── Hero header ── */}
        <div className="relative h-[258px] flex-shrink-0 overflow-hidden rounded-bl-[16px] rounded-br-[16px]">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, #04270D 28%, #CCEFBB 140%)", opacity: 0.92 }}
          />

          {/* Nav row */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-[62px]">
            <button onClick={() => navigate("/your-tribes")} className="w-6 h-6">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <span className="text-white text-[16px] font-bold">Your tribes</span>
            <button className="w-6 h-6 flex items-center justify-center">
              <MoreVertical size={20} className="text-white" />
            </button>
          </div>

          {/* Tabs row */}
          <div className="relative z-10 flex items-center justify-between px-6 mt-6">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="flex flex-col items-center gap-1 pb-1"
              >
                <span className={`text-[12px] font-medium ${activeTab === t.key ? "text-white" : "text-white/60"}`}>
                  {t.label}
                </span>
                {activeTab === t.key && (
                  <div className="h-[2px] w-full rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Tribe name block */}
          <div className="relative z-10 px-8 mt-4">
            <p className="text-white/60 text-[12px]">Tribe name</p>
            <p className="text-white text-[16px] font-semibold">{tribe.name}</p>
          </div>

          {/* Member payout circle — segmented arcs, one per member */}
          <div className="absolute right-8 bottom-6 z-10">
            <div className="relative w-[85px] h-[85px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 85 85">
                {Array.from({ length: tribe.tribeSize }).map((_, index) => {
                  const circumference = 2 * Math.PI * 31;
                  const dashLen = (circumference / tribe.tribeSize) * 0.65;
                  const gapLen  = (circumference / tribe.tribeSize) * 0.35;
                  const offset  = -index * (circumference / tribe.tribeSize);
                  return (
                    <circle
                      key={index}
                      cx="42.5" cy="42.5" r="31"
                      fill="none"
                      stroke={index < tribe.paidOut ? "#3DBF00" : "rgba(255,255,255,0.2)"}
                      strokeWidth="7"
                      strokeDasharray={`${dashLen} ${gapLen}`}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[11px] font-medium">{tribe.paidOut}/{tribe.tribeSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab content ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {activeTab === "turns"    && <TurnsTab    tribe={tribe} onMemberClick={setSelectedMember} />}
          {activeTab === "members"  && <MembersTab  tribe={tribe} onMemberClick={setSelectedMember} />}
          {activeTab === "messages" && <MessagesTab tribe={tribe} />}
          {activeTab === "info"     && <InfoTab     tribe={tribe} />}
        </div>

        {/* ── Member modal — at phone-frame level so overlay covers full height ── */}
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            allMembers={tribe.members}
            currentUser={tribe.members.find((m) => m.id === tribe.currentUserMemberId)!}
            onClose={() => setSelectedMember(null)}
            onSwapRequested={handleSwapRequested}
          />
        )}

        {/* ── Swap toast ── */}
        <div
          className="absolute left-4 right-4 z-30 pointer-events-none transition-all duration-300 ease-out"
          style={{
            top: "20px",
            transform: showSwapToast ? "translateY(0)" : "translateY(-16px)",
            opacity: showSwapToast ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lg"
            style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
          >
            <CheckCircle size={20} className="text-white flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-[14px] font-semibold leading-tight">Turn swap requested</p>
              <p className="text-white/80 text-[12px] mt-0.5">The member will be notified to approve.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
