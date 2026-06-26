import { useNavigate } from 'react-router'
import { ArrowLeft, Calendar, Search, ChevronRight } from 'lucide-react'

interface Tribe {
  id: number
  name: string
  emoji: string
  cashDate: string
  endDate: string
  currentRound: number
  totalRounds: number
  isCreator?: boolean
  status?: "open" | "starting_soon" | "active" | "closed"
  filledSlots?: number
  totalSlots?: number
  startDate?: string
}

const MY_TRIBES: Tribe[] = [
  { id: 1, name: "Vacation Fund",   emoji: "✈️", cashDate: "Jun 15, 2025", endDate: "Dec 31, 2025", currentRound: 4, totalRounds: 6  },
  { id: 2, name: "Emergency Stash", emoji: "🛡️", cashDate: "Jul 1, 2025",  endDate: "Jan 15, 2026", currentRound: 3, totalRounds: 5  },
  { id: 3, name: "New Car Fund",    emoji: "🚗", cashDate: "Dec 31, 2025", endDate: "Jun 30, 2026", currentRound: 0, totalRounds: 10, isCreator: true, status: "starting_soon", filledSlots: 10, totalSlots: 10, startDate: "Jul 1, 2025" },
  { id: 4, name: "Home Deposit",    emoji: "🏠", cashDate: "Mar 1, 2026",  endDate: "Sep 1, 2026",  currentRound: 5, totalRounds: 8  },
  { id: 5, name: "Tech Upgrade",    emoji: "💻", cashDate: "Aug 15, 2025", endDate: "Nov 30, 2025", currentRound: 4, totalRounds: 5  },
]

function TribeCard({ tribe, onClick }: { tribe: Tribe; onClick: () => void }) {
  const isOpen         = tribe.isCreator && tribe.status === "open"
  const isStartingSoon = tribe.isCreator && tribe.status === "starting_soon"
  const emptySlots     = isOpen ? (tribe.totalSlots ?? 0) - (tribe.filledSlots ?? 0) : 0

  const cardStyle = isOpen
    ? { boxShadow: "0 6px 28px rgba(34, 197, 94, 0.22)" }
    : {}

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
      style={cardStyle}
    >
      <div className="h-[3px]" style={{ background: "var(--cta-gradient)" }} />

      <div className="p-4">
        {/* Name row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] flex-shrink-0 bg-primary/10">
              {tribe.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-foreground font-bold text-[15px] leading-tight truncate">{tribe.name}</p>
              <p className="text-muted-foreground text-[11px]">
                {(isOpen || isStartingSoon) ? `${tribe.filledSlots} of ${tribe.totalSlots} members` : `${tribe.totalRounds} rounds total`}
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
            <span
              className="flex-shrink-0 px-2.5 py-1 rounded-full text-white text-[11px] font-bold"
              style={{ background: "var(--cta-gradient)" }}
            >
              Rnd {tribe.currentRound}/{tribe.totalRounds}
            </span>
          )}
        </div>

        {/* ── OPEN variant ── */}
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
              <div className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 text-[12px] font-semibold">
                Invite <ChevronRight size={13} />
              </div>
            </div>
          </>
        )}

        {/* ── STARTING SOON variant — mirrors FindTribe card ── */}
        {isStartingSoon && (
          <>
            <div className="flex items-center flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 bg-muted rounded-md text-foreground text-[12px] font-semibold">
                {tribe.totalSlots} members
              </span>
              <span className="px-2 py-0.5 rounded-md text-[12px] font-semibold text-primary bg-primary/10">
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
                      ? { background: "var(--cta-gradient)" }
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
              <div className="flex items-center gap-0.5 text-primary text-[12px] font-semibold">
                View <ChevronRight size={13} />
              </div>
            </div>
          </>
        )}

        {/* ── ACTIVE variant ── */}
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
                      ? { background: "var(--cta-gradient)" }
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
              <div className="flex items-center gap-0.5 text-primary text-[12px] font-semibold">
                View <ChevronRight size={13} />
              </div>
            </div>
          </>
        )}
      </div>
    </button>
  )
}

export default function YourTribes() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: '100svh', maxHeight: '100svh', height: '100svh' }}
      >
        <div className="overflow-y-auto scrollbar-hide flex-1">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-background border-b border-border">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="font-bold text-foreground text-base">Your tribes</h1>
          </div>

          {/* Search */}
          <div className="px-4 py-4 relative">
            <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search tribe name"
              className="w-full bg-input-background border border-border rounded-lg h-11 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            />
          </div>

          {/* List or empty state */}
          {MY_TRIBES.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-8 gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Users size={28} className="text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground text-base text-center">No tribes yet</p>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Join or create a tribe to start saving together.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="h-12 px-6 rounded-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-150"
                style={{ background: 'var(--cta-gradient)' }}
              >
                <span className="font-semibold text-sm text-white">Find a tribe</span>
              </button>
            </div>
          ) : (
            <div className="px-4 pb-6 space-y-3">
              {MY_TRIBES.map((tribe) => (
                <TribeCard key={tribe.id} tribe={tribe} onClick={() => navigate(`/tribes/${tribe.id}`)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
