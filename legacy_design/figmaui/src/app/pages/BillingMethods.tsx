import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DSCard } from '../components/design-system/DSCard';
import { BottomNavigation } from '../components/BottomNavigation';

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function BillingMethods() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '03/27', isDefault: false },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    }
  };

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
          
          <h1 className="text-base tracking-tight">BILLING METHODS</h1>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Payment Methods List */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <DSCard key={method.id} variant="bordered" className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center">
                    <CreditCard size={24} strokeWidth={1.5} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="text-base mb-1">{method.type} •••• {method.last4}</div>
                    <div className="text-sm text-slate-600">Expires {method.expiry}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  disabled={method.isDefault}
                >
                  <Trash2 size={18} strokeWidth={1.5} />
                </button>
              </div>
              {method.isDefault && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    Default Payment Method
                  </span>
                </div>
              )}
            </DSCard>
          ))}

          {paymentMethods.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CreditCard size={32} strokeWidth={1.5} className="text-slate-400" />
              </div>
              <h3 className="text-base mb-2">No Payment Methods</h3>
              <p className="text-sm text-slate-600">Add a payment method to get started</p>
            </div>
          )}
        </div>

        {/* Add Payment Method Button */}
        <button className="w-full py-4 border-2 border-slate-200 border-dashed rounded hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-black">
          <Plus size={20} strokeWidth={1.5} />
          <span className="text-base">Add Payment Method</span>
        </button>

        {/* Information Box */}
        <DSCard variant="bordered" className="bg-slate-50">
          <h3 className="text-sm mb-3">Secure Payments</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p>• All payment information is encrypted</p>
            <p>• We never store your full card number</p>
            <p>• Payments are processed securely</p>
            <p>• You can remove cards at any time</p>
          </div>
        </DSCard>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
