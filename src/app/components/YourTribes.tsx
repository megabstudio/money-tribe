import { useNavigate } from 'react-router'
import { ArrowLeft, Calendar, Users } from 'lucide-react'

interface Tribe {
  id: number
  name: string
  saved: number
  goal: number
  cashDate: string
  endDate: string
  currentRound: number
  totalRounds: number
  accentColor: string
}

const MY_TRIBES: Tribe[] = [
  { id: 1, name: "Vacation Fund",   saved: 4200,  goal: 6000,  cashDate: "Jun 15, 2025", endDate: "Dec 31, 2025", currentRound: 4, totalRounds: 6,  accentColor: "#38B000" },
  { id: 2, name: "Emergency Stash", saved: 2800,  goal: 5000,  cashDate: "Jul 1, 2025",  endDate: "Jan 15, 2026", currentRound: 3, totalRounds: 5,  accentColor: "#2E7D32" },
  { id: 3, name: "New Car Fund",    saved: 12000, goal: 20000, cashDate: "Dec 31, 2025", endDate: "Jun 30, 2026", currentRound: 6, totalRounds: 10, accentColor: "#1B5E20" },
  { id: 4, name: "Home Deposit",    saved: 8000,  goal: 15000, cashDate: "Mar 1, 2026",  endDate: "Sep 1, 2026",  currentRound: 5, totalRounds: 8,  accentColor: "#38B000" },
  { id: 5, name: "Tech Upgrade",    saved: 3500,  goal: 5000,  cashDate: "Aug 15, 2025", endDate: "Nov 30, 2025", currentRound: 4, totalRounds: 5,  accentColor: "#2E7D32" },
]

function TribeCard({ tribe, onClick }: { tribe: Tribe; onClick: () => void }) {
  const pct = Math.round((tribe.saved / tribe.goal) * 100)

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:bg-muted/30 active:scale-[0.98] transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-foreground text-[15px]">{tribe.name}</h3>

        {/* Rounds circle */}
        <div className="w-9 h-9 flex-shrink-0 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {Array.from({ length: tribe.totalRounds }).map((_, i) => {
              const circ = 2 * Math.PI * 16
              const dashLen = 6
              const gapLen = circ / tribe.totalRounds - dashLen
              return (
                <circle
                  key={i}
                  cx="18" cy="18" r="16"
                  fill="none"
                  stroke={i < tribe.currentRound ? tribe.accentColor : 'currentColor'}
                  strokeOpacity={i < tribe.currentRound ? 1 : 0.15}
                  strokeWidth="3.5"
                  strokeDasharray={`${dashLen} ${gapLen}`}
                  strokeDashoffset={-i * (dashLen + gapLen)}
                  pathLength={circ}
                  strokeLinecap="round"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] font-medium text-foreground">
              {tribe.currentRound}/{tribe.totalRounds}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold" style={{ color: tribe.accentColor }}>{pct}%</span>
          <span className="text-[9px] text-muted-foreground">Current round</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: tribe.accentColor }} />
        </div>
      </div>

      {/* Dates */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-muted-foreground flex-shrink-0" />
          <span className="text-[11px] text-muted-foreground">
            Cash out: <span className="text-foreground font-semibold">{tribe.cashDate}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-muted-foreground flex-shrink-0" />
          <span className="text-[11px] text-muted-foreground">
            End date: <span className="text-foreground font-semibold">{tribe.endDate}</span>
          </span>
        </div>
      </div>
    </div>
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
          <div className="px-4 py-4">
            <input
              type="text"
              placeholder="Search tribe name"
              className="w-full bg-input-background border border-border rounded-lg h-11 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
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
                style={{ background: 'linear-gradient(140deg, #3DBF00 0%, #34A300 100%)' }}
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
