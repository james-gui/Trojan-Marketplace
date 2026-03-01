import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { DSButton } from './design-system/DSButton';

interface SuccessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  taskTitle: string;
  newBalance: string;
}

export function SuccessOverlay({ isOpen, onClose, amount, taskTitle, newBalance }: SuccessOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Modal */}
      <div className="relative bg-white rounded w-full max-w-sm mx-4 p-8 text-center animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Success Icon */}
        <div className="w-20 h-20 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
          <CheckCircle size={40} strokeWidth={2} className="text-white" />
        </div>

        {/* Title */}
        <h2 className="text-xl mb-2">Funds Released</h2>
        <p className="text-sm text-slate-600 mb-8">
          Payment of {amount} has been released for "{taskTitle}"
        </p>

        {/* Balance Update */}
        <div className="bg-slate-50 border border-slate-200 rounded p-6 mb-8">
          <div className="text-sm text-slate-600 mb-2">New Balance</div>
          <div className="text-4xl tracking-tight">{newBalance}</div>
          <div className="text-xs text-slate-600 mt-2">CREDITS</div>
        </div>

        {/* Action Button */}
        <DSButton
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          View Profile
        </DSButton>

        <p className="text-xs text-slate-500 mt-4">
          Transaction completed successfully
        </p>
      </div>
    </div>
  );
}
