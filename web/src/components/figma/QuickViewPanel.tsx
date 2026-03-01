"use client";

import React, { useEffect, useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getMyListings, getAcceptedListings } from '@/app/actions';

interface Listing {
  id: string;
  title: string;
  price: number;
  status: string;
  posterName?: string;
  accepterEmail?: string;
}

const statusColors: Record<string, string> = {
  Open: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Accepted: 'bg-blue-50 text-blue-700 border border-blue-200',
  Completed: 'bg-slate-100 text-slate-600 border border-slate-200',
};

function StatusBadge({ status }: { status: string }) {
  const cls = statusColors[status] ?? 'bg-slate-100 text-slate-600 border border-slate-200';
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cls}`}>
      {status}
    </span>
  );
}

export function QuickViewPanel() {
  const router = useRouter();
  const { data: session } = useSession();

  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [acceptedListings, setAcceptedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const [myResult, acceptedResult] = await Promise.all([
          getMyListings(session.user.email!),
          getAcceptedListings(session.user.email!),
        ]);

        if (myResult.success && myResult.data) {
          setMyListings(myResult.data as Listing[]);
        }
        if (acceptedResult.success && acceptedResult.data) {
          setAcceptedListings(acceptedResult.data as Listing[]);
        }
      } catch (err) {
        console.error('QuickViewPanel fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [session?.user?.email]);

  const totalHeld = [...acceptedListings]
    .reduce((sum, l) => sum + (l.price ?? 0), 0)
    .toFixed(2);

  function TaskRow({ listing }: { listing: Listing }) {
    return (
      <button
        onClick={() => router.push('/engagements')}
        className="w-full bg-white border border-slate-200 rounded p-3 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <div className="text-sm mb-1 truncate">{listing.title}</div>
            <div className="text-xs text-slate-500">
              ${typeof listing.price === 'number' ? listing.price.toFixed(2) : listing.price}
            </div>
          </div>
          <StatusBadge status={listing.status ?? 'Open'} />
        </div>
      </button>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
        <h2 className="text-base tracking-tight">QUICK VIEW</h2>
        <button
          onClick={() => router.push('/engagements')}
          className="text-sm text-slate-600 hover:text-black transition-colors flex items-center gap-1"
        >
          View All <ChevronRight size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!session?.user?.email ? (
          <p className="text-sm text-slate-500 text-center pt-8">Sign in to see your activity</p>
        ) : isLoading ? (
          <div className="flex justify-center pt-8">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : (
          <>
            {/* My Listings (Selling) */}
            <div>
              <h3 className="text-xs text-slate-500 tracking-widest uppercase mb-3">
                My Listings ({myListings.length})
              </h3>
              <div className="space-y-2">
                {myListings.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No listings yet</p>
                ) : (
                  myListings.map((l) => <TaskRow key={l.id} listing={l} />)
                )}
              </div>
            </div>

            {/* Accepted / Bought */}
            <div>
              <h3 className="text-xs text-slate-500 tracking-widest uppercase mb-3">
                Accepted Tasks ({acceptedListings.length})
              </h3>
              <div className="space-y-2">
                {acceptedListings.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No tasks accepted yet</p>
                ) : (
                  acceptedListings.map((l) => <TaskRow key={l.id} listing={l} />)
                )}
              </div>
            </div>

            {/* Total Summary */}
            <div className="pt-4 border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded p-4">
                <div className="text-xs text-slate-500 mb-1 tracking-widest uppercase">
                  Value of Accepted Tasks
                </div>
                <div className="text-2xl tracking-tight">${totalHeld}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
