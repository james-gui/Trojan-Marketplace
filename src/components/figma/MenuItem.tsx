import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

export function MenuItem({ icon, label, onClick, variant = 'default' }: MenuItemProps) {
  const textColor = variant === 'danger' ? 'text-red-600' : 'text-black';
  const iconColor = variant === 'danger' ? 'text-red-600' : 'text-slate-600';
  
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 lg:px-6 py-5 hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-b-0"
    >
      <div className="flex items-center gap-4">
        <div className={iconColor}>
          {icon}
        </div>
        <span className={`text-base ${textColor}`}>{label}</span>
      </div>
      <ChevronRight size={20} strokeWidth={1.5} className={iconColor} />
    </button>
  );
}