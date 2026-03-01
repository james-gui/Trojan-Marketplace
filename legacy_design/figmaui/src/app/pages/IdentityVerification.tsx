import React from 'react';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DSCard } from '../components/design-system/DSCard';
import { BottomNavigation } from '../components/BottomNavigation';

export default function IdentityVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-slate-50 rounded transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          
          <h1 className="text-base tracking-tight">IDENTITY VERIFICATION</h1>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Verification Status */}
        <DSCard variant="bordered" className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle size={32} strokeWidth={2} className="text-green-700" />
          </div>
          <h2 className="text-xl mb-2">Verified</h2>
          <p className="text-sm text-slate-600">Your identity has been verified</p>
        </DSCard>

        {/* USCard Information */}
        <DSCard variant="default" className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={20} strokeWidth={1.5} className="text-slate-600" />
            <h3 className="text-base">USC Card Status</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Card Type</span>
              <span className="text-sm">Student ID</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Verification Date</span>
              <span className="text-sm">February 15, 2026</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700">Active</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-slate-600">Last Updated</span>
              <span className="text-sm">March 1, 2026</span>
            </div>
          </div>
        </DSCard>

        {/* Information Box */}
        <DSCard variant="bordered" className="bg-slate-50">
          <h3 className="text-sm mb-3">Why Verification Matters</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p>• Increases trust with other users</p>
            <p>• Required to post and accept tasks</p>
            <p>• Protects against fraud and scams</p>
            <p>• Enables secure payment processing</p>
          </div>
        </DSCard>

        {/* Re-verification Button */}
        <button className="w-full py-3 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-base">
          Re-verify Identity
        </button>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
