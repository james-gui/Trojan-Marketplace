"use client";

import { useState } from "react";
import { Filter, Layers } from "lucide-react";
import Header from "@/components/Header";
import ViewToggle from "@/components/ViewToggle";
import SearchBar from "@/components/SearchBar";
import Feed, { Listing, MOCK_OFFERS, MOCK_REQUESTS } from "@/components/Feed";

type ViewMode = "offers" | "requests";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>("offers");
  const [searchQuery, setSearchQuery] = useState("");
  const [offers, setOffers] = useState<Listing[]>(MOCK_OFFERS);
  const [requests, setRequests] = useState<Listing[]>(MOCK_REQUESTS);

  const handleAddListing = (listing: any) => {
    const newListing: Listing = {
      ...listing,
      price: typeof listing.price === "string" ? parseFloat(listing.price) : listing.price,
      id: Math.random().toString(36).substr(2, 9),
    };

    if (listing.type === "Offer") {
      setOffers([newListing, ...offers]);
      setActiveView("offers");
    } else {
      setRequests([newListing, ...requests]);
      setActiveView("requests");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      <Header onAddListing={handleAddListing} />

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row pt-20 sm:pt-24 px-4 sm:px-6 md:px-8">

        {/* Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0 md:pr-8 pb-8 md:pb-0">
          <div className="sticky top-24 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-100 font-semibold px-1">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>Search & Filter</span>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className="hidden md:block space-y-4">
              <div className="flex items-center gap-2 text-slate-100 font-semibold px-1">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Quick Categories</span>
              </div>
              <ul className="space-y-3 px-1 text-sm text-slate-400 font-medium tracking-wide">
                <li className="cursor-pointer hover:text-emerald-400 transition-colors">All Listings</li>
                <li className="cursor-pointer hover:text-emerald-400 transition-colors">Food Delivery</li>
                <li className="cursor-pointer hover:text-emerald-400 transition-colors">Tutoring</li>
                <li className="cursor-pointer hover:text-emerald-400 transition-colors">Transportation</li>
                <li className="cursor-pointer hover:text-emerald-400 transition-colors">Errands & Labor</li>
              </ul>
            </div>

          </div>
        </aside>

        {/* Main Feed Content */}
        <main className="flex-1 min-w-0">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">
              Marketplace Feed
            </h1>
            <ViewToggle activeView={activeView} onToggle={setActiveView} />
          </div>

          <div className="-mx-6 md:mx-0">
            <Feed
              activeView={activeView}
              searchQuery={searchQuery}
              offers={offers}
              requests={requests}
            />
          </div>
        </main>

      </div>
    </div>
  );
}
