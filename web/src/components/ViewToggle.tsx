"use client";

import { motion } from "framer-motion";

type ViewMode = "offers" | "requests";

interface ViewToggleProps {
    activeView: ViewMode;
    onToggle: (view: ViewMode) => void;
}

export default function ViewToggle({ activeView, onToggle }: ViewToggleProps) {
    const options = [
        { id: "offers", label: "Task Offers" },
        { id: "requests", label: "Open Requests" },
    ];

    return (
        <div className="flex items-center p-1.5 bg-slate-900 border border-slate-800/60 rounded-full shadow-lg">
            {options.map((option) => {
                const isActive = activeView === option.id;
                return (
                    <button
                        key={option.id}
                        onClick={() => onToggle(option.id as ViewMode)}
                        className="relative px-5 py-2 text-sm font-semibold rounded-full transition-colors outline-none"
                        style={{
                            color: isActive ? "#020617" : "#94a3b8", // text-slate-950 vs text-slate-400
                        }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
