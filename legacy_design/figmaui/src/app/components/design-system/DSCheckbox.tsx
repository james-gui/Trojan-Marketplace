import React from 'react';
import { Check } from 'lucide-react';

interface DSCheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function DSCheckbox({ label, checked = false, onChange, disabled = false }: DSCheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div 
        className={`w-5 h-5 border-2 border-black rounded flex items-center justify-center transition-colors ${
          checked ? 'bg-black' : 'bg-white'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange?.(!checked)}
      >
        {checked && <Check size={14} strokeWidth={3} className="text-white" />}
      </div>
      {label && <span className="text-sm text-black">{label}</span>}
    </label>
  );
}
