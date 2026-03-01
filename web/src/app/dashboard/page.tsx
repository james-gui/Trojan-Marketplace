"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, ArrowLeft, CheckCircle2, Clock, MapPin, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import { Listing } from "@/components/Feed";
import { getMyListings, getAcceptedListings } from "@/app/actions";
import { Button } from "@/components/ui/button";

type DashboardTab = "posted" | "accepted";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<DashboardTab>("posted");
    const [myPosts, setMyPosts] = useState<Listing[]>([]);
    const [acceptedTasks, setAcceptedTasks] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const fetchData = async () => {
        if (!session?.user?.email) return;
        setIsLoading(true);
        try {
            const [postsRes, acceptedRes] = await Promise.all([
                getMyListings(session.user.email),
                getAcceptedListings(session.user.email)
            ]);

            if (postsRes.success && postsRes.data) setMyPosts(postsRes.data);
            if (acceptedRes.success && acceptedRes.data) setAcceptedTasks(acceptedRes.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchData();
        }
    }, [session]);

    if (status === "loading" || !session) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    const currentList = activeTab === "posted" ? myPosts : acceptedTasks;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center">
            <Header onAddListing={() => fetchData()} />

            <main className="w-full max-w-5xl mx-auto pt-24 pb-12 px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Feed
                        </Link>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Your Dashboard</h1>
                        <p className="text-slate-400 mt-1">Manage your activity on Trojan Marketplace</p>
                    </div>

                    <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                        <button
                            onClick={() => setActiveTab("posted")}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "posted"
                                ? "bg-white text-slate-950 shadow-lg"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`}
                        >
                            My Posts ({myPosts.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("accepted")}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "accepted"
                                ? "bg-white text-slate-950 shadow-lg"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`}
                        >
                            Accepted ({acceptedTasks.length})
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-4" />
                        <p>Syncing your activity...</p>
                    </div>
                ) : currentList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl text-center px-6">
                        <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-6">
                            <Plus className="w-8 h-8 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            {activeTab === "posted" ? "No posts yet" : "No accepted tasks"}
                        </h3>
                        <p className="text-slate-400 max-w-sm mb-8">
                            {activeTab === "posted"
                                ? "You haven't posted any requests or offers yet. Start by creating one from the marketplace!"
                                : "You haven't accepted any community tasks yet. Check the feed to see how you can help others!"}
                        </p>
                        {activeTab === "posted" ? (
                            <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8">
                                <Link href="/">Go to Feed</Link>
                            </Button>
                        ) : (
                            <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                <Link href="/">Browse Marketplace</Link>
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {currentList.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.type === "Offer" ? "bg-indigo-500/20 text-indigo-300" : "bg-fuchsia-500/20 text-fuchsia-300"}`}>
                                                {item.type}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.status === "Open" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="text-slate-500 text-xs font-medium tracking-tight">
                                            {new Date(item.createdAt || "").toLocaleDateString()}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
                                        {item.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/50">
                                        <div className="flex items-center text-xs text-slate-400">
                                            <DollarSign className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                                            <span className="font-semibold text-slate-200">
                                                ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-400">
                                            <MapPin className="w-3.5 h-3.5 mr-1" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-400 col-span-2">
                                            <Clock className="w-3.5 h-3.5 mr-1" />
                                            <span>{item.time}</span>
                                        </div>
                                    </div>

                                    {item.status === "Accepted" && activeTab === "posted" && (
                                        <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800 flex items-center justify-between">
                                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">ACCEPTED BY</div>
                                            <div className="text-xs font-medium text-emerald-400">{item.accepterEmail}</div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
