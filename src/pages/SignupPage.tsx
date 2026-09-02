import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSeo } from '@/hooks/useSeo';
import { Fingerprint, Mail, Lock, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export function SignupPage({ navigate }: { navigate: (to: string) => void }) {
  useSeo({
    title: 'Create account — Chirograph Verify',
    description: 'Create your Chirograph Verify account.',
    path: '/signup',
  });

  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error, needsConfirmation } = await signUp(email.trim(), password);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    if (needsConfirmation) {
      setNeedsConfirmation(true);
      return;
    }

    navigate('/dashboard');
  };

  if (needsConfirmation) {
    return (
      <div className="flex min-h-screen flex-col bg-ink-50">
        <header className="flex h-16 items-center px-5 lg:px-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
              <Fingerprint className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink-900">
              Chirograph<span className="text-primary-600"> Verify</span>
            </span>
          </button>
        </header>
        <div className="flex flex-1 items-center justify-center px-5 py-12">
          <div className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-8 shadow-card text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-success-500/10">
              <CheckCircle2 className="h-7 w-7 text-success-600" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight text-ink-900">Check your email</h1>
            <p className="mt-3 text-sm text-ink-500">
              We sent a confirmation link to <strong>{email}</strong>. Click the link in the email to activate your account.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 text-sm font-medium text-primary-600 hover:underline"
            >
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
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
          onClick={() => navigate('/login')}
          className="text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Sign in
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-ink-200 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-semibold tracking-tight text-ink-900">Create account</h1>
            <p className="mt-2 text-sm text-ink-500">
              Start verifying real users with WebAuthn in minutes.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

              <Field
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="At least 6 characters"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
                required
              />

              <Field
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter your password"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
                required
              />

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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-ink-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            By creating an account, you agree to our{' '}
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
