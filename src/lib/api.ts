/**
 * Frontend API client for the existing Chirograph Verify backend.
 *
 * Bolt is frontend-only. All data operations go through the existing
 * Chirograph /api endpoints. Session cookies are managed by the backend.
 */

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
      else if (body.message) message = body.message;
    } catch {
      /* non-JSON error */
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    created_at?: string;
  } | null;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  type: 'secret' | 'publishable';
  created_at: string;
}

export interface OverviewData {
  plan: string;
  monthly_limit: number;
  used: number;
  api_key_count: number;
  webhook_configured: boolean;
}

export interface UsageData {
  monthly_limit: number;
  used: number;
  passed: number;
  flagged: number;
  failed: number;
}

export interface WebhookConfig {
  url: string;
  configured: boolean;
}

export interface BillingData {
  current_plan: string;
  monthly_limit: number;
  used: number;
}

export interface SettingsData {
  email: string;
  user_id: string;
  origins: string[];
}

export const api = {
  // Auth
  signUp: (email: string, password: string) =>
    request<{ error?: string; needs_confirmation?: boolean }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signIn: (email: string, password: string) =>
    request<{ error?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getSession: () =>
    request<AuthSession>('/auth/session'),

  signOut: () =>
    request<void>('/auth/logout', { method: 'POST' }),

  resetPassword: (email: string) =>
    request<{ error?: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Dashboard
  getOverview: () => request<OverviewData>('/overview'),
  getUsage: () => request<UsageData>('/usage'),
  getWebhooks: () => request<WebhookConfig>('/webhooks'),
  saveWebhook: (url: string) =>
    request<void>('/webhooks', {
      method: 'POST',
      body: JSON.stringify({ url }),
    }),
  getBilling: () => request<BillingData>('/billing'),
  getSettings: () => request<SettingsData>('/settings'),
  saveOrigins: (origins: string[]) =>
    request<void>('/settings/origins', {
      method: 'POST',
      body: JSON.stringify({ origins }),
    }),

  // API Keys
  getApiKeys: () => request<ApiKey[]>('/api-keys'),
  createApiKey: (name: string, type: 'secret' | 'publishable') =>
    request<{ key: string; id: string }>('/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name, type }),
    }),
  revokeApiKey: (id: string) =>
    request<void>(`/api-keys/${id}`, { method: 'DELETE' }),
};

export { ApiError };
