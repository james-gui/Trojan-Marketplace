import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { PageTransition } from '../components/PageTransition';
import { DSInput } from '../components/design-system/DSInput';
import { DSButton } from '../components/design-system/DSButton';

export default function PersonalInformation() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('j.anderson@usc.edu');
  const [phoneNumber, setPhoneNumber] = useState('213-XXX-XXXX');

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Saved:', { email, phoneNumber });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmail('j.anderson@usc.edu');
    setPhoneNumber('213-XXX-XXXX');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-slate-50 rounded transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            
            <h1 className="text-base tracking-tight">PERSONAL INFORMATION</h1>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-sm text-black hover:bg-slate-50 rounded transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="w-12"></div>
            )}
          </div>
        </header>

        <main className="max-w-md mx-auto">
          {/* User Information Section */}
          <section className="px-4 py-12">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm text-slate-600 tracking-wider uppercase flex items-center gap-2">
                  <Mail size={16} strokeWidth={1.5} />
                  USC Email
                </label>
                {isEditing ? (
                  <DSInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded text-base">
                    {email}
                  </div>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="text-sm text-slate-600 tracking-wider uppercase flex items-center gap-2">
                  <Phone size={16} strokeWidth={1.5} />
                  Phone Number
                </label>
                {isEditing ? (
                  <DSInput
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded text-base">
                    {phoneNumber}
                  </div>
                )}
              </div>

              {/* Action Buttons - Only show when editing */}
              {isEditing && (
                <div className="flex gap-3 pt-6">
                  <DSButton
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </DSButton>
                  <DSButton
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleSave}
                  >
                    Save Changes
                  </DSButton>
                </div>
              )}
            </div>
          </section>

          {/* Information Notice */}
          <section className="px-4 pb-12">
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <h3 className="text-sm mb-2 text-black">Account Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your USC email is used for account verification and important notifications. 
                Changes to your email address will require re-verification before taking effect.
              </p>
            </div>
          </section>

          {/* Member Info */}
          <section className="px-4 pb-12 border-t border-slate-200 pt-12">
            <h2 className="mb-6 text-sm text-slate-600 tracking-wider uppercase">Account Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <span className="text-sm text-slate-600">Member Since</span>
                <span className="text-sm text-black">January 2026</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <span className="text-sm text-slate-600">Account Status</span>
                <span className="text-sm text-black">Active</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-600">User ID</span>
                <span className="text-sm text-black font-mono">USC-2026-4587</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
