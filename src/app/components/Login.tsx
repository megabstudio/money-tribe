import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../lib/auth'
import svgPaths from '../../imports/Login/svg-grybny3axk'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  return (
    <div className="bg-background min-h-screen w-full max-w-[390px] mx-auto flex flex-col px-8 pt-16 pb-10">

      {/* Logo */}
      <div className="flex flex-col items-center mb-12">
        <div className="size-[72px]">
          <svg className="block size-full" fill="none" viewBox="0 0 72 72">
            <g clipPath="url(#login-clip)">
              <path clipRule="evenodd" d={svgPaths.p362e71f0} fill="#38B000" fillRule="evenodd" />
            </g>
            <defs>
              <clipPath id="login-clip"><rect fill="white" height="72" width="72" /></clipPath>
            </defs>
          </svg>
        </div>
        <p className="text-foreground text-3xl font-bold text-center mt-2 tracking-tight">Money Tribe</p>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="login-email" className="text-foreground text-sm font-medium block mb-1.5">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email here"
          className="bg-input-background border border-border h-11 w-full rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="login-password" className="text-foreground text-sm font-medium block mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here"
            className="bg-input-background border border-border h-11 w-full rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && <p className="text-destructive text-xs mt-2">{error}</p>}

      <div className="flex justify-end mt-3">
        <button
          onClick={() => navigate('/forgot-password')}
          className="text-primary text-sm font-medium hover:underline underline-offset-2 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <div className="flex-1 min-h-[48px]" />

      {/* Login CTA */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="h-14 w-full rounded-xl flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 mb-5"
        style={{ background: 'linear-gradient(140deg, #3DBF00 0%, #34A300 100%)' }}
      >
        <span className="font-bold text-sm text-white">
          {loading ? 'Signing in…' : 'Login'}
        </span>
      </button>

      <p className="text-foreground text-sm text-center">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-primary font-semibold hover:underline underline-offset-2 transition-colors"
        >
          Register
        </button>
      </p>
    </div>
  )
}
