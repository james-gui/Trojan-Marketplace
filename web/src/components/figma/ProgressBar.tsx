import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  stage: 'deposited' | 'in-progress' | 'release';
  amount: string;
}

export function ProgressBar({ stage, amount }: ProgressBarProps) {
  const stages = [
    { key: 'deposited', label: 'Deposited', percent: 10 },
    { key: 'in-progress', label: 'In Progress', percent: 50 },
    { key: 'release', label: 'Release', percent: 90 },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <div className="space-y-3">
      {/* Amount Display */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">Payment Amount</span>
        <span className="text-base tracking-tight">{amount}</span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-slate-200 rounded-sm overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${stages[currentStageIndex].percent}%` }}
          />
        </div>
      </div>

      {/* Stage Labels */}
      <div className="flex items-center justify-between">
        {stages.map((s, index) => (
          <div key={s.key} className="flex flex-col items-center gap-1">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                index <= currentStageIndex
                  ? 'border-black bg-black'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {index < currentStageIndex && (
                <Check size={14} strokeWidth={3} className="text-white" />
              )}
              {index === currentStageIndex && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span
              className={`text-xs ${
                index <= currentStageIndex ? 'text-black' : 'text-slate-400'
              }`}
            >
              {s.label}
            </span>
            <span className="text-xs text-slate-400">({s.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}