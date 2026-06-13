import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, MoreVertical, Target, Wallet, Clock,
  Users, RefreshCw, Calendar, Send, X, ChevronDown,
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
    adminName: "Joshua Martinez",
    tribeSize: 8,
    paymentPeriod: "Biweekly",
    periodFrom: "12.3.23",
    periodTo: "12.7.23",
    paidOut: 4,
    accentColor: "#38B000",
    members: [
      { id: 1, name: "José Pérez", email: "jperez@hotmail.com", turnNumber: 1, turnDate: "12.2.23", status: "paid", initials: "JP" },
      { id: 2, name: "Joshua Fernández", email: "jfernandez@hotmail.com", turnNumber: 2, turnDate: "12.2.23", status: "paid", initials: "JF" },
      { id: 3, name: "Emily Guerra", email: "eguerra@hotmail.com", turnNumber: 3, turnDate: "12.2.23", status: "paid", initials: "EG" },
      { id: 4, name: "Juan García", email: "jgarcia@hotmail.com", turnNumber: 4, turnDate: "12.2.23", status: "active", initials: "JG" },
      { id: 5, name: "Amy Gómez", email: "agomez@hotmail.com", turnNumber: 5, turnDate: "12.2.23", status: "waiting", initials: "AG" },
      { id: 6, name: "Penelope Cruz", email: "pcruz@hotmail.com", turnNumber: 6, turnDate: "12.2.23", status: "waiting", initials: "PC" },
      { id: 7, name: "Alice García", email: "agarcia@hotmail.com", turnNumber: 7, turnDate: "12.2.23", status: "upcoming", initials: "AG" },
      { id: 8, name: "Devendra Banhart", email: "dbanhart@hotmail.com", turnNumber: 8, turnDate: "12.2.23", status: "upcoming", initials: "DB" },
    ],
    messages: [
      { id: 1, sender: "José Pérez", initials: "JP", text: "Wow! things are getting bad, the person that is missing the payment please do it now!", time: "12.3.23", isSelf: false },
      { id: 2, sender: "Juan García", initials: "JG", text: "Come on! you know who this is, don't push us to tag you man!", time: "12.3.23", isSelf: false },
      { id: 3, sender: "Me", initials: "Me", text: "I'm sick of this! pay @Oliver Hernandez", time: "12.3.23", isSelf: true },
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
      { id: 1, name: "AJ Smith", email: "aj@hotmail.com", turnNumber: 1, turnDate: "01.1.23", status: "paid", initials: "AJ" },
      { id: 2, name: "Beth Morales", email: "bm@hotmail.com", turnNumber: 2, turnDate: "02.1.23", status: "paid", initials: "BM" },
      { id: 3, name: "Carlos Kim", email: "ck@hotmail.com", turnNumber: 3, turnDate: "03.1.23", status: "paid", initials: "CK" },
      { id: 4, name: "Diana Torres", email: "dt@hotmail.com", turnNumber: 4, turnDate: "04.1.23", status: "active", initials: "DT" },
      { id: 5, name: "Evan Ortiz", email: "eo@hotmail.com", turnNumber: 5, turnDate: "05.1.23", status: "upcoming", initials: "EO" },
    ],
    messages: [
      { id: 1, sender: "AJ Smith", initials: "AJ", text: "Hey everyone, don't forget the payment is due tomorrow!", time: "01.3.23", isSelf: false },
      { id: 2, sender: "Carlos Kim", initials: "CK", text: "Thanks for the reminder!", time: "01.3.23", isSelf: false },
    ],
  },
};

function getFallbackTribe(id: string): TribeData {
  return TRIBES[id] ?? TRIBES["1"];
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TribeMember["status"] }) {
  if (status === "paid") return (
    <span className="px-2 py-1 rounded-lg text-[11px] bg-primary/15 text-primary font-medium">Paid</span>
  );
  if (status === "active") return (
    <span className="px-2 py-1 rounded-lg text-[11px] bg-primary/20 text-primary font-semibold">Active</span>
  );
  if (status === "waiting") return (
    <span className="px-2 py-1 rounded-lg text-[11px] bg-warning/20 text-warning font-medium">Waiting</span>
  );
  if (status === "declined") return (
    <span className="px-2 py-1 rounded-lg text-[11px] bg-destructive/15 text-destructive font-medium">Declined</span>
  );
  return (
    <span className="px-2 py-1 rounded-lg text-[11px] bg-muted text-muted-foreground">Upcoming</span>
  );
}

function TurnBadge({ member }: { member: TribeMember }) {
  let bg = "#10451D";
  if (member.status === "active") bg = "#3DBF00";
  else if (member.status === "waiting" || member.status === "upcoming") bg = "#91BD9C";
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px]"
      style={{ backgroundColor: bg }}
    >
      {member.turnNumber}
    </div>
  );
}

// ─── Member detail modal ──────────────────────────────────────────────────────

function MemberModal({
  member,
  onClose,
}: {
  member: TribeMember;
  onClose: () => void;
}) {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [composing, setComposing] = useState(false);
  const [messageText, setMessageText] = useState("");

  function handleSendMessage() {
    if (!messageText.trim()) return;
    setMessageText("");
    setComposing(false);
    onClose();
  }

  return (
    <div className="absolute inset-0 z-20 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="w-full bg-card rounded-t-3xl p-6 space-y-4" style={{ minHeight: "60%" }}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <X size={20} className="text-[#10451d]" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-4 pt-2">
          <div className="w-[88px] h-[88px] rounded-full bg-muted flex items-center justify-center text-foreground text-xl font-semibold flex-shrink-0">
            {member.initials}
          </div>
          <div>
            <p className="font-semibold text-[#10451d] text-[16px]">{member.name}</p>
            <p className="text-muted-foreground text-[12px]">{member.email}</p>
          </div>
        </div>

        {/* Payment turn */}
        <div>
          <p className="text-muted-foreground text-[14px]">Payment turn</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Calendar size={16} className="text-[#10451d]" />
            <p className="text-[#10451d] text-[16px] font-semibold">{member.turnDate}</p>
          </div>
        </div>

        {/* Turn changes */}
        {!composing && (
          <div>
            <div className="flex items-center gap-2 text-[#699f76] text-[14px]">
              <RefreshCw size={14} />
              <span>Turn changes</span>
            </div>
            <div className="mt-2 border border-[rgba(121,173,134,0.73)] rounded flex items-center justify-between px-3 h-[44px]">
              <span className="text-[#91BD9C] text-[12px]">List of tribe members</span>
              <ChevronDown size={16} className="text-[#10451d]/50" />
            </div>
          </div>
        )}

        {/* Message compose area */}
        {composing && (
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-[13px]">Message to {member.name}</p>
            <textarea
              autoFocus
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write a message..."
              rows={3}
              className="w-full rounded-xl border border-[#91BD9C] px-4 py-3 text-[#10451d] text-[14px] resize-none outline-none focus:border-[#38B000] bg-white placeholder:text-[#91BD9C]"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
            />
          </div>
        )}

        {/* Actions */}
        {!composing ? (
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setComposing(true)}
              className="flex-1 h-[56px] rounded-lg flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
              style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
            >
              <Send size={18} className="text-white" />
              Type message
            </button>
            {!showChangeModal && (
              <button
                onClick={() => setShowChangeModal(true)}
                className="flex-1 h-[56px] rounded-lg bg-[#91BD9C] flex items-center justify-center gap-2 text-[#10451d] text-[14px] font-semibold"
              >
                <RefreshCw size={16} />
                Request change
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => { setComposing(false); setMessageText(""); }}
              className="flex-1 h-[52px] rounded-lg border border-[#91BD9C] text-[#10451d] text-[14px] font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              className="flex-1 h-[52px] rounded-lg flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
              style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
            >
              <Send size={16} />
              Send
            </button>
          </div>
        )}

        {showChangeModal && !composing && (
          <button
            className="w-full h-[56px] rounded-lg flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
            style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
            onClick={() => { setShowChangeModal(false); onClose(); }}
          >
            <Send size={18} />
            Confirm request
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = "turns" | "members" | "messages" | "info";

function TurnsTab({ tribe, onMemberClick }: { tribe: TribeData; onMemberClick: (m: TribeMember) => void }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
      {tribe.members.map((m) => (
        <button
          key={m.id}
          onClick={() => onMemberClick(m)}
          className="w-full flex items-center gap-4"
        >
          <TurnBadge member={m} />
          <span className="flex-1 text-left text-[#10451d] text-[15px]">{m.name}</span>
          <StatusBadge status={m.status} />
        </button>
      ))}
      <div className="pt-4">
        <button
          className="w-full h-[52px] rounded flex items-center justify-center text-white text-[14px] font-semibold"
          style={{ background: "linear-gradient(140deg, #3DBF00 0%, #34A300 100%)" }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

function MembersTab({ tribe, onMemberClick }: { tribe: TribeData; onMemberClick: (m: TribeMember) => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Table header */}
      <div className="flex items-center px-6 h-[46px] bg-muted/40">
        <span className="w-8 text-center text-[#10451d] text-[13px] font-medium">#</span>
        <span className="flex-1 ml-2 text-[#10451d] text-[13px] font-medium">Name</span>
        <span className="text-[#10451d] text-[13px] font-medium">Turn</span>
      </div>
      {tribe.members.map((m, i) => (
        <button
          key={m.id}
          onClick={() => onMemberClick(m)}
          className={`w-full flex items-center px-6 h-[48px] ${i % 2 === 0 ? "bg-muted/40" : "bg-card"}`}
        >
          <span className="w-8 text-center text-[#10451d] text-[13px]">{m.turnNumber}</span>
          <span className={`flex-1 ml-2 text-[#10451d] text-[15px] ${m.status === "active" ? "font-semibold" : ""}`}>{m.name}</span>
          <span className="text-[#10451d] text-[13px]">{m.turnDate}</span>
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
        <p className="text-[#10451d] text-[15px] font-semibold">General chat</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isSelf ? "flex-row-reverse" : ""}`}>
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium text-foreground flex-shrink-0">
              {msg.initials}
            </div>
            <div
              className={`max-w-[75%] rounded-xl px-3 py-2 ${msg.isSelf ? "bg-primary/15" : "bg-muted"}`}
            >
              {!msg.isSelf && <p className="text-[#10451d] text-[11px] font-medium mb-0.5">{msg.sender}</p>}
              <p className="text-[#10451d] text-[12px] leading-[18px]">{msg.text}</p>
              <p className="text-[#808080] text-[10px] mt-1 text-right">{msg.time}</p>
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
              className="w-full rounded-xl border border-[#91BD9C] px-4 py-3 text-[#10451d] text-[14px] resize-none outline-none focus:border-[#38B000] bg-white placeholder:text-[#91BD9C]"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setComposing(false); setText(""); }}
                className="flex-1 h-[44px] rounded-lg border border-[#91BD9C] text-[#10451d] text-[14px] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="flex-1 h-[44px] rounded-lg flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
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
            className="w-full h-[52px] rounded flex items-center justify-center gap-2 text-white text-[14px] font-semibold"
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
            <Target size={16} className="text-[#81A289]" />
            <span className="text-[#10451d] text-[11px]">Tribe Goal</span>
          </div>
          <p className="text-primary text-[18px] font-semibold">R {tribe.goal.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="w-px bg-[#EAF1EC]" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Wallet size={16} className="text-[#81A289]" />
            <span className="text-[#10451d] text-[11px]">Payment</span>
          </div>
          <p className="text-primary text-[18px] font-semibold">R {tribe.payment.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="w-px bg-[#EAF1EC]" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-[#81A289]" />
            <span className="text-[#10451d] text-[11px]">Your turn</span>
          </div>
          <p className="text-primary text-[14px] font-semibold">{tribe.yourTurn}</p>
        </div>
      </div>

      <div className="border-t border-[#EAF1EC]" />

      {/* Admin */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <Users size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-[#10451d] text-[15px] font-medium">{tribe.adminName}</p>
          <p className="text-muted-foreground text-[13px]">Admin</p>
        </div>
      </div>

      {/* Tribe size */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <Users size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-[#10451d] text-[15px] font-semibold">{tribe.tribeSize}</p>
          <p className="text-muted-foreground text-[13px]">Tribe size</p>
        </div>
      </div>

      {/* Payment period */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted flex-shrink-0">
          <RefreshCw size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-[#10451d] text-[15px] font-medium">{tribe.paymentPeriod}</p>
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
            <span className="text-[#10451d] font-semibold">{tribe.periodFrom}</span>
            <span className="text-muted-foreground">to</span>
            <span className="text-[#10451d] font-semibold">{tribe.periodTo}</span>
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

  const tabs: { key: Tab; label: string }[] = [
    { key: "turns", label: "Turns" },
    { key: "members", label: "Members" },
    { key: "messages", label: "Messages" },
    { key: "info", label: "Info" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        {/* ── Hero header ── */}
        <div className="relative h-[258px] flex-shrink-0 overflow-hidden rounded-bl-[16px] rounded-br-[16px]">
          {/* Background image / gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #04270D 28%, #CCEFBB 140%)",
              opacity: 0.92,
            }}
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
                  <div className="h-[2px] w-full rounded-full bg-[#3DBF00]" />
                )}
              </button>
            ))}
          </div>

          {/* Tribe name block */}
          <div className="relative z-10 px-8 mt-4">
            <p className="text-[#a2f8b7] text-[12px]">Tribe name</p>
            <p className="text-white text-[16px] font-semibold">{tribe.name}</p>
          </div>

          {/* Member payout circle */}
          <div className="absolute right-8 bottom-6 z-10">
            <div className="relative w-[85px] h-[85px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 85 85">
                <circle cx="42.5" cy="42.5" r="31" fill="none" stroke="#DBEEE0" strokeWidth="20" />
                <circle
                  cx="42.5" cy="42.5" r="31"
                  fill="none"
                  stroke="#3DBF00"
                  strokeWidth="20"
                  strokeDasharray={`${(tribe.paidOut / tribe.tribeSize) * 2 * Math.PI * 31} ${2 * Math.PI * 31}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[11px] font-medium">{tribe.paidOut}/{tribe.tribeSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab content ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background relative">
          {activeTab === "turns" && (
            <TurnsTab tribe={tribe} onMemberClick={setSelectedMember} />
          )}
          {activeTab === "members" && (
            <MembersTab tribe={tribe} onMemberClick={setSelectedMember} />
          )}
          {activeTab === "messages" && (
            <MessagesTab tribe={tribe} />
          )}
          {activeTab === "info" && (
            <InfoTab tribe={tribe} />
          )}

          {/* Member modal */}
          {selectedMember && (
            <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
          )}
        </div>
      </div>
    </div>
  );
}
