import { useState, useEffect } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/lib/api';
import { DashboardCard, EmptyState, Badge, LoadingState, ErrorState } from '@/components/dashboard/DashboardUI';
import { Webhook, Save, AlertCircle, Loader2, Check } from 'lucide-react';
import type { NavigateFn } from './types';

export function WebhooksPage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'Webhooks — Dashboard', description: 'Configure webhook endpoints.', path: '/dashboard/webhooks' });

  const { data, loading, error, refetch } = useFetch(() => api.getWebhooks());
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.url) setUrl(data.url);
  }, [data]);

  const handleSave = async () => {
    setSaveError(null);
    if (!url.trim()) {
      setSaveError('Please enter a webhook URL.');
      return;
    }
    if (!url.startsWith('https://')) {
      setSaveError('Webhook URL must use HTTPS.');
      return;
    }
    setSaving(true);
    try {
      await api.saveWebhook(url.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      refetch();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save webhook');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label="Loading webhook settings..." />;
  if (error) return <ErrorState message={error} />;

  const configured = data?.configured ?? false;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-900">Webhooks</h2>
        <p className="mt-1 text-sm text-ink-500">
          Configure a webhook endpoint to receive signed verification events in real time.
        </p>
      </div>

      <DashboardCard title="Webhook endpoint" description="Your webhook URL must be HTTPS and capable of verifying HMAC signatures.">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Endpoint URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourapp.com/api/chirograph-webhook"
              className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
          </div>

          {configured && (
            <div className="flex items-center gap-2 text-sm text-success-600">
              <Check className="h-4 w-4" />
              Webhook endpoint is currently configured.
            </div>
          )}

          {saveError && (
            <div className="flex items-start gap-2.5 rounded-lg border border-error-200 bg-error-500/5 p-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" />
              <p className="text-sm text-error-600">{saveError}</p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Saving...' : saved ? 'Saved' : 'Save endpoint'}
          </button>
        </div>
      </DashboardCard>

      <DashboardCard title="Webhook secret" description="Use this secret to verify webhook signatures on your backend.">
        <div className="rounded-xl border border-ink-200 bg-ink-50 p-4">
          <div className="flex items-center justify-between">
            <code className="font-mono text-sm text-ink-600">whsec_••••••••••••••••</code>
            <Badge variant="warning">Hidden</Badge>
          </div>
          <p className="mt-3 text-xs text-ink-400">
            Your webhook secret is shown once when first generated. Store it securely in your server-side environment variables.
            Never expose it in frontend code.
          </p>
        </div>
      </DashboardCard>

      <DashboardCard title="Recent deliveries" description="Latest webhook delivery attempts.">
        <EmptyState
          title="No webhook deliveries yet"
          description="Once you have configured a webhook endpoint and started receiving verification events, delivery logs will appear here."
          action={
            <button
              onClick={() => navigate('/docs/webhooks')}
              className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Read webhook docs
            </button>
          }
        />
      </DashboardCard>
    </div>
  );
}
