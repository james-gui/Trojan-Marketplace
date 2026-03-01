import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  location: string;
  price: string;
  verified?: boolean;
  onClick?: () => void;
}

export function ServiceCard({ title, location, price, verified = true, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white border border-slate-200 rounded p-4 hover:border-black transition-colors text-left cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base mb-1">{title}</h3>
          <p className="text-sm text-slate-600">{location}</p>
        </div>
        {verified && (
          <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded text-xs">
            <ShieldCheck size={12} strokeWidth={2} />
            <span>USC.edu</span>
          </div>
        )}
      </div>
      <div className="text-xl tracking-tight">{price}</div>
    </div>
  );
}
