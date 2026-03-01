"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ViewToggle from "@/components/ViewToggle";
import Feed from "@/components/Feed";

type ViewMode = "offers" | "requests";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>("offers");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      <Header />

      <main className="w-full relative">
        <Hero />

        <ViewToggle activeView={activeView} onToggle={setActiveView} />

        <Feed activeView={activeView} />
      </main>
    </div>
  );
}
