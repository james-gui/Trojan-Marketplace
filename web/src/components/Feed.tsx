"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Clock, MapPin } from "lucide-react";

type ViewMode = "offers" | "requests";

export interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    time: string;
    category: string;
    type: "Offer" | "Request";
}

// Dummy Data
export const MOCK_OFFERS: Listing[] = [
    {
        id: "o1",
        title: "Will wait in line for you at Dulce",
        description: "I have a two-hour gap. Will stand in the Dulce line and secure your matcha so you can study.",
        price: 5.0,
        location: "USC Village",
        time: "Next 2 hours",
        category: "Food Delivery",
        type: "Offer",
    },
    {
        id: "o2",
        title: "CS104 Debugging Help",
        description: "Viterbi junior offering an hour of C++ debugging for the upcoming programming assignment.",
        price: 25.0,
        location: "Leavey Library",
        time: "Tonight, 8-10PM",
        category: "Tutoring",
        type: "Offer",
    },
    {
        id: "o3",
        title: "Dorm Room Cleaning",
        description: "Fast and efficient cleaning for a standard layout double. I bring my own supplies.",
        price: 30.0,
        location: "Webb Tower",
        time: "Available Weekends",
        category: "Labor",
        type: "Offer",
    },
];

export const MOCK_REQUESTS: Listing[] = [
    {
        id: "r1",
        title: "Need someone to pick up a package",
        description: "I have a heavy box at the McCarthy mailroom and need help carrying it to my room in Birnkrant.",
        price: 10.0,
        location: "McCarthy -> Birnkrant",
        time: "ASAP",
        category: "Errands",
        type: "Request",
    },
    {
        id: "r2",
        title: "Can someone lend me an iClicker?",
        description: "Forgot mine at home. Need to rent an iClicker for my 2PM lecture today.",
        price: 5.0,
        location: "Taper Hall",
        time: "Today, 1:45PM",
        category: "Rentals",
        type: "Request",
    },
    {
        id: "r3",
        title: "Need a ride to LAX",
        description: "Looking for a ride to the airport this Friday morning. Will pay for gas + time.",
        price: 35.0,
        location: "Gateway -> LAX",
        time: "Friday, 8:00AM",
        category: "Transportation",
        type: "Request",
    },
    {
        id: "r4",
        title: "Someone to test my iOS app",
        description: "Need 3 people to spend 15 minutes testing a beta TestFlight app and giving me feedback.",
        price: 15.0,
        location: "Remote / Anywhere",
        time: "Flexible",
        category: "Digital Testing",
        type: "Request",
    },
];

interface FeedProps {
    activeView: ViewMode;
    searchQuery: string;
    offers: Listing[];
    requests: Listing[];
}

export default function Feed({ activeView, searchQuery, offers, requests }: FeedProps) {
    const isSearching = searchQuery.trim() !== "";

    // If searching, pull from both arrays so it acts as a global search.
    const rawData = isSearching
        ? [...offers, ...requests]
        : (activeView === "offers" ? offers : requests);

    // Filter data based on search query
    const data = rawData.filter(item => {
        if (!isSearching) return true;
        const q = searchQuery.toLowerCase();
        return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q)
        );
    });

    return (
        <div className="w-full pb-32">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {data.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-full py-12 text-center text-slate-500"
                        >
                            No listings found matching "{searchQuery}"
                        </motion.div>
                    ) : (
                        data.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                                className="group relative flex flex-col p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer overflow-hidden"
                            >
                                {/* Subtle Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 flex flex-col h-full space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-2 items-center flex-wrap">
                                            {isSearching && (
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.type === "Offer"
                                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                                                    : "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/20"
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            )}
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 shadow-sm border border-slate-700/50">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-md">
                                            <DollarSign className="w-4 h-4 mr-0.5" />
                                            {item.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-semibold text-slate-100 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-auto border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="truncate max-w-[100px]">{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
