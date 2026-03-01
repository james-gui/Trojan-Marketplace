import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Shield, Lock, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DSInput } from '../components/design-system/DSInput';
import { DSButton } from '../components/design-system/DSButton';
import { DSSwitch } from '../components/design-system/DSSwitch';
import { MenuItem } from '../components/MenuItem';
import { PageTransition } from '../components/PageTransition';

export default function Settings() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('j.anderson@usc.edu');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Saved:', { phoneNumber, email });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white pb-8">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-slate-50 rounded transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            
            <h1 className="text-base tracking-tight">SETTINGS</h1>
            
            <div className="w-10"></div>
          </div>
        </header>

        <main className="max-w-md mx-auto">
          {/* Personal Information Section */}
          <section className="px-4 py-8 border-b border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm text-slate-600 tracking-wider uppercase">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-black hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              <DSInput
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-slate-50' : ''}
              />
              
              <DSInput
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-slate-50' : ''}
              />

              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <DSButton
                    variant="outline"
                    size="md"
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false);
                      setPhoneNumber('+1 (555) 123-4567');
                      setEmail('j.anderson@usc.edu');
                    }}
                  >
                    Cancel
                  </DSButton>
                  <DSButton
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={handleSave}
                  >
                    Save Changes
                  </DSButton>
                </div>
              )}
            </div>

            <div className="mt-6 bg-slate-50 border border-slate-200 rounded p-3">
              <p className="text-xs text-slate-600">
                Changes to your email address will require verification. A confirmation link will be sent to your new email.
              </p>
            </div>
          </section>

          {/* Security Section */}
          <section className="py-8 border-b border-slate-200">
            <div className="px-4 mb-6">
              <h2 className="text-sm text-slate-600 tracking-wider uppercase">Security</h2>
            </div>

            <div className="border-t border-slate-200">
              <MenuItem
                icon={<Lock size={20} strokeWidth={1.5} />}
                label="Change PIN"
                onClick={() => console.log('Change PIN')}
              />
              
              <div className="px-4 py-5 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Smartphone size={20} strokeWidth={1.5} className="text-slate-600" />
                    <div>
                      <div className="text-base mb-1">Two-Factor Authentication</div>
                      <div className="text-xs text-slate-600">
                        {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                  <DSSwitch
                    checked={twoFactorEnabled}
                    onChange={setTwoFactorEnabled}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 mt-6 bg-slate-50 border border-slate-200 rounded p-3">
              <div className="flex items-start gap-3">
                <Shield size={18} strokeWidth={1.5} className="text-slate-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm mb-1">Security Recommendations</div>
                  <div className="text-xs text-slate-600">
                    Enable two-factor authentication for enhanced account security. We recommend using an authenticator app for the best protection.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="py-8 border-b border-slate-200">
            <div className="px-4 mb-6">
              <h2 className="text-sm text-slate-600 tracking-wider uppercase">Privacy</h2>
            </div>

            <div className="border-t border-slate-200">
              <MenuItem
                icon={<Shield size={20} strokeWidth={1.5} />}
                label="Privacy Policy"
                onClick={() => console.log('Privacy Policy')}
              />
              <MenuItem
                icon={<Lock size={20} strokeWidth={1.5} />}
                label="Data & Permissions"
                onClick={() => console.log('Data & Permissions')}
              />
            </div>
          </section>

          {/* Account Actions */}
          <section className="py-8">
            <div className="px-4 space-y-3">
              <DSButton
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => console.log('Export Data')}
              >
                Export My Data
              </DSButton>
              
              <DSButton
                variant="ghost"
                size="lg"
                className="w-full text-red-600 hover:bg-red-50"
                onClick={() => console.log('Delete Account')}
              >
                Delete Account
              </DSButton>
            </div>
          </section>

          {/* Footer Info */}
          <footer className="px-4 pb-8 text-center">
            <p className="text-xs text-slate-400">Last updated: March 1, 2026</p>
          </footer>
        </main>
      </div>
    </PageTransition>
  );
}