"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ViewToggle from "@/components/ViewToggle";
import SearchBar from "@/components/SearchBar";
import Feed from "@/components/Feed";

type ViewMode = "offers" | "requests";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>("offers");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      <Header />

      <main className="w-full relative">
        <Hero />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <ViewToggle activeView={activeView} onToggle={setActiveView} />

        <Feed activeView={activeView} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
