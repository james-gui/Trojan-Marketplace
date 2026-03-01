import React from 'react';

interface DSCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

export function DSCard({ children, className = '', variant = 'default' }: DSCardProps) {
  const variants = {
    default: 'bg-white border border-slate-200',
    bordered: 'bg-white border-2 border-black',
    elevated: 'bg-white border border-slate-200 shadow-lg'
  };
  
  return (
    <div className={`rounded p-4 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
