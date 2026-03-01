"use client";

import React from 'react';
import { X, MapPin, DollarSign, User, Clock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DSButton } from './design-system/DSButton';

interface TaskDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    location: string;
    price: string;
    description?: string;
    postedBy?: string;
    timeAgo?: string;
  } | null;
  readOnly?: boolean;
}

export function TaskDetailsDrawer({ isOpen, onClose, task, readOnly = false }: TaskDetailsDrawerProps) {
  const router = useRouter();

  if (!isOpen || !task) return null;

  const priceValue = parseFloat(task.price.replace('$', ''));
  const depositAmount = (priceValue * 0.1).toFixed(2);
  const remainingBalance = (100 - priceValue * 0.1).toFixed(2);

  const handlePost = () => {
    // Close drawer
    onClose();

    // Navigate to engagements with a small delay to allow drawer to close
    setTimeout(() => {
      router.push('/engagements');
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative bg-white rounded-t-lg w-full max-w-md max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h2 className="text-base">Task Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Task Info */}
          <div>
            <h3 className="text-xl mb-3">{task.title}</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} strokeWidth={1.5} className="text-slate-600" />
                <span>{task.location}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <User size={16} strokeWidth={1.5} className="text-slate-600" />
                <span>Posted by {task.postedBy || 'Sarah Chen'}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} strokeWidth={1.5} className="text-slate-600" />
                <span>{task.timeAgo || '2 hours ago'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-sm text-slate-600 mb-2">Description</h4>
            <p className="text-sm leading-relaxed">
              {task.description || `Looking for someone to help with ${task.title.toLowerCase()}. Must be reliable and available within the specified timeframe. Payment will be held securely until completion.`}
            </p>
          </div>

          {/* Price Breakdown or Action Warning */}
          {readOnly ? (
            <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} strokeWidth={1.5} />
                <h4 className="text-sm">Payment Info</h4>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Task Payment</span>
                <span className="text-black">{task.price}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} strokeWidth={1.5} />
                  <h4 className="text-sm">Payment Breakdown</h4>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Task Payment</span>
                    <span className="text-black">{task.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Initial Deposit (10%)</span>
                    <span className="text-black">-${depositAmount}</span>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between">
                    <span className="text-black">New Balance</span>
                    <span className="text-black">${remainingBalance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white border border-slate-300 rounded p-3">
                <AlertCircle size={18} strokeWidth={1.5} className="text-slate-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  By accepting this task, ${depositAmount} will be held as deposit. Funds will be released to the seller upon proof of completion.
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {readOnly ? (
              <DSButton
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={onClose}
              >
                Close
              </DSButton>
            ) : (
              <>
                <DSButton
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </DSButton>
                <DSButton
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handlePost}
                >
                  Accept & Post
                </DSButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
