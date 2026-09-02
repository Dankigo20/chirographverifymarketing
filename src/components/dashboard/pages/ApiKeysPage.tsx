import { useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { DashboardCard, EmptyState, Badge } from '@/components/dashboard/DashboardUI';
import { KeyRound, Plus, Copy, Check, Trash2, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import type { NavigateFn } from './types';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  type: 'secret' | 'publishable';
}

export function ApiKeysPage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'API Keys — Dashboard', description: 'Manage your Chirograph Verify API keys.', path: '/dashboard/api-keys' });

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'secret' | 'publishable'>('secret');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    if (!newKeyName.trim()) {
      setError('Please enter a name for your API key.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const prefix = newKeyType === 'secret' ? 'sk_live_' : 'pk_live_';
    const randomPart = Math.random().toString(36).slice(2, 42);
    const fullKey = `${prefix}${randomPart}`;

    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: newKeyName.trim(),
      prefix: `${prefix}...${randomPart.slice(-4)}`,
      createdAt: new Date().toISOString(),
      type: newKeyType,
    };

    setKeys((prev) => [...prev, newKey]);
    setCreatedKey(fullKey);
    setNewKeyName('');
    setNewKeyType('secret');
    setLoading(false);
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const copyKey = async () => {
    if (!createdKey) return;
    try {
      await navigator.clipboard.writeText(createdKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  // Show newly created key modal
  if (createdKey) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-ink-900">API key created</h2>
          <p className="mt-1 text-sm text-ink-500">
            Copy your key now. For security, the full key will not be shown again.
          </p>
        </div>

        <DashboardCard>
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <code className="flex-1 break-all font-mono text-sm text-ink-800">
                {showKey ? createdKey : `${createdKey.slice(0, 12)}${'•'.repeat(20)}${createdKey.slice(-4)}`}
              </code>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="rounded-lg p-2 text-ink-500 hover:bg-ink-100"
                  aria-label={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={copyKey}
                  className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-warning-500/20 bg-warning-500/5 p-4">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning-600" />
              <p className="text-sm text-ink-700">
                <strong>Keep this key secure.</strong>{' '}
                {newKeyType === 'secret'
                  ? 'Never expose secret keys in frontend code. Store them in server-side environment variables only.'
                  : 'Publishable keys are safe for browser use with the widget SDK.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { setCreatedKey(null); setShowKey(false); }}
            className="mt-6 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-850"
          >
            Done
          </button>
        </DashboardCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink-900">API Keys</h2>
          <p className="mt-1 text-sm text-ink-500">Manage your secret and publishable API keys.</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Create key
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <DashboardCard title="Create new API key">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Key name</label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g. Production server"
                className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Key type</label>
              <div className="grid gap-3 sm:grid-cols-2">
                <KeyTypeOption
                  selected={newKeyType === 'secret'}
                  onSelect={() => setNewKeyType('secret')}
                  label="Secret key"
                  prefix="sk_live_..."
                  description="Server-side only. Create challenges and redeem results."
                />
                <KeyTypeOption
                  selected={newKeyType === 'publishable'}
                  onSelect={() => setNewKeyType('publishable')}
                  label="Publishable key"
                  prefix="pk_live_..."
                  description="Browser-safe. Used with the widget SDK."
                />
              </div>
            </div>
            {error && (
              <div className="flex items-start gap-2.5 rounded-lg border border-error-200 bg-error-500/5 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" />
                <p className="text-sm text-error-600">{error}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Generate key
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </DashboardCard>
      )}

      {/* Key list */}
      {keys.length === 0 ? (
        <EmptyState
          title="No API keys yet"
          description="Create your first API key to start integrating Chirograph Verify."
          action={
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
              Create your first key
            </button>
          }
        />
      ) : (
        <DashboardCard>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-200">
                  <th className="px-4 py-3 text-left font-semibold text-ink-900">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-900">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-900">Key</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-900">Created</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr key={key.id} className="border-b border-ink-100">
                    <td className="px-4 py-3 font-medium text-ink-900">{key.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant={key.type === 'secret' ? 'error' : 'primary'}>
                        {key.type === 'secret' ? 'Secret' : 'Publishable'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs text-ink-600">{key.prefix}</code>
                    </td>
                    <td className="px-4 py-3 text-ink-500">
                      {new Date(key.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleRevoke(key.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-error-600 transition-colors hover:bg-error-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      )}

      {/* Security note */}
      <div className="rounded-xl border border-warning-500/20 bg-warning-500/5 p-4">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning-600" />
          <div className="text-sm text-ink-700">
            <p className="font-medium text-warning-600">Protect your secret keys</p>
            <p className="mt-1">
              Never expose <code className="font-mono text-xs">sk_live_...</code> keys in frontend code.
              Store them in server-side environment variables only. Publishable keys
              (<code className="font-mono text-xs">pk_live_...</code>) are safe for browser use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyTypeOption({
  selected,
  onSelect,
  label,
  prefix,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  prefix: string;
  description: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`rounded-xl border p-4 text-left transition-colors ${
        selected
          ? 'border-primary-400 bg-primary-50/50 ring-1 ring-primary-400'
          : 'border-ink-200 hover:border-ink-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <KeyRound className={`h-4 w-4 ${selected ? 'text-primary-600' : 'text-ink-400'}`} />
        <span className="text-sm font-semibold text-ink-900">{label}</span>
      </div>
      <code className="mt-2 block font-mono text-xs text-ink-500">{prefix}</code>
      <p className="mt-1 text-xs text-ink-500">{description}</p>
    </button>
  );
}
