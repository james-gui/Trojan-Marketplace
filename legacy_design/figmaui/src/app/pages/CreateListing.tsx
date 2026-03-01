import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNavigation } from '../components/BottomNavigation';
import { DesktopLayout } from '../components/DesktopLayout';

export default function CreateListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceName: '',
    details: '',
    price: '',
    endsOn: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Listing submitted:', formData);
    
    // Navigate back to marketplace showing "My Offers"
    // In a real app, you would also pass a success message via state
    navigate('/', { state: { tab: 'My Offers', showSuccess: true } });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-50 rounded transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          
          <h1 className="text-base tracking-tight">POST NEW LISTING</h1>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              SERVICE NAME
            </label>
            <input
              type="text"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              placeholder="e.g., Laundry Service"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              DETAILS
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Describe the service you're offering..."
              required
              rows={5}
              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              PRICE
            </label>
            <div className="relative">
              <DollarSign 
                size={20} 
                strokeWidth={1.5} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
              />
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Ends On */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              ENDS ON
            </label>
            <div className="relative">
              <Calendar 
                size={20} 
                strokeWidth={1.5} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
              />
              <input
                type="date"
                value={formData.endsOn}
                onChange={(e) => setFormData({ ...formData, endsOn: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded hover:bg-slate-800 transition-colors text-base"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded">
          <h3 className="text-sm mb-2">How It Works</h3>
          <div className="space-y-1 text-xs text-slate-600">
            <p>• Your listing will appear in the marketplace</p>
            <p>• Buyers pay a 10% deposit to accept your offer</p>
            <p>• Complete the task and upload proof</p>
            <p>• Receive payment when buyer releases funds</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}