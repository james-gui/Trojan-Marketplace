"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { List, FileText, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();
  const location = { pathname };
  const router = useRouter();

  const navItems = [
    { path: '/', icon: List, label: 'Marketplace' },
    { path: '/engagements', icon: FileText, label: 'Requests' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="max-w-md mx-auto grid grid-cols-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center gap-1.5 py-3 transition-all"
            >
              {/* Subtle top border for active state */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-black" />
              )}

              <item.icon
                size={22}
                strokeWidth={1.5}
                className={isActive ? 'text-black' : 'text-slate-400'}
                style={{ opacity: isActive ? 1 : 0.5 }}
              />

              <span
                className="text-xs tracking-wide"
                style={{
                  opacity: isActive ? 1 : 0.5,
                  color: isActive ? '#000000' : '#94a3b8'
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}