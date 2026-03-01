"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-auto mb-8 px-4 sm:px-0"
        >
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for tasks, skills, or locations..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-sm"
                />
            </div>
        </motion.div>
    );
}
