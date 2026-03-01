import React from 'react';
import { ArrowLeft, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DSCard } from '../components/design-system/DSCard';
import { BottomNavigation } from '../components/BottomNavigation';

interface Transaction {
  id: number;
  type: 'received' | 'sent';
  title: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending';
}

const transactions: Transaction[] = [
  { id: 1, type: 'received', title: 'Grocery Shopping', amount: '$20.00', date: 'Feb 28, 2026', status: 'completed' },
  { id: 2, type: 'sent', title: 'Laundry Service', amount: '$15.00', date: 'Feb 27, 2026', status: 'completed' },
  { id: 3, type: 'received', title: 'Photography Session', amount: '$50.00', date: 'Feb 25, 2026', status: 'completed' },
  { id: 4, type: 'sent', title: 'Tutoring - Math 101', amount: '$35.00', date: 'Feb 24, 2026', status: 'completed' },
  { id: 5, type: 'received', title: 'Spanish Tutoring', amount: '$30.00', date: 'Feb 22, 2026', status: 'pending' },
  { id: 6, type: 'sent', title: 'Dog Walking', amount: '$12.00', date: 'Feb 20, 2026', status: 'completed' },
];

export default function PaymentHistory() {
  const navigate = useNavigate();

  const totalReceived = transactions
    .filter(t => t.type === 'received' && t.status === 'completed')
    .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0);

  const totalSent = transactions
    .filter(t => t.type === 'sent' && t.status === 'completed')
    .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0);

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
          
          <h1 className="text-base tracking-tight">PAYMENT HISTORY</h1>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Summary */}
        <DSCard variant="bordered" className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-2xl text-green-700 mb-1">${totalReceived.toFixed(2)}</div>
            <div className="text-xs text-slate-600">Total Received</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-slate-600 mb-1">${totalSent.toFixed(2)}</div>
            <div className="text-xs text-slate-600">Total Sent</div>
          </div>
        </DSCard>

        {/* Transactions List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm text-slate-600 tracking-wider uppercase">Recent Transactions</h2>
            <button className="flex items-center gap-1 text-sm text-black hover:underline">
              <Download size={14} strokeWidth={1.5} />
              Export
            </button>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction) => (
              <DSCard key={transaction.id} variant="bordered" className="hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'received' ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      {transaction.type === 'received' ? (
                        <ArrowDownLeft size={18} strokeWidth={2} className="text-green-700" />
                      ) : (
                        <ArrowUpRight size={18} strokeWidth={2} className="text-slate-600" />
                      )}
                    </div>
                    <div>
                      <div className="text-base mb-1">{transaction.title}</div>
                      <div className="text-xs text-slate-600">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-base mb-1 ${
                      transaction.type === 'received' ? 'text-green-700' : 'text-black'
                    }`}>
                      {transaction.type === 'received' ? '+' : '-'}{transaction.amount}
                    </div>
                    <div className={`text-xs ${
                      transaction.status === 'completed' ? 'text-slate-600' : 'text-orange-600'
                    }`}>
                      {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                </div>
              </DSCard>
            ))}
          </div>
        </div>

        {/* Information Box */}
        <DSCard variant="bordered" className="bg-slate-50">
          <h3 className="text-sm mb-2">About Payment History</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your payment history shows all transactions from the past 90 days. 
            For older transactions or detailed statements, please contact support.
          </p>
        </DSCard>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
