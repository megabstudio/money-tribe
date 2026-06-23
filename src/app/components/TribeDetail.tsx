import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, MoreVertical,
  RefreshCw, Calendar, Send, X, ChevronDown, ChevronRight, CheckCircle, MessageCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TribeMember {
  id: number;
  name: string;
  email: string;
  turnNumber: number;
  turnDate: string;
  status: "paid" | "waiting" | "declined" | "active" | "upcoming";
  initials: string;
}

interface WallReaction { emoji: string; count: number; mine: boolean }
interface WallReply {
  id: number;
  authorName: string;
  authorInitials: string;
  text: string;
  time: string;
  isSelf: boolean;
}
interface WallPost {
  id: number;
  authorName: string;
  authorInitials: string;
  text: string;
  time: string;
  isSelf: boolean;
  reactions: WallReaction[];
  replies: WallReply[];
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
  wallPosts: WallPost[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const REACTION_EMOJIS = ["❤️", "😂", "🔥", "👏", "😮"];

const COMMON_EMOJIS = [
  "😀", "😂", "😊", "🥰", "😍", "🤩", "😮", "😎",
  "👋", "👏", "🙌", "🤝", "💪", "🫶", "❤️", "🔥",
  "✅", "🎉", "🏆", "💰", "🚀", "⭐", "💯", "😤",
];

function makeReactions(): WallReaction[] {
  return REACTION_EMOJIS.map((emoji) => ({ emoji, count: 0, mine: false }));
}

// ─── Data ────────────────────────────────────────────────────────────────────

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
    accentColor: "#3dbf00",
    members: [
      { id: 1, name: "José Pérez",        email: "jperez@hotmail.com",     turnNumber: 1, turnDate: "12.2.23", status: "paid",     initials: "JP" },
      { id: 2, name: "Joshua Fernández",  email: "jfernandez@hotmail.com", turnNumber: 2, turnDate: "12.2.23", status: "paid",     initials: "JF" },
      { id: 3, name: "Emily Guerra",      email: "eguerra@hotmail.com",    turnNumber: 3, turnDate: "12.2.23", status: "paid",     initials: "EG" },
      { id: 4, name: "Juan García",       email: "jgarcia@hotmail.com",    turnNumber: 4, turnDate: "12.2.23", status: "active",   initials: "JG" },
      { id: 5, name: "Amy Gómez",         email: "agomez@hotmail.com",     turnNumber: 5, turnDate: "12.2.23", status: "waiting",  initials: "AG" },
      { id: 6, name: "Penelope Cruz",     email: "pcruz@hotmail.com",      turnNumber: 6, turnDate: "12.2.23", status: "waiting",  initials: "PC" },
      { id: 7, name: "Alice García",      email: "agarcia@hotmail.com",    turnNumber: 7, turnDate: "12.2.23", status: "upcoming", initials: "AG" },
      { id: 8, name: "Devendra Banhart",  email: "dbanhart@hotmail.com",   turnNumber: 8, turnDate: "12.2.23", status: "upcoming", initials: "DB" },
    ],
    wallPosts: [
      {
        id: 3,
        authorName: "Me",
        authorInitials: "AG",
        text: "I'm sick of this! Pay @Oliver_Hernandez now or we escalate 🚨",
        time: "Just now",
        isSelf: true,
        reactions: [
          { emoji: "❤️", count: 0, mine: false },
          { emoji: "😂", count: 3, mine: false },
          { emoji: "🔥", count: 1, mine: true },
          { emoji: "👏", count: 0, mine: false },
          { emoji: "😮", count: 2, mine: false },
        ],
        replies: [
          { id: 31, authorName: "José Pérez", authorInitials: "JP", text: "Facts! @Oliver_Hernandez you better respond 😤", time: "12.3.23", isSelf: false },
        ],
      },
      {
        id: 2,
        authorName: "Juan García",
        authorInitials: "JG",
        text: "Come on! you know who this is, don't push us to tag you man!",
        time: "12.3.23",
        isSelf: false,
        reactions: [
          { emoji: "❤️", count: 5, mine: false },
          { emoji: "😂", count: 0, mine: false },
          { emoji: "🔥", count: 2, mine: false },
          { emoji: "👏", count: 3, mine: true },
          { emoji: "😮", count: 0, mine: false },
        ],
        replies: [],
      },
      {
        id: 1,
        authorName: "José Pérez",
        authorInitials: "JP",
        text: "Wow! things are getting bad — the person missing the payment please do it now! 🙏",
        time: "12.3.23",
        isSelf: false,
        reactions: [
          { emoji: "❤️", count: 2, mine: false },
          { emoji: "😂", count: 0, mine: false },
          { emoji: "🔥", count: 4, mine: true },
          { emoji: "👏", count: 1, mine: false },
          { emoji: "😮", count: 3, mine: false },
        ],
        replies: [
          { id: 11, authorName: "Emily Guerra", authorInitials: "EG", text: "Agreed, this can't continue", time: "12.3.23", isSelf: false },
          { id: 12, authorName: "Me", authorInitials: "AG", text: "We need to talk about this 🤝", time: "12.3.23", isSelf: true },
        ],
      },
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
    accentColor: "#2a8a00",
    currentUserMemberId: 5,
    members: [
      { id: 1, name: "AJ Smith",     email: "aj@hotmail.com", turnNumber: 1, turnDate: "01.1.23", status: "paid",     initials: "AJ" },
      { id: 2, name: "Beth Morales", email: "bm@hotmail.com", turnNumber: 2, turnDate: "02.1.23", status: "paid",     initials: "BM" },
      { id: 3, name: "Carlos Kim",   email: "ck@hotmail.com", turnNumber: 3, turnDate: "03.1.23", status: "paid",     initials: "CK" },
      { id: 4, name: "Diana Torres", email: "dt@hotmail.com", turnNumber: 4, turnDate: "04.1.23", status: "active",   initials: "DT" },
      { id: 5, name: "Evan Ortiz",   email: "eo@hotmail.com", turnNumber: 5, turnDate: "05.1.23", status: "upcoming", initials: "EO" },
    ],
    wallPosts: [
      {
        id: 2,
        authorName: "Carlos Kim",
        authorInitials: "CK",
        text: "Thanks @AJ_Smith for the reminder! 🙏 Already sent my contribution.",
        time: "01.3.23",
        isSelf: false,
        reactions: [
          { emoji: "❤️", count: 3, mine: true },
          { emoji: "😂", count: 0, mine: false },
          { emoji: "🔥", count: 0, mine: false },
          { emoji: "👏", count: 2, mine: false },
          { emoji: "😮", count: 0, mine: false },
        ],
        replies: [],
      },
      {
        id: 1,
        authorName: "AJ Smith",
        authorInitials: "AJ",
        text: "Hey everyone, don't forget the payment is due tomorrow! 💰 Let's keep the streak going.",
        time: "01.3.23",
        isSelf: false,
        reactions: [
          { emoji: "❤️", count: 1, mine: false },
          { emoji: "😂", count: 0, mine: false },
          { emoji: "🔥", count: 0, mine: false },
          { emoji: "👏", count: 4, mine: false },
          { emoji: "😮", count: 0, mine: false },
        ],
        replies: [],
      },
    ],
  },
};

function getFallbackTribe(id: string): TribeData {
  return TRIBES[id] ?? TRIBES["1"];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderWithMentions(text: string) {
  const parts = text.split(/(@[A-Za-z_]+)/g);
  return parts.map((part, i) =>
    /^@[A-Za-z_]+$/.test(part)
      ? <span key={i} className="font-semibold text-primary">{part}</span>
      : <span key={i}>{part}</span>
  );
}

// ─── Payment Badge ─────────────────────────────────────────────────────────────

function PaymentBadge({ status }: { status: "Paid" | "Unpaid" }) {
  if (status === "Paid") return (
    <span className="px-2.5 py-1 rounded-lg text-[11px] bg-primary/20 text-primary font-semibold">Paid</span>
  );
  return (
    <span className="px-2.5 py-1 rounded-lg text-[11px] bg-muted text-muted-foreground font-medium">Unpaid</span>
  );
}

// ─── Turn Badge ────────────────────────────────────────────────────────────────

function TurnBadge({ member, highlighted }: { member: TribeMember; highlighted?: boolean }) {
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-medium ${
      highlighted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {member.turnNumber}
    </div>
  );
}

// ─── Member modal ──────────────────────────────────────────────────────────────

type ModalView = "options" | "swap" | "message";

function MemberModal({
  member, allMembers, currentUser, onClose, onSwapRequested,
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
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        <div className="flex items-center px-5 pt-1 pb-2 flex-shrink-0">
          {view !== "options" ? (
            <button onClick={() => setView("options")} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <div className="flex-1" />
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

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

        {view === "options" && (
          <div className="px-6 pb-10 pt-2 space-y-3">
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
                <p className="text-muted-foreground text-[13px] mt-0.5">Ask to swap payment turns with another member</p>
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
                <p className="text-muted-foreground text-[13px] mt-0.5">Send a direct message to this member</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
            </button>
          </div>
        )}

        {view === "swap" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                You're requesting to swap your turn with <span className="font-semibold text-foreground">{member.name.split(" ")[0]}</span>. They'll receive a notification to approve.
              </p>
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-[15px] font-bold">{member.turnNumber}</span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">{member.name.split(" ")[0]}'s turn</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar size={14} className="text-foreground" />
                    <p className="text-foreground text-[15px] font-semibold">{member.turnDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <RefreshCw size={18} className="text-muted-foreground" />
              </div>
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-[15px] font-bold">{currentUser.turnNumber}</span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">Your turn</p>
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
                style={{ background: "var(--cta-gradient)" }}
              >
                <RefreshCw size={18} />
                Request swap
              </button>
            </div>
          </>
        )}

        {view === "message" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-[14px] font-semibold text-foreground mb-1">Message</p>
              <p className="text-[13px] text-muted-foreground mb-3">Send a direct message to {member.name.split(" ")[0]}.</p>
              <textarea
                autoFocus
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your message…"
                rows={5}
                className="w-full rounded-xl border border-border px-4 py-3 text-foreground text-[14px] resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-card placeholder:text-muted-foreground transition-colors"
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
            </div>
            <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-border">
              <button
                onClick={handleSend}
                disabled={!messageText.trim()}
                className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white text-[14px] font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "var(--cta-gradient)" }}
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

// ─── Wall Post Card ────────────────────────────────────────────────────────────

function WallPostCard({
  post, tribe, expanded, replyingTo, replyText,
  onToggleReplies, onReact, onStartReply, onReplyChange, onSubmitReply, onCancelReply,
}: {
  post: WallPost;
  tribe: TribeData;
  expanded: boolean;
  replyingTo: boolean;
  replyText: string;
  onToggleReplies: () => void;
  onReact: (emoji: string) => void;
  onStartReply: () => void;
  onReplyChange: (t: string) => void;
  onSubmitReply: () => void;
  onCancelReply: () => void;
}) {
  const totalReplies = post.replies.length;
  const activeReactions = post.reactions.filter((r) => r.count > 0);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: post.isSelf ? "var(--primary)" : "#999999" }}
        >
          {post.authorInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-foreground leading-tight">{post.authorName}</p>
          <p className="text-[11px] text-muted-foreground">{post.time}</p>
        </div>
      </div>

      {/* Body */}
      <p className="px-4 pb-3 text-[14px] text-foreground leading-relaxed">
        {renderWithMentions(post.text)}
      </p>

      {/* Reaction row */}
      <div className="px-3 pb-3 flex items-center gap-1 flex-wrap">
        {post.reactions.map((r) => (
          <button
            key={r.emoji}
            onClick={() => onReact(r.emoji)}
            className={`flex items-center gap-0.5 h-7 px-2 rounded-full text-[13px] transition-all border ${
              r.mine
                ? "bg-primary/12 border-primary/30"
                : "bg-muted border-transparent hover:bg-accent"
            } ${r.count === 0 ? "opacity-35" : ""}`}
          >
            <span className="leading-none">{r.emoji}</span>
            {r.count > 0 && (
              <span className={`text-[11px] font-semibold ml-0.5 ${r.mine ? "text-primary" : "text-muted-foreground"}`}>
                {r.count}
              </span>
            )}
          </button>
        ))}

        <div className="flex-1" />

        <button
          onClick={onToggleReplies}
          className="flex items-center gap-1 h-7 px-2 rounded-full text-muted-foreground hover:bg-muted transition-colors"
        >
          <MessageCircle size={13} />
          {totalReplies > 0 && <span className="text-[11px] font-medium">{totalReplies}</span>}
        </button>
        <button
          onClick={onStartReply}
          className="h-7 px-2.5 rounded-full text-[11px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Reply
        </button>
      </div>

      {/* Replies section */}
      {(expanded || replyingTo) && (
        <div className="border-t border-border bg-muted/20">
          {post.replies.map((reply) => (
            <div key={reply.id} className="flex gap-2.5 px-4 py-3 border-b border-border/50 last:border-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5"
                style={{ backgroundColor: reply.isSelf ? "var(--primary)" : "#b8bcb8" }}
              >
                {reply.authorInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-card rounded-xl px-3 py-2 border border-border/60">
                  <p className="text-[12px] font-semibold text-foreground mb-0.5">{reply.authorName}</p>
                  <p className="text-[13px] text-foreground leading-snug">
                    {renderWithMentions(reply.text)}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 ml-2">{reply.time}</p>
              </div>
            </div>
          ))}

          {replyingTo && (
            <div className="flex gap-2.5 px-4 py-3 items-start">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5">
                AG
              </div>
              <div className="flex-1 min-w-0">
                <textarea
                  autoFocus
                  value={replyText}
                  onChange={(e) => onReplyChange(e.target.value)}
                  placeholder={`Reply to ${post.authorName.split(" ")[0]}…`}
                  rows={2}
                  className="w-full rounded-xl border border-border px-3 py-2 text-foreground text-[13px] resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-card placeholder:text-muted-foreground transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && replyText.trim()) {
                      e.preventDefault();
                      onSubmitReply();
                    }
                  }}
                />
                <div className="flex gap-1.5 mt-1.5">
                  <button
                    onClick={onCancelReply}
                    className="h-7 px-3 rounded-full text-[11px] font-semibold text-muted-foreground border border-border hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSubmitReply}
                    disabled={!replyText.trim()}
                    className="h-7 px-3 rounded-full text-[11px] font-semibold text-white disabled:opacity-40 transition-all"
                    style={{ background: "var(--cta-gradient)" }}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Wall Tab ─────────────────────────────────────────────────────────────────

function WallTab({ tribe }: { tribe: TribeData }) {
  const [posts, setPosts] = useState<WallPost[]>(tribe.wallPosts);
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  function handlePost() {
    if (!text.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now(),
        authorName: "Me",
        authorInitials: "AG",
        text: text.trim(),
        time: "Just now",
        isSelf: true,
        reactions: makeReactions(),
        replies: [],
      },
      ...prev,
    ]);
    setText("");
    setShowEmojis(false);
  }

  function toggleReaction(postId: number, emoji: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          reactions: p.reactions.map((r) => {
            if (r.emoji === emoji) {
              // Same reaction tapped → deselect
              if (r.mine) return { ...r, count: r.count - 1, mine: false };
              // New reaction tapped → select
              return { ...r, count: r.count + 1, mine: true };
            }
            // Strip any previously selected reaction
            if (r.mine) return { ...r, count: r.count - 1, mine: false };
            return r;
          }),
        };
      })
    );
  }

  function toggleReplies(postId: number) {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  }

  function submitReply(postId: number) {
    if (!replyText.trim()) return;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [
            ...p.replies,
            { id: Date.now(), authorName: "Me", authorInitials: "AG", text: replyText.trim(), time: "Just now", isSelf: true },
          ],
        };
      })
    );
    setReplyText("");
    setReplyingTo(null);
  }

  function insertEmoji(emoji: string) {
    setText((prev) => prev + emoji);
    setShowEmojis(false);
    textRef.current?.focus();
  }

  function insertMention(memberName: string) {
    const handle = "@" + memberName.replace(/\s+/g, "_");
    setText((prev) => {
      const atIdx = prev.lastIndexOf("@");
      return atIdx >= 0 ? prev.slice(0, atIdx) + handle + " " : prev + handle + " ";
    });
    setShowMentions(false);
    textRef.current?.focus();
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setText(val);
    const endsWithAt = val.endsWith("@") || /.*@\w*$/.test(val);
    setShowMentions(endsWithAt);
    if (showEmojis) setShowEmojis(false);
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Post feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {posts.map((post) => (
          <WallPostCard
            key={post.id}
            post={post}
            tribe={tribe}
            expanded={expandedReplies.has(post.id)}
            replyingTo={replyingTo === post.id}
            replyText={replyingTo === post.id ? replyText : ""}
            onToggleReplies={() => toggleReplies(post.id)}
            onReact={(emoji) => toggleReaction(post.id, emoji)}
            onStartReply={() => {
              setReplyingTo(post.id);
              setExpandedReplies((prev) => new Set([...prev, post.id]));
            }}
            onReplyChange={setReplyText}
            onSubmitReply={() => submitReply(post.id)}
            onCancelReply={() => { setReplyingTo(null); setReplyText(""); }}
          />
        ))}
      </div>

      {/* Compose bar */}
      <div className="flex-shrink-0 border-t border-border px-4 pt-3 pb-4 bg-card relative">
        {/* Emoji picker */}
        {showEmojis && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border rounded-2xl p-3 shadow-lg z-10">
            <div className="grid grid-cols-8 gap-1">
              {COMMON_EMOJIS.map((e) => (
                <button
                  key={e}
                  onClick={() => insertEmoji(e)}
                  className="w-8 h-8 flex items-center justify-center text-[18px] hover:bg-muted rounded-lg transition-colors"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mention autocomplete */}
        {showMentions && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-10">
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground px-4 pt-2.5 pb-1">
              Tribe members
            </p>
            {tribe.members.map((m) => (
              <button
                key={m.id}
                onClick={() => insertMention(m.name)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-foreground font-medium">{m.name}</span>
                  <span className="text-[11px] text-muted-foreground ml-1.5">@{m.name.replace(/\s+/g, "_")}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2.5">
          {/* Self avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-1"
            style={{ backgroundColor: "var(--primary)" }}
          >
            AG
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <textarea
              ref={textRef}
              value={text}
              onChange={handleTextChange}
              placeholder="Share something with the tribe…"
              rows={text ? 3 : 1}
              className="w-full rounded-xl border border-border px-3 py-2 text-foreground text-[14px] resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background placeholder:text-muted-foreground transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && text.trim()) {
                  e.preventDefault();
                  handlePost();
                }
              }}
            />

            {/* Toolbar */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setShowEmojis(!showEmojis); setShowMentions(false); }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[16px] transition-colors ${showEmojis ? "bg-primary/10" : "hover:bg-muted"}`}
                aria-label="Add emoji"
              >
                😊
              </button>
              <button
                onClick={() => {
                  setText((prev) => prev + "@");
                  setShowMentions(true);
                  setShowEmojis(false);
                  textRef.current?.focus();
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Tag member"
              >
                @
              </button>
              <div className="flex-1" />
              <button
                onClick={handlePost}
                disabled={!text.trim()}
                className="h-8 px-3 rounded-lg flex items-center justify-center gap-1.5 text-white text-[13px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                style={{ background: "var(--cta-gradient)" }}
              >
                <Send size={13} />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Turns Tab ────────────────────────────────────────────────────────────────

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
      <div className="px-6 pt-4 pb-3 border-b border-border">
        <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide block mb-1.5">Round</label>
        <div className="relative">
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
            className="w-full h-11 border border-border rounded-lg px-3 pr-8 text-foreground text-[14px] font-medium appearance-none bg-input-background outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          >
            {Array.from({ length: tribe.tribeSize }, (_, i) => i + 1).map((r) => (
              <option key={r} value={r}>Round {r}{r === currentRound ? "  (Current)" : ""}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {tribe.members.map((m) => {
          const isRecipient = m.turnNumber === selectedRound;
          return (
            <button
              key={m.id}
              onClick={() => onMemberClick(m)}
              className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-colors ${
                isRecipient ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/40"
              }`}
            >
              <TurnBadge member={m} highlighted={isRecipient} />
              <div className="flex-1 text-left min-w-0">
                <p className={`text-[15px] truncate ${isRecipient ? "font-semibold text-foreground" : "text-foreground"}`}>{m.name}</p>
                {isRecipient && <p className="text-[11px] text-primary font-medium">Recipient this round</p>}
              </div>
              <PaymentBadge status={paymentStatus(m.turnNumber)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Info Tab ─────────────────────────────────────────────────────────────────

function MemberStatusBadge({ status }: { status: TribeMember["status"] }) {
  if (status === "paid")     return <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">Paid</span>;
  if (status === "active")   return <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "var(--cta-gradient)" }}>Active</span>;
  if (status === "declined") return <span className="text-[10px] font-semibold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full flex-shrink-0">Declined</span>;
  return <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0 capitalize">{status}</span>;
}

function InfoTab({ tribe }: { tribe: TribeData }) {
  const fmt = (v: number) => v.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const currentUser = tribe.members.find(m => m.id === tribe.currentUserMemberId);
  const adminInitials = tribe.adminName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

      {/* Financial summary */}
      <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Contribution</p>
            <p className="text-foreground font-bold text-[20px] tabular-nums">R {fmt(tribe.payment)}</p>
            <p className="text-muted-foreground text-[11px]">{tribe.paymentPeriod.toLowerCase()} · per member</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Total saved</p>
            <p
              className="font-extrabold text-[24px] tabular-nums leading-tight"
              style={{ background: "var(--cta-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              R {fmt(tribe.goal)}
            </p>
            <p className="text-muted-foreground text-[11px]">per participant</p>
          </div>
        </div>
      </div>

      {/* Your turn */}
      {currentUser && (
        <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[16px] flex-shrink-0"
            style={{ background: "var(--cta-gradient)" }}
          >
            {currentUser.turnNumber}
          </div>
          <div>
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Your turn</p>
            <p className="text-foreground font-bold text-[16px]">{tribe.yourTurn}</p>
          </div>
        </div>
      )}

      {/* Participants + progress */}
      <div className="p-4 bg-muted/40 rounded-2xl">
        <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-1">Participants</p>
        <p className="text-foreground font-bold text-[16px] mb-2">{tribe.tribeSize} members · {tribe.tribeSize} rounds</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(tribe.paidOut / tribe.tribeSize) * 100}%`, background: "var(--cta-gradient)" }}
            />
          </div>
          <span className="text-muted-foreground text-[11px] flex-shrink-0">{tribe.paidOut}/{tribe.tribeSize} done</span>
        </div>
      </div>

      {/* Schedule */}
      <div className="p-4 bg-muted/40 rounded-2xl">
        <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-1">Schedule</p>
        <p className="text-foreground font-bold text-[16px] mb-3">{tribe.paymentPeriod} payments</p>
        <div className="flex gap-4 items-center">
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Starts</p>
            <p className="text-foreground text-[13px] font-semibold">{tribe.periodFrom}</p>
          </div>
          <div className="w-8 h-[2px] bg-border rounded-full" />
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide">Ends</p>
            <p className="text-foreground text-[13px] font-semibold">{tribe.periodTo}</p>
          </div>
        </div>
      </div>

      {/* Admin */}
      <div className="p-4 bg-muted/40 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground text-[13px] font-bold flex-shrink-0">
          {adminInitials}
        </div>
        <div>
          <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Admin</p>
          <p className="text-foreground font-bold text-[15px]">{tribe.adminName}</p>
        </div>
      </div>

      {/* Members */}
      <div className="p-4 bg-muted/40 rounded-2xl">
        <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-3">
          Members ({tribe.members.length})
        </p>
        <div className="space-y-3">
          {tribe.members.map((m) => (
            <div key={m.id} className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] text-white font-bold flex-shrink-0"
                style={{ background: "var(--cta-gradient)" }}
              >
                {m.turnNumber}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-[13px] font-semibold truncate">{m.name}</p>
                <p className="text-muted-foreground text-[11px] truncate">{m.email}</p>
              </div>
              <MemberStatusBadge status={m.status} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type Tab = "turns" | "wall" | "info";

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
    { key: "turns", label: "Turns" },
    { key: "wall",  label: "Wall"  },
    { key: "info",  label: "Info"  },
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
            style={{ background: "linear-gradient(180deg, #0d2700 28%, #b9ec9c 140%)", opacity: 0.92 }}
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
          <div className="relative z-10 flex items-center justify-around px-8 mt-6">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="flex flex-col items-center gap-1 pb-1"
              >
                <span className={`text-[13px] font-semibold ${activeTab === t.key ? "text-white" : "text-white/55"}`}>
                  {t.label}
                </span>
                {activeTab === t.key && (
                  <div className="h-[2px] w-full rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Tribe name */}
          <div className="relative z-10 px-8 mt-4">
            <p className="text-white/60 text-[12px]">Tribe name</p>
            <p className="text-white text-[16px] font-semibold">{tribe.name}</p>
          </div>

          {/* Progress ring */}
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
                      stroke={index < tribe.paidOut ? "var(--color-primary)" : "rgba(255,255,255,0.2)"}
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
          {activeTab === "turns" && <TurnsTab tribe={tribe} onMemberClick={setSelectedMember} />}
          {activeTab === "wall"  && <WallTab  tribe={tribe} />}
          {activeTab === "info"  && <InfoTab  tribe={tribe} />}
        </div>

        {/* ── Member modal ── */}
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
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lg"
            style={{ background: "var(--cta-gradient)" }}
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
