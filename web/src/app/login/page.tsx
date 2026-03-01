"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

function LoginContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">

            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 rounded-full bg-slate-950" />
                    </div>
                </div>

                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Welcome to TrojanMarket
                    </h1>
                    <p className="text-slate-400">
                        Sign in with your @usc.edu email to access the marketplace.
                    </p>
                </div>

                {error === "AccessDenied" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 text-red-400 items-start"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm">
                            <span className="font-semibold block mb-1">Access Denied</span>
                            You must use a valid @usc.edu email address to access the platform.
                        </p>
                    </motion.div>
                )}

                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 px-4 rounded-xl transition-all focus:ring-4 focus:ring-slate-500/50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>

                <p className="text-center text-xs text-slate-500 mt-8">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
            <LoginContent />
        </Suspense>
    )
}
