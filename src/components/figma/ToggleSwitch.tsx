import React from 'react';

interface ToggleSwitchProps {
  options: [string, string];
  selected: string;
  onChange: (value: string) => void;
}

export function ToggleSwitch({ options, selected, onChange }: ToggleSwitchProps) {
  return (
    <div className="bg-slate-100 p-1 rounded inline-flex">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 text-sm transition-colors rounded ${
            selected === option
              ? 'bg-black text-white'
              : 'bg-transparent text-black hover:bg-slate-200'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
