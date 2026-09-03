import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api, type AuthSession } from '@/lib/api';

interface AuthUser {
  id: string;
  email: string;
  created_at?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.getSession()
      .then((session: AuthSession) => {
        if (active) setUser(session.user);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const result = await api.signIn(email, password);
      if (result.error) return { error: result.error };
      const session = await api.getSession();
      setUser(session.user);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Sign in failed' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const result = await api.signUp(email, password);
      if (result.error) return { error: result.error, needsConfirmation: false };
      const needsConfirmation = !!result.needs_confirmation;
      if (!needsConfirmation) {
        const session = await api.getSession();
        setUser(session.user);
      }
      return { error: null, needsConfirmation };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Sign up failed', needsConfirmation: false };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.signOut();
    } catch {
      /* ignore */
    }
    setUser(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const result = await api.resetPassword(email);
      return { error: result.error ?? null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Reset failed' };
    }
  }, []);

  const value: AuthContextValue = { user, loading, signIn, signUp, signOut, resetPassword };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
