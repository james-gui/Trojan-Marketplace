import React from 'react';
import { ShieldCheck, Image as ImageIcon, Clock } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { DSButton } from './design-system/DSButton';

interface EngagementCardProps {
  title: string;
  location: string;
  partner: string;
  stage: 'deposited' | 'in-progress' | 'release';
  amount: string;
  type: 'buying' | 'selling';
  hasProof?: boolean;
  onViewProof?: () => void;
  timeRemaining?: string;
}

export function EngagementCard({
  title,
  location,
  partner,
  stage,
  amount,
  type,
  hasProof = false,
  onViewProof,
  timeRemaining,
}: EngagementCardProps) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base mb-1">{title}</h3>
          <p className="text-sm text-slate-600">{location}</p>
        </div>
        <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded text-xs">
          <ShieldCheck size={12} strokeWidth={2} />
          <span>USC.edu</span>
        </div>
      </div>

      {/* Partner Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">
          {type === 'buying' ? 'Seller' : 'Buyer'}:
        </span>
        <span className="text-black">{partner}</span>
      </div>

      {/* Time Remaining */}
      {timeRemaining && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={14} strokeWidth={1.5} />
          <span>{timeRemaining}</span>
        </div>
      )}

      {/* Progress Bar */}
      <ProgressBar stage={stage} amount={amount} />

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        {hasProof && (
          <DSButton
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={onViewProof}
          >
            <ImageIcon size={14} strokeWidth={1.5} />
            View Proof
          </DSButton>
        )}
        {stage === 'in-progress' && type === 'buying' && (
          <DSButton variant="ghost" size="sm" className="flex-1">
            Request Update
          </DSButton>
        )}
        {stage === 'in-progress' && type === 'selling' && (
          <DSButton variant="primary" size="sm" className="flex-1">
            Upload Proof
          </DSButton>
        )}
        {stage === 'release' && type === 'buying' && (
          <DSButton variant="primary" size="sm" className="flex-1">
            Release Funds
          </DSButton>
        )}
      </div>
    </div>
  );
}
