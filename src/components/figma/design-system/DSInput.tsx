import React from 'react';

interface DSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function DSInput({ label, error, className = '', ...props }: DSInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-black">{label}</label>
      )}
      <input
        className={`h-10 px-3 bg-white border border-slate-300 rounded text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
