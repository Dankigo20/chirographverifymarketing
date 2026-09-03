import { useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { useFetch } from '@/hooks/useFetch';
import { api, type ApiKeyInfo } from '@/lib/api';
import { DashboardCard, EmptyState, Badge, LoadingState, ErrorState } from '@/components/dashboard/DashboardUI';
import { KeyRound, Copy, Check, AlertCircle, Loader2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import type { NavigateFn } from './types';

export function ApiKeysPage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'API Key — Dashboard', description: 'Manage your Chirograph Verify API key.', path: '/dashboard/api-keys' });

  const { data, loading, error, refetch } = useFetch<ApiKeyInfo>(() => api.getApiKeyInfo());
  const [regeneratedKey, setRegeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenError, setRegenError] = useState<string | null>(null);
  const [confirmRegen, setConfirmRegen] = useState(false);

  const handleRegenerate = async () => {
    setRegenError(null);
    setRegenerating(true);
    try {
      const result = await api.regenerateApiKey();
      setRegeneratedKey(result.key);
      setConfirmRegen(false);
      refetch();
    } catch (err) {
      setRegenError(err instanceof Error ? err.message : 'Failed to regenerate key');
    } finally {
      setRegenerating(false);
    }
  };

  const copyKey = async () => {
    if (!regeneratedKey) return;
    try {
      await navigator.clipboard.writeText(regeneratedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  if (loading) return <LoadingState label="Loading API key..." />;
  if (error) return <ErrorState message={error} />;

  const keyExists = data?.exists ?? false;
  const prefix = data?.prefix ?? '';
  const createdAt = data?.created_at ? new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
  const lastRegen = data?.last_regenerated_at ? new Date(data.last_regenerated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;

  // Show newly regenerated key
  if (regeneratedKey) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-ink-900">API key regenerated</h2>
          <p className="mt-1 text-sm text-ink-500">
            Copy your new key now. For security, the full key will not be shown again.
          </p>
        </div>

        <DashboardCard>
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <code className="flex-1 break-all font-mono text-sm text-ink-800">
                {showKey ? regeneratedKey : `${regeneratedKey.slice(0, 12)}${'•'.repeat(20)}${regeneratedKey.slice(-4)}`}
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
                <strong>Keep this key secure.</strong> Never expose it in frontend code. Store it in server-side environment variables only. The previous key is now invalid.
              </p>
            </div>
          </div>

          <button
            onClick={() => { setRegeneratedKey(null); setShowKey(false); }}
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
      <div>
        <h2 className="text-xl font-semibold text-ink-900">API Key</h2>
        <p className="mt-1 text-sm text-ink-500">Your tenant API key is used to authenticate API requests from your backend.</p>
      </div>

      {keyExists ? (
        <DashboardCard title="Your API key" description="One key per account. Regenerate to invalidate the old key and create a new one.">
          <div className="space-y-4">
            <div className="rounded-xl border border-ink-200 bg-ink-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                    <KeyRound className="h-5 w-5 text-primary-600" />
                  </span>
                  <div>
                    <code className="font-mono text-sm text-ink-800">{prefix}</code>
                    <p className="mt-0.5 text-xs text-ink-400">Secret key</p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-ink-200 bg-white p-4">
                <p className="text-xs font-medium text-ink-500">Created</p>
                <p className="mt-1 text-sm font-medium text-ink-900">{createdAt ?? '—'}</p>
              </div>
              <div className="rounded-lg border border-ink-200 bg-white p-4">
                <p className="text-xs font-medium text-ink-500">Last regenerated</p>
                <p className="mt-1 text-sm font-medium text-ink-900">{lastRegen ?? '—'}</p>
              </div>
            </div>

            {regenError && (
              <div className="flex items-start gap-2.5 rounded-lg border border-error-200 bg-error-500/5 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" />
                <p className="text-sm text-error-600">{regenError}</p>
              </div>
            )}

            {confirmRegen ? (
              <div className="rounded-xl border border-warning-500/30 bg-warning-500/5 p-4">
                <p className="text-sm text-ink-700">
                  <strong>Are you sure?</strong> Regenerating will immediately invalidate your current key. Any services using the old key will stop working until updated.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleRegenerate}
                    disabled={regenerating}
                    className="flex items-center gap-2 rounded-xl bg-error-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-error-700 disabled:opacity-60"
                  >
                    {regenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Yes, regenerate
                  </button>
                  <button
                    onClick={() => setConfirmRegen(false)}
                    className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmRegen(true)}
                className="flex items-center gap-2 rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-error-300 hover:bg-error-50 hover:text-error-600"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate key
              </button>
            )}
          </div>
        </DashboardCard>
      ) : (
        <EmptyState
          title="No API key yet"
          description="Generate your first API key to start integrating Chirograph Verify with your backend."
          action={
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {regenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Generate API key
            </button>
          }
        />
      )}

      {/* Security note */}
      <div className="rounded-xl border border-warning-500/20 bg-warning-500/5 p-4">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning-600" />
          <div className="text-sm text-ink-700">
            <p className="font-medium text-warning-600">Protect your API key</p>
            <p className="mt-1">
              Never expose your API key in frontend code. Store it in server-side environment variables only.
              Use it from your backend to create challenges and redeem verification results.
            </p>
          </div>
        </div>
      </div>

      {/* Quick link to docs */}
      <div className="flex items-center justify-between rounded-xl border border-ink-200 bg-white p-5">
        <div>
          <p className="text-sm font-semibold text-ink-900">Need help integrating?</p>
          <p className="mt-0.5 text-xs text-ink-500">Read the quick start guide to learn how to use your API key.</p>
        </div>
        <button
          onClick={() => navigate('/docs/quick-start')}
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline"
        >
          Read docs
        </button>
      </div>
    </div>
  );
}
