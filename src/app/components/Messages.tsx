import { useState } from "react";
import { useNavigate } from "react-router";
import { Compass, Home, MessageCircle, User, Plus, Search, MessageSquare } from "lucide-react";

type DateFilter = "all" | "today" | "week" | "month";
type NavTab = "home" | "messages" | "find" | "user";

interface TribeMessage {
  id: number;
  senderName: string;
  senderInitials: string;
  tribeName: string;
  preview: string;
  timestamp: string;
  date: Date;
  unread: boolean;
  accentColor: string;
}

const TODAY = new Date("2026-06-18");

const MESSAGES: TribeMessage[] = [
  {
    id: 1,
    senderName: "Amara Johnson",
    senderInitials: "AJ",
    tribeName: "Vacation Fund",
    preview: "Just made my contribution for this month! Are we still on track for June?",
    timestamp: "2m ago",
    date: new Date("2026-06-18"),
    unread: true,
    accentColor: "#3dbf00",
  },
  {
    id: 2,
    senderName: "Bongani Khumalo",
    senderInitials: "BK",
    tribeName: "Vacation Fund",
    preview: "Confirmed! R700 sent. See you all at the payout date 🙌",
    timestamp: "1h ago",
    date: new Date("2026-06-18"),
    unread: true,
    accentColor: "#3dbf00",
  },
  {
    id: 3,
    senderName: "Chiamaka Obi",
    senderInitials: "CO",
    tribeName: "Emergency Stash",
    preview: "Reminder: contribution due in 3 days. Let's keep the streak going!",
    timestamp: "Yesterday",
    date: new Date("2026-06-17"),
    unread: false,
    accentColor: "#2a8a00",
  },
  {
    id: 4,
    senderName: "Dumisani Tlou",
    senderInitials: "DT",
    tribeName: "New Car Fund",
    preview: "Round 6 payout confirmed for Dec 31. Who's getting paid out next?",
    timestamp: "2d ago",
    date: new Date("2026-06-16"),
    unread: false,
    accentColor: "#10451d",
  },
  {
    id: 5,
    senderName: "Esther Nkosi",
    senderInitials: "EN",
    tribeName: "Emergency Stash",
    preview: "I've added R500 to the stash. We're at 56% of our goal now!",
    timestamp: "Jun 14",
    date: new Date("2026-06-14"),
    unread: false,
    accentColor: "#2a8a00",
  },
  {
    id: 6,
    senderName: "Funmilayo Adeyemi",
    senderInitials: "FA",
    tribeName: "New Car Fund",
    preview: "Welcome to the tribe everyone! Let's hit that R20k goal together.",
    timestamp: "Jun 10",
    date: new Date("2026-06-10"),
    unread: false,
    accentColor: "#10451d",
  },
  {
    id: 7,
    senderName: "Gift Mokoena",
    senderInitials: "GM",
    tribeName: "Vacation Fund",
    preview: "Anyone know the exact payout date? The app shows Jun 15 right?",
    timestamp: "Jun 5",
    date: new Date("2026-06-05"),
    unread: false,
    accentColor: "#3dbf00",
  },
];

const FILTERS: { id: DateFilter; label: string }[] = [
  { id: "all",   label: "All" },
  { id: "today", label: "Today" },
  { id: "week",  label: "This Week" },
  { id: "month", label: "This Month" },
];

function isToday(d: Date) {
  return d.toDateString() === TODAY.toDateString();
}
function isThisWeek(d: Date) {
  const weekAgo = new Date(TODAY);
  weekAgo.setDate(TODAY.getDate() - 7);
  return d >= weekAgo && d <= TODAY;
}
function isThisMonth(d: Date) {
  return d.getMonth() === TODAY.getMonth() && d.getFullYear() === TODAY.getFullYear();
}

const NAV_ITEMS_LEFT: { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "home",     Icon: Home,          label: "Home"     },
  { id: "messages", Icon: MessageCircle, label: "Messages" },
];
const NAV_ITEMS_RIGHT: { id: NavTab; Icon: typeof Home; label: string }[] = [
  { id: "find", Icon: Compass, label: "Find"    },
  { id: "user", Icon: User,    label: "Profile" },
];

export default function Messages() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<DateFilter>("all");

  const handleNavClick = (id: NavTab) => {
    if (id === "home") navigate("/dashboard");
    if (id === "find") navigate("/find-tribe");
  };

  const filtered = MESSAGES.filter((msg) => {
    if (activeFilter === "today") return isToday(msg.date);
    if (activeFilter === "week")  return isThisWeek(msg.date);
    if (activeFilter === "month") return isThisMonth(msg.date);
    return true;
  });

  const unreadCount = MESSAGES.filter((m) => m.unread).length;

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: "100svh", maxHeight: "100svh", height: "100svh" }}
      >
        {/* Status bar */}
        <div className="flex-shrink-0 flex justify-between items-center px-7 pt-4 pb-1">
          <span className="text-[12px] font-semibold text-foreground/70">9:41</span>
          <div className="flex items-center gap-2 text-foreground/70">
            <div className="flex items-end gap-[2px]">
              {[1, 2, 3, 4].map((h) => (
                <div key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: `${h * 3}px` }} />
              ))}
            </div>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M7.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              <path d="M3.5 5.2a5.7 5.7 0 0 1 8 0l1.1-1.1a7.3 7.3 0 0 0-10.2 0l1.1 1.1z" />
              <path d="M5.7 7.4a2.8 2.8 0 0 1 3.6 0l1.1-1.1a4.3 4.3 0 0 0-5.8 0l1.1 1.1z" />
              <path d="M1.4 2.9a9.3 9.3 0 0 1 12.2 0l1-1A10.8 10.8 0 0 0 .4 1.9l1 1z" />
            </svg>
            <div className="relative w-[22px] h-[11px] rounded-[3px] border border-current/60">
              <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[13px] bg-current rounded-[1px]" />
              <div className="absolute right-[-3px] top-[3px] bottom-[3px] w-[2px] bg-current/60 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 pt-3 pb-2">
          <div>
            <h1 className="text-[20px] font-bold text-foreground leading-tight">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-[12px] text-muted-foreground mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          <button
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
            aria-label="Search messages"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Date filter chips */}
        <div className="flex-shrink-0 flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-8 text-center pb-20">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <MessageSquare size={24} className="text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground text-[15px]">No messages</p>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                No tribe messages for this period yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((msg) => (
                <button
                  key={msg.id}
                  className="w-full flex items-start gap-3 px-5 py-4 hover:bg-muted/50 active:bg-muted transition-colors text-left"
                >
                  {/* Avatar */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px] font-bold"
                    style={{ backgroundColor: msg.accentColor }}
                  >
                    {msg.senderInitials}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <p className={`text-[14px] leading-tight truncate ${msg.unread ? "font-bold text-foreground" : "font-semibold text-foreground/80"}`}>
                        {msg.senderName}
                      </p>
                      <span className="text-[11px] text-muted-foreground flex-shrink-0">{msg.timestamp}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-primary mb-1">{msg.tribeName}</p>
                    <p className={`text-[13px] leading-snug truncate ${msg.unread ? "text-foreground/90" : "text-muted-foreground"}`}>
                      {msg.preview}
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {msg.unread && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </button>
              ))}
            </div>
          )}
          <div className="h-20" />
        </div>

        {/* Bottom Nav */}
        <div className="flex-shrink-0 bg-card border-t border-border">
          <div className="flex items-center justify-around py-2 px-2">
            {NAV_ITEMS_LEFT.map(({ id, Icon, label }) => {
              const isActive = id === "messages";
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
              );
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
              const isActive = false;
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
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
