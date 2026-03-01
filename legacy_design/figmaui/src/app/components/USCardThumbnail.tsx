import React from 'react';
import { CheckCircle, IdCard } from 'lucide-react';

export function USCardThumbnail() {
  return (
    <div className="relative">
      {/* Card */}
      <div className="w-full aspect-[1.586/1] bg-gradient-to-br from-slate-800 to-black rounded border border-slate-700 p-4 flex flex-col justify-between shadow-lg">
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-white text-xs tracking-wider mb-1">USC</div>
            <div className="text-white text-[10px] opacity-60">UNIVERSITY OF SOUTHERN CALIFORNIA</div>
          </div>
          <IdCard size={20} className="text-white opacity-40" strokeWidth={1.5} />
        </div>

        {/* Card Body */}
        <div>
          <div className="text-white text-sm mb-1">JOHN ANDERSON</div>
          <div className="text-white text-xs opacity-60">Student ID: 1234567890</div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-end">
          <div className="text-white text-[10px] opacity-40">VALID THRU 05/27</div>
          <div className="w-8 h-8 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Verified Badge */}
      <div className="absolute -bottom-3 -right-3 bg-black text-white rounded-full p-2 border-4 border-white shadow-lg">
        <CheckCircle size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
}
