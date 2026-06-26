# Project Context

## Temporary Change — ProtectedRoute disabled

**File:** `src/app/components/ProtectedRoute.tsx`

The auth protection was temporarily disabled so the UI can be reviewed on Vercel without a real Supabase login. The component currently just renders its children with no session check.

**Current state (temporary):**
```tsx
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

**Must be restored once Supabase is configured:**
```tsx
import { Navigate } from 'react-router'
import { useAuth } from '../../lib/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
```

---

## Session — 2026-06-23

### TribeDetail — InfoTab: member number badges
`src/app/components/TribeDetail.tsx` · `InfoTab`

Turn-order number badges changed from primary green gradient to muted gray (`bg-muted text-muted-foreground font-semibold`) so they don't compete with the status badges on the right.

---

### TribeDetail — InfoTab: Admin reassignment dropdown
`src/app/components/TribeDetail.tsx`

**Data changes:**
- Added `adminMemberId: number` to `TribeData` interface
- Both mock tribes have `adminMemberId: 5` (matches `currentUserMemberId: 5` so the admin UI is always visible in the demo)

**Behaviour:**
- `InfoTab` computes `isAdmin = tribe.currentUserMemberId === tribe.adminMemberId`
- When admin: admin card becomes a tappable button with a `ChevronDown` that reveals a scrollable member list under a "Transfer admin to" label
- Selecting a member updates local `adminId` state and closes the dropdown
- When not admin: static read-only display

---

### TribeDetail — Join request management (Requests tab)
`src/app/components/TribeDetail.tsx`

**New interface:**
```ts
interface JoinRequest {
  id: number; name: string; initials: string;
  email: string; phone: string; location: string;
  occupation: string; requestedSlot: number;
  requestedAt: string; bio: string;
}
```

**TribeData additions:**
```ts
isOpen?: boolean;
pendingRequests?: JoinRequest[];
```

**Mock data — tribe 1:**
- `isOpen: true`
- 3 pending requests: Rafael Medina (slot 9), Laura Castillo (slot 9), Marco Rivera (slot 10)
- Two people competing for slot 9 demonstrates the multi-applicant grouping

**New components:**
- `RequestsTab` — groups requests by slot, shows requester card with quick Accept / ✕ Reject buttons; tapping the row opens the profile sheet
- `RequestProfileSheet` — bottom sheet (slides up from bottom, backdrop dimming) with avatar, name, "Requesting slot X" pill, email/phone/location/occupation icon rows, bio card, full Reject / Accept member CTA pair

**Icons added to import:** `Mail, Phone, MapPin, Briefcase, Users`

**Tab bar:**
- `type Tab` extended to `"turns" | "wall" | "info" | "requests"`
- Requests tab only appears when `isAdmin && tribe.isOpen`
- Red badge on tab shows live pending count (decrements as requests are handled)

**State lifted to `TribeDetail`:**
- `pendingRequests` — source of truth for the list; updated by accept/reject
- `selectedRequest` — controls whether `RequestProfileSheet` is mounted (rendered at phone-frame level, outside all `overflow-hidden` containers, matching the `MemberModal` pattern)

**Reject button styling:** danger red — `bg-red-500/10 border border-red-500/20 text-red-500` on both the quick ✕ button and the full sheet button.

---

### Tribe card consistency across Dashboard, YourTribes, FindTribe
`src/app/components/Dashboard.tsx`, `src/app/components/YourTribes.tsx`

All three tribe list screens now share the exact same card structure as FindTribe:

| Layer | Detail |
|---|---|
| Top stripe | 3px `var(--cta-gradient)` |
| Header | `w-10 h-10 rounded-xl bg-primary/10` emoji chip · name bold · subtitle muted |
| Badge | `Rnd X/Y` pill, gradient background, top-right |
| Tags | `bg-muted rounded-md` pills — Cash date · End date |
| Bar | `flex gap-[3px]` segmented, `h-1.5 rounded-full`, gradient fill for completed rounds |
| Footer | Calendar icon + "Next cash {date}" left · "View →" primary right |

**YourTribes breaking changes:**
- Removed `saved`, `goal`, `accentColor` fields from `Tribe` interface and mock data (no longer needed)
- Added `emoji` field; updated all 5 mock entries with matching emojis
- Removed unused imports: `Flag, Users` — added `ChevronRight`
- Circular SVG round ring and savings progress bar replaced by the segmented bar

---

## Supabase setup checklist

When Supabase is ready, do these steps in order:

1. Create a Supabase project at supabase.com
2. Go to **SQL Editor** and run the migration file: `supabase/migrations/001_initial_schema.sql`
3. Go to **Project Settings → API** and copy:
   - `Project URL` → paste as `VITE_SUPABASE_URL` in Vercel env vars
   - `anon public` key → paste as `VITE_SUPABASE_ANON_KEY` in Vercel env vars
4. In Vercel, update both env vars with the real values and redeploy
5. In Supabase, go to **Authentication → URL Configuration** and set Site URL to your Vercel domain (e.g. `https://moneytribepwa.vercel.app`)
6. Restore `ProtectedRoute.tsx` to the original code above
7. Push to GitHub — Vercel will redeploy automatically
