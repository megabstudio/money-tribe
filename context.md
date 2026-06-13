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
