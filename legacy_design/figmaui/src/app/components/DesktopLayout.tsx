import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Grid, FileText, User, DollarSign } from 'lucide-react';

interface DesktopLayoutProps {
  children: ReactNode;
  rightPanel?: ReactNode;
}

export function DesktopLayout({ children, rightPanel }: DesktopLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Marketplace', icon: Grid },
    { path: '/engagements', label: 'Requests', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="hidden lg:flex min-h-screen bg-white">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-center px-6">
          <h1 className="text-base tracking-tight">TROJAN MARKETPLACE</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                    active
                      ? 'bg-black text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                  }`}
                >
                  <Icon size={20} strokeWidth={1.5} />
                  <span className="text-base">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mini Profile Widget */}
          <div className="mt-8 mx-3 border border-slate-200 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={18} strokeWidth={1.5} className="text-slate-600" />
              <h3 className="text-sm text-slate-600 tracking-wider uppercase">Balance</h3>
            </div>
            <div className="text-2xl tracking-tight mb-1">$100.00</div>
            <div className="text-xs text-slate-600">CREDITS</div>
            <button
              onClick={() => navigate('/billing-methods')}
              className="w-full mt-4 py-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-sm"
            >
              Add Funds
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400 mb-1">Version 1.0.0</p>
          <p className="text-xs text-slate-400">© 2026 USC</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Center Panel */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Right Panel (Optional) */}
        {rightPanel && (
          <aside className="w-80 border-l border-slate-200 overflow-y-auto">
            {rightPanel}
          </aside>
        )}
      </main>
    </div>
  );
}
