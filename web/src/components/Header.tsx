"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/50"
        >
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-950" />
                </div>
                <span className="font-semibold tracking-tight text-white">
                    TrojanMarket.
                </span>
            </div>

            <nav className="flex items-center gap-4">
                <Button variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                    Sign In
                </Button>
                <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-200">
                    Post Request
                </Button>
            </nav>
        </motion.header>
    );
}
