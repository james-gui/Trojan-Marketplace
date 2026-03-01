import React from 'react';

interface DSBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

export function DSBadge({ children, variant = 'default', className = '' }: DSBadgeProps) {
  const variants = {
    default: 'bg-black text-white border-black',
    secondary: 'bg-slate-600 text-white border-slate-600',
    outline: 'bg-transparent text-black border-slate-300'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
