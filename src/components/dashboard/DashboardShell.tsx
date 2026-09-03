import { useState } from 'react';
import { Fingerprint, LayoutGrid, KeyRound, Activity, BarChart3, Webhook, CreditCard, Settings, FileText, UserCircle, LogOut, Menu, X, ChevronRight } from 'lucide-react';

export interface DashboardNavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const dashboardNav: DashboardNavItem[] = [
  { label: 'Overview', icon: <LayoutGrid className="h-4.5 w-4.5" />, path: '/dashboard' },
  { label: 'API Key', icon: <KeyRound className="h-4.5 w-4.5" />, path: '/dashboard/api-keys' },
  { label: 'Usage', icon: <Activity className="h-4.5 w-4.5" />, path: '/dashboard/usage' },
  { label: 'Analytics', icon: <BarChart3 className="h-4.5 w-4.5" />, path: '/dashboard/analytics' },
  { label: 'Webhooks', icon: <Webhook className="h-4.5 w-4.5" />, path: '/dashboard/webhooks' },
  { label: 'Billing', icon: <CreditCard className="h-4.5 w-4.5" />, path: '/dashboard/billing' },
  { label: 'Settings', icon: <Settings className="h-4.5 w-4.5" />, path: '/dashboard/settings' },
  { label: 'Documentation', icon: <FileText className="h-4.5 w-4.5" />, path: '/docs' },
  { label: 'Account', icon: <UserCircle className="h-4.5 w-4.5" />, path: '/dashboard/account' },
];

interface DashboardSidebarProps {
  currentPath: string;
  navigate: (to: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onSignOut: () => void;
  userEmail: string | null;
}

export function DashboardSidebar({
  currentPath,
  navigate,
  isMobileOpen,
  onMobileClose,
  onSignOut,
  userEmail,
}: DashboardSidebarProps) {
  const go = (path: string) => {
    navigate(path);
    onMobileClose();
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-ink-200 bg-white transition-transform duration-300 ease-out-expo lg:sticky lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-ink-200 px-5">
          <button onClick={() => go('/')} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
              <Fingerprint className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink-900">
              Chirograph<span className="text-primary-600"> Verify</span>
            </span>
          </button>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {dashboardNav.map((item) => {
              const active = currentPath === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => go(item.path)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                    }`}
                  >
                    <span className={active ? 'text-primary-600' : 'text-ink-400'}>{item.icon}</span>
                    {item.label}
                    {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-primary-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User + sign out */}
        <div className="border-t border-ink-200 p-3">
          <div className="mb-2 rounded-lg px-3 py-2">
            <p className="truncate text-xs text-ink-500">{userEmail ?? 'Signed in'}</p>
          </div>
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink-600 transition-colors hover:bg-error-50 hover:text-error-600"
          >
            <LogOut className="h-4.5 w-4.5 text-ink-400" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

interface DashboardTopbarProps {
  onMenuClick: () => void;
  title: string;
}

export function DashboardTopbar({ onMenuClick, title }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-200 bg-white/90 px-5 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-ink-900">{title}</h1>
      </div>
    </header>
  );
}
