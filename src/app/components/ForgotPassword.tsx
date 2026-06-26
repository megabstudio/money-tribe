import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../../lib/auth'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleReset = async () => {
    if (!email) { setError('Please enter your email address.'); return }
    setError(null)
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) { setError(error); return }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="bg-background min-h-screen w-full max-w-[390px] mx-auto flex flex-col items-center justify-center px-8 gap-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-foreground text-xl text-center">Reset link sent</p>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Check <strong className="text-foreground">{email}</strong> for a password reset link.
        </p>
        <button
          onClick={() => navigate('/')}
          className="h-14 w-full rounded-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          style={{ background: 'var(--cta-gradient)' }}
        >
          <span className="font-bold text-sm text-white">Back to Login</span>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen w-full max-w-[390px] mx-auto flex flex-col px-8 pt-16 pb-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <button onClick={() => navigate('/')} className="text-foreground hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-foreground text-base">Forgot Password</span>
      </div>

      {/* Title */}
      <h1 className="font-bold text-foreground text-2xl leading-tight mb-8">
        Reset your password
      </h1>

      {/* Email */}
      <div>
        <label htmlFor="reset-email" className="text-foreground text-sm font-medium block mb-1.5">Email</label>
        <input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email here"
          className="bg-input-background border border-border h-11 w-full rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
        />
      </div>

      {error && <p className="text-destructive text-xs mt-2">{error}</p>}

      <div className="flex-1 min-h-[48px]" />

      {/* Reset CTA */}
      <button
        onClick={handleReset}
        disabled={loading}
        className="h-14 w-full rounded-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60"
        style={{ background: 'var(--cta-gradient)' }}
      >
        <span className="font-bold text-sm text-white">
          {loading ? 'Sending…' : 'Reset password'}
        </span>
      </button>
    </div>
  )
}
