import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../lib/auth'

export default function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleRegister = async () => {
    if (!email || !password || !repeatPassword) { setError('Please fill in all fields.'); return }
    if (password !== repeatPassword) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError(null)
    setLoading(true)
    const { error, confirmationRequired } = await signUp(email, password)
    setLoading(false)
    if (error) { setError(error); return }
    if (confirmationRequired) { setConfirmed(true); return }
    navigate('/dashboard')
  }

  if (confirmed) {
    return (
      <div className="bg-background min-h-screen w-full max-w-[390px] mx-auto flex flex-col items-center justify-center px-8 gap-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-foreground text-xl text-center">Check your email</p>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          We sent a confirmation link to{' '}
          <strong className="text-foreground">{email}</strong>.
          Click the link to activate your account.
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

  const eyeToggle = (show: boolean, toggle: () => void) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  )

  return (
    <div className="bg-background min-h-screen w-full max-w-[390px] mx-auto flex flex-col px-8 pt-16 pb-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <button onClick={() => navigate('/')} className="text-foreground hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-foreground text-base">Registration</span>
      </div>

      {/* Title */}
      <h1 className="font-bold text-foreground text-2xl leading-tight mb-8">
        Create a new account
      </h1>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="reg-email" className="text-foreground text-sm font-medium block mb-1.5">Email</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email here"
          className="bg-input-background border border-border h-11 w-full rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label htmlFor="reg-password" className="text-foreground text-sm font-medium block mb-1.5">Password</label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here"
            className="bg-input-background border border-border h-11 w-full rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          />
          {eyeToggle(showPassword, () => setShowPassword(!showPassword))}
        </div>
      </div>

      {/* Repeat password */}
      <div>
        <label htmlFor="reg-repeat" className="text-foreground text-sm font-medium block mb-1.5">Repeat password</label>
        <div className="relative">
          <input
            id="reg-repeat"
            type={showRepeat ? 'text' : 'password'}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat your password"
            className="bg-input-background border border-border h-11 w-full rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          />
          {eyeToggle(showRepeat, () => setShowRepeat(!showRepeat))}
        </div>
      </div>

      {error && <p className="text-destructive text-xs mt-2">{error}</p>}

      <div className="flex-1 min-h-[48px]" />

      {/* Register CTA */}
      <button
        onClick={handleRegister}
        disabled={loading}
        className="h-14 w-full rounded-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 mb-5"
        style={{ background: 'var(--cta-gradient)' }}
      >
        <span className="font-bold text-sm text-white">
          {loading ? 'Creating account…' : 'Register'}
        </span>
      </button>

      <p className="text-foreground text-sm text-center">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/')}
          className="text-primary font-semibold hover:underline underline-offset-2 transition-colors"
        >
          Login
        </button>
      </p>
    </div>
  )
}
