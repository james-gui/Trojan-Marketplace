import React from 'react';
import { X, CheckCircle, Download } from 'lucide-react';
import { DSButton } from './design-system/DSButton';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: string;
  proofImage?: string;
  uploadedBy: string;
  uploadDate: string;
  onRelease: () => void;
}

export function ProofModal({
  isOpen,
  onClose,
  title,
  amount,
  proofImage,
  uploadedBy,
  uploadDate,
  onRelease,
}: ProofModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h3 className="text-base">Proof of Completion</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Task Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Task:</span>
              <span className="text-black">{title}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Amount:</span>
              <span className="text-black">{amount}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Uploaded by:</span>
              <span className="text-black">{uploadedBy}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Date:</span>
              <span className="text-black">{uploadDate}</span>
            </div>
          </div>

          {/* Proof Image */}
          <div className="bg-slate-100 rounded aspect-square flex items-center justify-center overflow-hidden border border-slate-200">
            {proofImage ? (
              <img
                src={proofImage}
                alt="Proof of completion"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8">
                <CheckCircle size={48} strokeWidth={1.5} className="text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  Proof image will be displayed here
                </p>
              </div>
            )}
          </div>

          {/* Verification Status */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} strokeWidth={1.5} className="text-black flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm mb-1">Verified Submission</div>
                <div className="text-xs text-slate-600">
                  This proof has been uploaded by a USC.edu verified user. Review carefully before releasing funds.
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <DSButton variant="outline" size="md" className="flex-1 gap-2">
              <Download size={16} strokeWidth={1.5} />
              Download
            </DSButton>
            <DSButton variant="primary" size="md" className="flex-1" onClick={onRelease}>
              Confirm & Release
            </DSButton>
          </div>
        </div>
      </div>
    </div>
  );
}