import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../lib/auth'
import svgPaths from '../../imports/Login/svg-grybny3axk'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) { setError(error); return }
    navigate('/dashboard')
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] overflow-hidden flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ minHeight: '100svh', maxHeight: '100svh', height: '100svh' }}
      >

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div
          className="relative flex-shrink-0 h-[252px] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(155deg, #091900 0%, #1c3d00 52%, #0c2300 100%)',
          }}
        >
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(61,191,0,0.16) 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Radial glow behind logo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(61,191,0,0.22) 0%, transparent 68%)',
            }}
          />

          {/* Logo + wordmark */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="w-[76px] h-[76px] rounded-[20px] flex items-center justify-center"
              style={{
                background: 'rgba(61,191,0,0.10)',
                border: '1.5px solid rgba(61,191,0,0.28)',
              }}
            >
              <svg className="w-[50px] h-[50px]" fill="none" viewBox="0 0 72 72">
                <g clipPath="url(#login-hero-clip)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p362e71f0}
                    fill="#3dbf00"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="login-hero-clip">
                    <rect fill="white" height="72" width="72" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="text-center">
              <p
                className="text-white text-[28px] font-bold tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Money Tribe
              </p>
              <p className="text-white/48 text-[12px] mt-1.5 tracking-[0.06em] uppercase font-medium">
                Save together · Win together
              </p>
            </div>
          </div>
        </div>

        {/* ── Form card ────────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex-1 bg-background rounded-t-[28px] -mt-5 flex flex-col overflow-y-auto"
          style={{ boxShadow: '0 -6px 20px rgba(0,0,0,0.09)' }}
        >
          {/* Drag-handle hint */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-border" />
          </div>

          <div className="flex flex-col flex-1 px-7 pt-5 pb-8">
            {/* Heading */}
            <h2
              className="text-foreground font-bold text-[22px] tracking-tight leading-tight mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Welcome back
            </h2>
            <p className="text-muted-foreground text-[13px] mb-7">
              Sign in to your account to continue
            </p>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="login-email"
                className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
              >
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={onKey}
                placeholder="you@example.com"
                className="bg-input-background border border-border h-12 w-full rounded-xl px-4 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="••••••••"
                  className="bg-input-background border border-border h-12 w-full rounded-xl px-4 pr-12 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive text-[12px] font-medium">{error}</p>
              </div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end mt-3">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-primary text-[13px] font-semibold hover:underline underline-offset-2 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div className="flex-1 min-h-[20px]" />

            {/* CTA */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="h-14 w-full rounded-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 mb-4"
              style={{ background: 'var(--cta-gradient)' }}
            >
              <span className="font-bold text-[15px] text-white tracking-wide">
                {loading ? 'Signing in…' : 'Log in'}
              </span>
            </button>

            {/* Register */}
            <p className="text-[13px] text-center text-foreground">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-primary font-bold hover:underline underline-offset-2 transition-colors"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
