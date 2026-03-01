"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import PostModal from "./PostModal";

export default function Header({ onAddListing }: { onAddListing?: (data: any) => void }) {
    const { data: session } = useSession();
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/50"
        >
            <Link href="/" className="flex items-center gap-2 group transition-all">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-950" />
                </div>
                <span className="font-semibold tracking-tight text-white text-sm sm:text-base">
                    TrojanMarket.
                </span>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4">
                {session ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href="/dashboard" className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-slate-900 border border-transparent hover:border-slate-800">
                            Dashboard
                        </Link>
                        <img
                            src={session.user?.image || ""}
                            alt="Profile"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-700 hover:border-emerald-500 transition-colors"
                        />
                        <button
                            onClick={() => signOut()}
                            className="p-1.5 rounded-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Sign Out"
                        >
                            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                ) : (
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-slate-400 hover:text-white rounded-full">
                            Sign In
                        </Button>
                    </Link>
                )}
                {onAddListing ? (
                    <PostModal onSubmitCallback={onAddListing}>
                        <Button size="sm" className="rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs sm:text-sm h-8 sm:h-9">
                            Post Request
                        </Button>
                    </PostModal>
                ) : (
                    <Button size="sm" className="rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs sm:text-sm h-8 sm:h-9">
                        Post Request
                    </Button>
                )}
            </nav>
        </motion.header>
    );
}
