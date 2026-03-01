import React from 'react';

interface DSSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function DSSwitch({ checked = false, onChange, label, disabled = false }: DSSwitchProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div
        className={`w-11 h-6 border-2 border-black rounded-sm relative transition-colors ${
          checked ? 'bg-black' : 'bg-white'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange?.(!checked)}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white border border-black rounded-none transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
      {label && <span className="text-sm text-black">{label}</span>}
    </label>
  );
}
