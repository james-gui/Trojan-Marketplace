import React from 'react';

interface DSRadioProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
  name?: string;
}

export function DSRadio({ label, checked = false, onChange, name }: DSRadioProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div
        className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center"
        onClick={onChange}
      >
        {checked && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
      </div>
      <span className="text-sm text-black">{label}</span>
    </label>
  );
}
