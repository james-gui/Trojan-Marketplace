"use client";

import React, { useState } from 'react';
import { X, CheckCircle, Download, Upload, Loader2 } from 'lucide-react';
import { DSButton } from './design-system/DSButton';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: string;
  proofImage?: string | null;
  uploadedBy?: string;
  uploadDate?: string;
  role: 'buyer' | 'seller'; // buyer verifies and releases, seller uploads
  aiVerificationStatus?: "Pending" | "Verified" | "Failed";
  aiVerificationReason?: string;
  onUpload?: (base64Image: string) => Promise<void>;
  onRelease?: () => Promise<void>;
}

export function ProofModal({
  isOpen,
  onClose,
  title,
  amount,
  proofImage,
  uploadedBy,
  uploadDate,
  role,
  aiVerificationStatus,
  aiVerificationReason,
  onUpload,
  onRelease,
}: ProofModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      await onUpload(base64);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h3 className="text-base">Proof of Completion</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Task Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Task:</span>
              <span className="text-black font-medium">{title}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Amount:</span>
              <span className="text-black font-medium">{amount}</span>
            </div>
            {uploadedBy && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Uploaded by:</span>
                <span className="text-black">{uploadedBy}</span>
              </div>
            )}
            {uploadDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Date:</span>
                <span className="text-black">{uploadDate}</span>
              </div>
            )}
          </div>

          {/* Proof Image */}
          <div className="bg-slate-100 rounded flex flex-col items-center justify-center overflow-hidden border border-slate-200 min-h-[250px] relative">
            {proofImage ? (
              <img src={proofImage} alt="Proof of completion" className="w-full h-auto object-cover" />
            ) : isUploading ? (
              <div className="text-center p-8 text-slate-500">
                <Loader2 size={40} className="animate-spin mx-auto mb-3" />
                <p className="text-sm">Uploading...</p>
              </div>
            ) : role === 'seller' ? (
              <div className="text-center p-8 w-full">
                <Upload size={40} strokeWidth={1.5} className="text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 mb-4">Select an image to prove you've finished.</p>
                <label className="cursor-pointer bg-black text-white px-4 py-2 rounded text-sm hover:bg-slate-800 transition">
                  Browse Files
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            ) : (
              <div className="text-center p-8">
                <CheckCircle size={40} strokeWidth={1.5} className="text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600">Waiting for seller to upload proof.</p>
              </div>
            )}
          </div>

          {/* Actions & Status */}
          {proofImage && !aiVerificationStatus && (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} strokeWidth={1.5} className="text-green-700 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-green-900 mb-1">Proof Submitted</div>
                  <div className="text-xs text-green-800">
                    {role === 'buyer'
                      ? "Review the image above. If you're satisfied, release the funds."
                      : "Your proof was uploaded. The buyer must approve it to release funds."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Verification Banner */}
          {proofImage && aiVerificationStatus && (
            <div className={`border rounded p-3 ${aiVerificationStatus === 'Verified' ? 'bg-green-50 border-green-200' :
                aiVerificationStatus === 'Failed' ? 'bg-red-50 border-red-200' :
                  'bg-amber-50 border-amber-200'
              }`}>
              <div className="flex items-start gap-3">
                {aiVerificationStatus === 'Verified' ? <CheckCircle size={20} strokeWidth={1.5} className="text-green-700 flex-shrink-0 mt-0.5" /> :
                  aiVerificationStatus === 'Failed' ? <X size={20} strokeWidth={1.5} className="text-red-700 flex-shrink-0 mt-0.5" /> :
                    <Loader2 size={20} strokeWidth={1.5} className="text-amber-700 flex-shrink-0 mt-0.5 animate-spin" />}
                <div>
                  <div className={`text-sm mb-1 font-medium ${aiVerificationStatus === 'Verified' ? 'text-green-900' :
                      aiVerificationStatus === 'Failed' ? 'text-red-900' : 'text-amber-900'
                    }`}>
                    {aiVerificationStatus === 'Verified' ? 'AI Verification Passed' :
                      aiVerificationStatus === 'Failed' ? 'AI Verification Failed' : 'AI Verification Pending'}
                  </div>
                  <div className={`text-xs ${aiVerificationStatus === 'Verified' ? 'text-green-800' :
                      aiVerificationStatus === 'Failed' ? 'text-red-800' : 'text-amber-800'
                    }`}>
                    {aiVerificationReason || (aiVerificationStatus === 'Verified' ? "The image matches the task requirements." : "Verification in progress...")}
                  </div>
                  {role === 'buyer' && aiVerificationStatus === 'Failed' && (
                    <div className="text-xs text-red-800 mt-2 font-medium">
                      Note: You can still override this decision and release funds if you believe the AI is incorrect.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {role === 'buyer' && proofImage && (
            <div className="flex gap-2 pt-2">
              <DSButton variant={aiVerificationStatus === 'Failed' ? "outline" : "primary"} size="md" className="w-full" onClick={async () => {
                if (onRelease) {
                  setIsUploading(true);
                  await onRelease();
                  setIsUploading(false);
                }
              }}>
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (aiVerificationStatus === 'Failed' ? "Override & Release Funds" : "Confirm & Release Funds")}
              </DSButton>
            </div>
          )}

          {role === 'seller' && proofImage && (
            <div className="flex gap-2 pt-2">
              <DSButton variant="outline" size="md" className="w-full" onClick={onClose}>
                Close
              </DSButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}