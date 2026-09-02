import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSeo } from '@/hooks/useSeo';
import { Fingerprint, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export function LoginPage({ navigate }: { navigate: (to: string) => void }) {
  useSeo({
    title: 'Sign in — Chirograph Verify',
    description: 'Sign in to your Chirograph Verify dashboard.',
    path: '/login',
  });

  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    navigate('/dashboard');
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email.trim());
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setResetSent(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      {/* Top bar */}
      <header className="flex h-16 items-center justify-between px-5 lg:px-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
            <Fingerprint className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink-900">
            Chirograph<span className="text-primary-600"> Verify</span>
          </span>
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Create account
        </button>
      </header>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-ink-200 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
              {resetMode ? 'Reset password' : 'Sign in'}
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              {resetMode
                ? 'Enter your email and we will send you a password reset link.'
                : 'Sign in to your Chirograph Verify dashboard.'}
            </p>

            {resetSent ? (
              <div className="mt-6 rounded-xl border border-success-500/20 bg-success-500/5 p-4">
                <p className="text-sm text-ink-700">
                  If an account exists for <strong>{email}</strong>, a password reset link has been sent.
                </p>
                <button
                  onClick={() => { setResetMode(false); setResetSent(false); }}
                  className="mt-3 text-sm font-medium text-primary-600 hover:underline"
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={resetMode ? handleReset : handleSubmit} className="mt-6 space-y-4">
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  icon={<Mail className="h-4 w-4" />}
                  autoComplete="email"
                  required
                />

                {!resetMode && (
                  <Field
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Your password"
                    icon={<Lock className="h-4 w-4" />}
                    autoComplete="current-password"
                    required
                  />
                )}

                {error && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-error-200 bg-error-500/5 p-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" />
                    <p className="text-sm text-error-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-glow active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {resetMode ? 'Sending...' : 'Signing in...'}
                    </>
                  ) : (
                    <>
                      {resetMode ? 'Send reset link' : 'Sign in'}
                      {!resetMode && <ArrowRight className="h-4 w-4" />}
                    </>
                  )}
                </button>

                {!resetMode && (
                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setResetMode(true)}
                      className="text-ink-500 hover:text-ink-700"
                    >
                      Forgot password?
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/signup')}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Create account
                    </button>
                  </div>
                )}

                {resetMode && (
                  <button
                    type="button"
                    onClick={() => setResetMode(false)}
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Back to sign in
                  </button>
                )}
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            By signing in, you agree to our{' '}
            <button onClick={() => navigate('/terms')} className="text-ink-500 hover:underline">Terms</button>{' '}
            and{' '}
            <button onClick={() => navigate('/privacy')} className="text-ink-500 hover:underline">Privacy Policy</button>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`w-full rounded-xl border border-ink-200 bg-ink-50 py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4 text-sm text-ink-800 placeholder:text-ink-400 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400`}
        />
      </div>
    </div>
  );
}
