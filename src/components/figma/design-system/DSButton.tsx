import React from 'react';

interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function DSButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: DSButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-slate-800 border border-black',
    secondary: 'bg-slate-600 text-white hover:bg-slate-700 border border-slate-600',
    ghost: 'bg-transparent text-black hover:bg-slate-100 border border-transparent',
    outline: 'bg-transparent text-black hover:bg-slate-50 border border-slate-300'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-base'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
