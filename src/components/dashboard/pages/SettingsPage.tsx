import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSeo } from '@/hooks/useSeo';
import { DashboardCard, Badge } from '@/components/dashboard/DashboardUI';
import { AlertCircle, Loader2, Check, Plus, Trash2 } from 'lucide-react';
import type { NavigateFn } from './types';

export function SettingsPage({ navigate: _navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'Settings — Dashboard', description: 'Manage your account and API settings.', path: '/dashboard/settings' });
  const { user } = useAuth();

  const [origins, setOrigins] = useState<string[]>([]);
  const [newOrigin, setNewOrigin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const addOrigin = () => {
    setError(null);
    if (!newOrigin.trim()) {
      setError('Please enter an origin URL.');
      return;
    }
    if (!newOrigin.match(/^https?:\/\/.+/)) {
      setError('Origin must start with http:// or https://');
      return;
    }
    if (origins.includes(newOrigin.trim())) {
      setError('This origin is already in the list.');
      return;
    }
    setOrigins([...origins, newOrigin.trim()]);
    setNewOrigin('');
  };

  const removeOrigin = (origin: string) => {
    setOrigins(origins.filter((o) => o !== origin));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-900">Settings</h2>
        <p className="mt-1 text-sm text-ink-500">Manage your account, API configuration, and security settings.</p>
      </div>

      {/* Account info */}
      <DashboardCard title="Account" description="Your authentication account information.">
        <div className="space-y-3">
          <Row label="Email" value={user?.email ?? '—'} />
          <Row label="User ID" value={user?.id ?? '—'} mono />
          <Row label="Account status" value={<Badge variant="success">Active</Badge>} />
        </div>
      </DashboardCard>

      {/* Widget origins */}
      <DashboardCard title="Allowed widget origins" description="Domains where the Chirograph Verify widget is permitted to run. The Free plan allows 1 origin.">
        <div className="space-y-3">
          {origins.length > 0 && (
            <ul className="space-y-2">
              {origins.map((origin) => (
                <li key={origin} className="flex items-center justify-between rounded-lg border border-ink-200 bg-ink-50 px-4 py-2.5">
                  <code className="font-mono text-sm text-ink-700">{origin}</code>
                  <button
                    onClick={() => removeOrigin(origin)}
                    className="rounded-lg p-1.5 text-error-500 transition-colors hover:bg-error-50"
                    aria-label="Remove origin"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={newOrigin}
              onChange={(e) => setNewOrigin(e.target.value)}
              placeholder="https://yourapp.com"
              className="flex-1 rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
            <button
              onClick={addOrigin}
              className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-lg border border-error-200 bg-error-500/5 p-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" />
              <p className="text-sm text-error-600">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-500">{origins.length} of 1 origin used</span>
            <button
              onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
              className="flex items-center gap-1.5 font-medium text-primary-600 hover:underline"
            >
              {saved ? <Check className="h-4 w-4" /> : null}
              {saved ? 'Saved' : 'Save changes'}
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Security */}
      <DashboardCard title="Security" description="Authentication and session settings.">
        <div className="space-y-3">
          <Row label="Authentication" value="Supabase Auth (email/password)" />
          <Row label="Session" value={<Badge variant="success">Active</Badge>} />
        </div>
      </DashboardCard>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-ink-500">{label}</span>
      <span className={`text-sm font-medium text-ink-900 ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
    </div>
  );
}
