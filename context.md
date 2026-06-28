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

---

## Session — 2026-06-28

### 60-30-10 Color Principle — full app audit & implementation
`src/app/components/Dashboard.tsx`, `YourTribes.tsx`, `FindTribe.tsx`, `HamburgerMenu.tsx`, `TribeDetail.tsx`, `CreateTribe.tsx`, `Messages.tsx`

Green (`--primary`) is now strictly the 10% accent — visible only on CTAs, active nav indicators, and key status signals. Everything else uses neutrals.

**Pattern applied everywhere:**

| Was | Now |
|---|---|
| `bg-primary/5`, `bg-primary/10`, `bg-primary/20` (container bg) | `bg-muted/40` or `bg-muted` |
| `border-primary/20` (container border) | `border-border` |
| `text-primary` on links / labels / countdown text | `text-muted-foreground` or `text-foreground` |
| Gradient text on financial totals | `text-foreground font-extrabold` |
| `cta-gradient` on non-CTA badges (Rnd X/Y, Starting soon) | `bg-muted text-foreground` or `text-muted-foreground bg-muted` |

**Green intentionally kept (the 10%):**
- All CTA buttons (`var(--cta-gradient)`)
- Bottom nav active icon + label + top indicator dot
- Active tab underline in TribeDetail hero
- `Paid`, `Active`, `Receiving` status badges
- Progress bar fills (round bars, slot fill bars)
- `@mention` highlight text in Wall posts
- Self message avatar in Wall tab
- Own reaction selection highlight
- Input focus rings (`focus:border-primary`)
- Payout amount in CongratsModal
- "Recipient this round" label text
- FindTribe: "X left" availability badge (urgency signal on browse screen)
- TribeDetail: drop-target highlight in CreateTribe slot assignment

**File-specific changes:**
- **Dashboard:** Emoji container → `bg-muted`; "Rnd X/Y" pill → neutral; "Starting soon" badge → neutral; "View →" / "Invite →" / "See all →" → `text-muted-foreground`; "Next Cash" date removed gradient text; "In 20 days" → muted; progress bar fills → `var(--color-foreground)` (was hardcoded `#1a4500`, invisible in dark mode)
- **YourTribes / FindTribe:** Same tribe-card pattern as Dashboard; slot-fill bar in FindTribe (`cta-gradient`) → `var(--color-foreground)`; selected slot card → `border-border bg-muted/40`
- **HamburgerMenu:** User profile card `border-primary/20 bg-primary/5` → `border-border bg-muted/40`; active row `bg-primary/8` → `bg-muted`; active label `text-primary` → `text-foreground font-semibold`; chevron → `text-muted-foreground`; active icon container keeps `cta-gradient` (sole green signal)
- **Messages:** Filter chip active state → `bg-foreground text-background` (strong selection, no green); tribe name label `text-primary` → `text-muted-foreground`; unread dot kept `bg-primary`
- **TribeDetail:** MemberModal "Turn X" pills → neutral; RefreshCw icon container → `bg-muted`; swap-view turn circles → `bg-muted/80 text-foreground`; mention avatar → `bg-muted text-foreground`; emoji button active → `bg-muted`; recipient row → `bg-muted/60 border-border`; CongratsModal recipient card → `bg-muted/50 border-border`; InfoTab financial card + "Your turn" card → `border-border bg-muted/40`; "Total saved" removed gradient text
- **CreateTribe:** Stepper "done" circles → `bg-foreground text-background` (neutral dark circle); connector line → `var(--color-foreground)` at 50% opacity; calendar icon → `text-muted-foreground`; open-tribe info card → `border-border bg-muted/40`; check bullets → `bg-muted text-foreground`; financial summary card → neutral; member number circles → `bg-muted text-foreground`; check icon → `text-muted-foreground`; filled-slot row border → `border-border bg-muted/40`

---

### Login screen redesign — phone-frame layout
`src/app/components/Login.tsx`

**Do not modify this file.** The redesign was completed and locked.

Structure:
- Outer: `min-h-screen bg-background flex items-start justify-center md:items-center md:py-8`
- Phone frame: `max-w-[390px] overflow-hidden md:rounded-[44px] md:shadow-2xl` with `height: 100svh`
- **Hero (252px):** deep green gradient `#091900 → #1c3d00 → #0c2300`, dot-grid radial texture, radial glow behind logo, logo in translucent rounded square, "Money Tribe" in `var(--font-display)`, tagline
- **Form card:** `rounded-t-[28px] -mt-5` bottom-sheet overlap, drag handle bar, "Welcome back" heading, uppercase `tracking-widest` labels, `h-12 rounded-xl` inputs, Enter key support (`onKey` handler), error box, CTA gradient button, "Forgot password?" link, register link

---

### MobileStatusBar shared component
`src/app/components/MobileStatusBar.tsx` (new file)

Extracted the phone status bar (time · signal bars · WiFi icon · battery) into a single shared component so all screens display it consistently.

```tsx
<MobileStatusBar />           // default: text-foreground/70 (light/dark adaptive)
<MobileStatusBar light />     // white text, for use on dark hero backgrounds
```

**Added to every main screen:**

| Screen | Placement | Notes |
|---|---|---|
| Dashboard | `flex-shrink-0` before scroll container | replaced duplicated inline JSX |
| Messages | `flex-shrink-0` before header | replaced duplicated inline JSX |
| YourTribes | `flex-shrink-0` before fixed header | |
| FindTribe | `flex-shrink-0` before header | removed compensating `pt-12` from header |
| CreateTribe | `flex-shrink-0` before header | removed compensating `pt-16` from header |
| TribeDetail | `absolute top-0 z-20` inside hero div | `light` prop for white text on dark hero; reduced nav row `pt-[62px]` → `pt-9`; edit-cover button `top-[66px]` → `top-11` |

---

### YourTribes — fixed header + no page scrollbar
`src/app/components/YourTribes.tsx`

Header was inside the `overflow-y-auto` container (causing it to scroll away). Fixed:
- Outer wrapper changed from `min-h-screen` to `h-screen overflow-hidden` (eliminates browser scrollbar)
- Header (`flex-shrink-0`) is now a sibling of the scroll container, not inside it
- Content in `flex-1 overflow-y-auto scrollbar-hide`

---

### Scrollbar visibility fix — globals.css was never imported
`src/styles/index.css`

`globals.css` defines the `.scrollbar-hide` utility (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`), but it was never imported anywhere — the class had no effect across the entire app.

**Fix:** added `@import './globals.css';` to `src/styles/index.css`.

This activates `scrollbar-hide` everywhere in the app at once. No per-component changes needed beyond what was already in the markup.

Also added `scrollbar-hide` to all three `overflow-y-auto` containers in FindTribe that were missing it (tribe list, tribe detail sheet body, slot picker grid).

---

### Bottom nav: Profile → Your Tribes
`src/app/components/Dashboard.tsx`, `src/app/components/Messages.tsx`

The Profile tab (User icon) was removed from the bottom nav. Your Tribes is now in its place.

**Icon chosen:** `LayoutGrid` (Lucide) — a 2×2 grid of squares that reads as "a collection of items / my groups". Visually distinct from all other nav icons (Home, MessageCircle, Compass, Plus).

**Nav layout (both screens):**
```
Home · Messages · [+ Create] · Find · Your tribes
```

**Code changes in both files:**
- `NavTab` type: `"user"` → `"tribes"`
- `NAV_ITEMS_RIGHT`: `{ id: "user", Icon: User, label: "Profile" }` → `{ id: "tribes", Icon: LayoutGrid, label: "Your tribes" }`
- `handleNavClick`: added `if (id === "tribes") navigate("/your-tribes")`
- Removed `User` import, added `LayoutGrid` import from lucide-react

Profile remains accessible exclusively through the hamburger menu (top-right of Dashboard header).

---

### Tribe card — updated field values (post 60-30-10)
The tribe card emoji container across Dashboard / YourTribes / FindTribe is now `bg-muted` (was `bg-primary/10`). The card structure note in the 2026-06-23 session entry is outdated on this point.

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
