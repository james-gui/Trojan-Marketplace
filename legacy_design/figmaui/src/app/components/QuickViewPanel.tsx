import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

interface QuickTask {
  id: number;
  title: string;
  partner: string;
  stage: string;
  amount: string;
}

const buyingTasks: QuickTask[] = [
  { id: 1, title: 'Laundry', partner: 'Sarah Chen', stage: 'In Progress', amount: '$15.00' },
  { id: 2, title: 'Grocery Shopping', partner: 'Mike Johnson', stage: 'Review', amount: '$20.00' },
];

const sellingTasks: QuickTask[] = [
  { id: 3, title: 'Photography Session', partner: 'Emma Davis', stage: 'Waiting', amount: '$50.00' },
  { id: 4, title: 'Spanish Tutoring', partner: 'Alex Martinez', stage: 'In Progress', amount: '$30.00' },
];

export function QuickViewPanel() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
        <h2 className="text-base tracking-tight">QUICK VIEW</h2>
        <button
          onClick={() => navigate('/engagements')}
          className="text-sm text-slate-600 hover:text-black transition-colors"
        >
          View All
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Buying Section */}
        <div>
          <h3 className="text-sm text-slate-600 tracking-wider uppercase mb-4">
            Buying ({buyingTasks.length})
          </h3>
          <div className="space-y-3">
            {buyingTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => navigate('/engagements')}
                className="w-full bg-white border border-slate-200 rounded p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm mb-1">{task.title}</div>
                    <div className="text-xs text-slate-600">{task.partner}</div>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-slate-400 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock size={12} strokeWidth={1.5} />
                    <span>{task.stage}</span>
                  </div>
                  <span className="text-black">{task.amount}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selling Section */}
        <div>
          <h3 className="text-sm text-slate-600 tracking-wider uppercase mb-4">
            Selling ({sellingTasks.length})
          </h3>
          <div className="space-y-3">
            {sellingTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => navigate('/engagements')}
                className="w-full bg-white border border-slate-200 rounded p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm mb-1">{task.title}</div>
                    <div className="text-xs text-slate-600">{task.partner}</div>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} className="text-slate-400 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock size={12} strokeWidth={1.5} />
                    <span>{task.stage}</span>
                  </div>
                  <span className="text-black">{task.amount}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="pt-6 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200 rounded p-4">
            <div className="text-xs text-slate-600 mb-2 tracking-wider uppercase">Total Held</div>
            <div className="text-2xl tracking-tight">$115.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
