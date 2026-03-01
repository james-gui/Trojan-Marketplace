import React from 'react';
import { AlertCircle, LogOut, CheckCircle, ShieldCheck, ChevronRight, User, CreditCard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { MenuItem } from '../components/MenuItem';
import { BottomNavigation } from '../components/BottomNavigation';
import { DesktopLayout } from '../components/DesktopLayout';

function ProfileMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentBalance = '100.00';
  const updatedBalance = '120.00';
  const showUpdatedBalance = location.state?.fromTransaction;
  const displayBalance = showUpdatedBalance ? updatedBalance : currentBalance;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center">
          <h1 className="text-base tracking-tight">PROFILE</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Balance Display */}
        <section className="px-4 py-16 text-center border-b border-slate-200">
          <div className="mb-2 text-sm text-slate-600 tracking-wider uppercase">Balance</div>
          <div className="text-5xl tracking-tight mb-1">${displayBalance}</div>
          <div className="text-sm text-slate-600 tracking-wide">CREDITS</div>
        </section>

        {/* Unified Menu - No Category Headers */}
        <section className="py-6">
          <div className="border-t border-b border-slate-200">
            {/* Personal Information */}
            <MenuItem
              icon={<User size={20} strokeWidth={1.5} />}
              label="Personal Information"
              onClick={() => navigate('/personal-information')}
            />

            {/* Identity Verification with Verified Badge */}
            <button
              onClick={() => navigate('/identity-verification')}
              className="w-full flex items-center justify-between px-4 py-5 hover:bg-slate-50 transition-colors border-b border-slate-200"
            >
              <div className="flex items-center gap-4">
                <div className="text-slate-600">
                  <ShieldCheck size={20} strokeWidth={1.5} />
                </div>
                <span className="text-base text-black">Identity Verification</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-green-700">
                  <CheckCircle size={16} strokeWidth={2} />
                  <span>Verified</span>
                </div>
                <ChevronRight size={20} strokeWidth={1.5} className="text-slate-600" />
              </div>
            </button>

            {/* Billing Methods */}
            <MenuItem
              icon={<CreditCard size={20} strokeWidth={1.5} />}
              label="Billing Methods"
              onClick={() => navigate('/billing-methods')}
            />

            {/* Report a Dispute */}
            <MenuItem
              icon={<AlertCircle size={20} strokeWidth={1.5} />}
              label="Report a Dispute"
              onClick={() => navigate('/report-dispute')}
            />

            {/* Sign Out */}
            <MenuItem
              icon={<LogOut size={20} strokeWidth={1.5} />}
              label="Sign Out"
              variant="danger"
              onClick={() => {
                if (confirm('Are you sure you want to sign out?')) {
                  console.log('Signing out...');
                }
              }}
            />
          </div>
        </section>

        {/* Footer Info */}
        <footer className="px-4 pb-12 text-center">
          <p className="text-xs text-slate-400 mb-2">Version 1.0.0</p>
          <p className="text-xs text-slate-400">© 2026 USC Task Marketplace</p>
        </footer>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

function ProfileDesktop() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentBalance = '100.00';
  const updatedBalance = '120.00';
  const showUpdatedBalance = location.state?.fromTransaction;
  const displayBalance = showUpdatedBalance ? updatedBalance : currentBalance;

  return (
    <DesktopLayout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-xl tracking-tight">Profile</h1>
          </div>
        </header>

        <main className="px-8 py-8 max-w-3xl">
          {/* Balance Display */}
          <section className="mb-12 p-8 border border-slate-200 rounded text-center">
            <div className="mb-2 text-sm text-slate-600 tracking-wider uppercase">Balance</div>
            <div className="text-5xl tracking-tight mb-1">${displayBalance}</div>
            <div className="text-sm text-slate-600 tracking-wide mb-6">CREDITS</div>
            <button
              onClick={() => navigate('/billing-methods')}
              className="px-6 py-2 bg-black text-white rounded hover:bg-slate-800 transition-colors text-sm"
            >
              Add Funds
            </button>
          </section>

          {/* Account Menu */}
          <section className="mb-12">
            <h2 className="mb-6 text-sm text-slate-600 tracking-wider uppercase">Account</h2>
            
            <div className="border border-slate-200 rounded overflow-hidden">
              <MenuItem
                icon={<User size={20} strokeWidth={1.5} />}
                label="Personal Information"
                onClick={() => navigate('/personal-information')}
              />

              <button
                onClick={() => navigate('/identity-verification')}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="text-slate-600">
                    <ShieldCheck size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-base text-black">Identity Verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-green-700">
                    <CheckCircle size={16} strokeWidth={2} />
                    <span>Verified</span>
                  </div>
                  <ChevronRight size={20} strokeWidth={1.5} className="text-slate-600" />
                </div>
              </button>
            </div>
          </section>

          {/* Wallet Menu */}
          <section className="mb-12">
            <h2 className="mb-6 text-sm text-slate-600 tracking-wider uppercase">Wallet</h2>
            
            <div className="border border-slate-200 rounded overflow-hidden">
              <MenuItem
                icon={<CreditCard size={20} strokeWidth={1.5} />}
                label="Billing Methods"
                onClick={() => navigate('/billing-methods')}
              />
            </div>
          </section>

          {/* Support Menu */}
          <section className="mb-12">
            <h2 className="mb-6 text-sm text-slate-600 tracking-wider uppercase">Support</h2>
            
            <div className="border border-slate-200 rounded overflow-hidden">
              <MenuItem
                icon={<AlertCircle size={20} strokeWidth={1.5} />}
                label="Report a Dispute"
                onClick={() => navigate('/report-dispute')}
              />
              <MenuItem
                icon={<LogOut size={20} strokeWidth={1.5} />}
                label="Sign Out"
                variant="danger"
                onClick={() => {
                  if (confirm('Are you sure you want to sign out?')) {
                    console.log('Signing out...');
                  }
                }}
              />
            </div>
          </section>

          {/* Footer Info */}
          <footer className="text-center pb-12">
            <p className="text-xs text-slate-400 mb-2">Version 1.0.0</p>
            <p className="text-xs text-slate-400">© 2026 USC Task Marketplace</p>
          </footer>
        </main>
      </div>
    </DesktopLayout>
  );
}

export default function Profile() {
  return (
    <>
      {/* Mobile Version */}
      <div className="lg:hidden">
        <ProfileMobile />
      </div>
      
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <ProfileDesktop />
      </div>
    </>
  );
}