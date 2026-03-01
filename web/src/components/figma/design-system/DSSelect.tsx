import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DSSelectProps {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function DSSelect({ label, options, value, onChange, placeholder = 'Select...' }: DSSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-black">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-10 px-3 pr-10 bg-white border border-slate-300 rounded text-black appearance-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" strokeWidth={1.5} />
      </div>
    </div>
  );
}
