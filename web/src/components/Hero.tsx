"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
    const containerVars: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const textVars: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
            <motion.div
                variants={containerVars}
                initial="hidden"
                animate="show"
                className="space-y-4 sm:space-y-6"
            >
                <motion.div variants={textVars} className="inline-block rounded-full bg-slate-800/50 border border-slate-700/50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-slate-300">
                    The Hyper-Local Gig Economy
                </motion.div>

                <motion.h1 variants={textVars} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight">
                    Trade Time. <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Get Things Done.
                    </span>
                </motion.h1>

                <motion.p variants={textVars} className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
                    From coffee runs to coding help, TrojanMarket connects you with students nearby willing to trade skills and time.
                </motion.p>
            </motion.div>
        </section>
    );
}
