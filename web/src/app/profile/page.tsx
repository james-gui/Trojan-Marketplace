"use client";

import React, { useEffect, useState } from "react";
import {
    User,
    ShieldCheck,
    CheckCircle,
    CreditCard,
    AlertCircle,
    LogOut,
    ChevronRight,
    DollarSign,
    Loader2,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BottomNavigation } from "@/components/figma/BottomNavigation";
import { DesktopLayout } from "@/components/figma/DesktopLayout";
import { MenuItem } from "@/components/figma/MenuItem";
import { getMyListings, getAcceptedListings } from "@/app/actions";
import { useBalance } from "@/hooks/useBalance";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface Stats {
    selling: number;
    buying: number;
    totalValue: number;
}

// ──────────────────────────────────────────────
// Sign-out handler
// ──────────────────────────────────────────────
function handleSignOut() {
    if (confirm("Are you sure you want to sign out?")) {
        signOut({ callbackUrl: "/login" });
    }
}

// ──────────────────────────────────────────────
// Profile balance / stats section
// ──────────────────────────────────────────────
function BalanceSection({
    stats,
    isLoading: parentLoading,
    compact = false,
    onAddFunds,
}: {
    stats: Stats;
    isLoading: boolean;
    compact?: boolean;
    onAddFunds?: () => void;
}) {
    const { balance, isLoading: balanceLoading } = useBalance();
    const isLoading = parentLoading || balanceLoading;
    const creditBalance = balance !== null ? balance.toFixed(2) : "0.00";

    return compact ? (
        /* ── mobile ── */
        <section className="px-4 py-16 text-center border-b border-slate-200">
            {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-slate-300 mx-auto" />
            ) : (
                <>
                    <div className="mb-2 text-sm text-slate-600 tracking-wider uppercase">
                        Balance
                    </div>
                    <div className="text-5xl tracking-tight mb-1">${creditBalance}</div>
                    <div className="text-sm text-slate-600 tracking-wide">CREDITS</div>

                    <div className="mt-8 grid grid-cols-2 gap-3 max-w-xs mx-auto">
                        <div className="bg-slate-50 border border-slate-200 rounded p-3 text-center">
                            <div className="text-xl tracking-tight">{stats.selling}</div>
                            <div className="text-xs text-slate-500 mt-1">My Listings</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded p-3 text-center">
                            <div className="text-xl tracking-tight">{stats.buying}</div>
                            <div className="text-xs text-slate-500 mt-1">Accepted Tasks</div>
                        </div>
                    </div>
                </>
            )}
        </section>
    ) : (
        /* ── desktop ── */
        <section className="mb-10 p-8 border border-slate-200 rounded">
            {isLoading ? (
                <div className="flex justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                </div>
            ) : (
                <>
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="text-sm text-slate-600 tracking-wider uppercase mb-1">
                                Balance
                            </div>
                            <div className="text-5xl tracking-tight">${creditBalance}</div>
                            <div className="text-sm text-slate-600 tracking-wide mt-1">
                                CREDITS
                            </div>
                        </div>
                        <button
                            onClick={onAddFunds}
                            className="px-6 py-2 bg-black text-white rounded hover:bg-slate-800 transition-colors text-sm"
                        >
                            Add Funds
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center">
                            <div className="text-2xl tracking-tight">{stats.selling}</div>
                            <div className="text-xs text-slate-500 mt-1">My Listings</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center">
                            <div className="text-2xl tracking-tight">{stats.buying}</div>
                            <div className="text-xs text-slate-500 mt-1">Accepted Tasks</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center">
                            <div className="flex items-center justify-center gap-1 text-2xl tracking-tight">
                                <DollarSign size={18} strokeWidth={1.5} />
                                {stats.totalValue.toFixed(0)}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">Total Value</div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

// ──────────────────────────────────────────────
// Mobile
// ──────────────────────────────────────────────
function ProfileMobile({
    stats,
    isLoading,
}: {
    stats: Stats;
    isLoading: boolean;
}) {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center">
                    <h1 className="text-base tracking-tight">PROFILE</h1>
                </div>
            </header>

            <main className="max-w-md mx-auto">
                {/* Avatar + name */}
                {session?.user && (
                    <div className="flex flex-col items-center pt-8 pb-4">
                        {session.user.image ? (
                            <img
                                src={session.user.image}
                                alt={session.user.name ?? "User"}
                                className="w-16 h-16 rounded-full border border-slate-200 mb-3"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                <User size={28} strokeWidth={1.5} className="text-slate-400" />
                            </div>
                        )}
                        <div className="text-base">{session.user.name}</div>
                        <div className="text-sm text-slate-500">{session.user.email}</div>
                    </div>
                )}

                {/* Balance */}
                <BalanceSection stats={stats} isLoading={isLoading} compact />

                {/* Menu */}
                <section className="py-6">
                    <div className="border-t border-b border-slate-200">
                        <MenuItem
                            icon={<User size={20} strokeWidth={1.5} />}
                            label="Account Information"
                            onClick={() => { }}
                        />

                        <button
                            className="w-full flex items-center justify-between px-4 py-5 hover:bg-slate-50 transition-colors border-b border-slate-200"
                            onClick={() => { }}
                        >
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={20} strokeWidth={1.5} className="text-slate-600" />
                                <span className="text-base">USC Identity</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-sm text-green-700">
                                    <CheckCircle size={16} strokeWidth={2} />
                                    <span>Verified</span>
                                </div>
                                <ChevronRight size={20} strokeWidth={1.5} className="text-slate-600" />
                            </div>
                        </button>

                        <MenuItem
                            icon={<CreditCard size={20} strokeWidth={1.5} />}
                            label="Billing Methods"
                            onClick={() => router.push("/billing-methods")}
                        />

                        <MenuItem
                            icon={<AlertCircle size={20} strokeWidth={1.5} />}
                            label="Report a Dispute"
                            onClick={() => { }}
                        />

                        <MenuItem
                            icon={<LogOut size={20} strokeWidth={1.5} />}
                            label="Sign Out"
                            variant="danger"
                            onClick={handleSignOut}
                        />
                    </div>
                </section>

                <footer className="px-4 pb-12 text-center">
                    <p className="text-xs text-slate-400 mb-1">Version 1.0.0</p>
                    <p className="text-xs text-slate-400">© 2026 USC Task Marketplace</p>
                </footer>
            </main>

            <BottomNavigation />
        </div>
    );
}

// ──────────────────────────────────────────────
// Desktop
// ──────────────────────────────────────────────
function ProfileDesktop({
    stats,
    isLoading,
}: {
    stats: Stats;
    isLoading: boolean;
}) {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <DesktopLayout>
            <div className="min-h-screen bg-white">
                <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                    <div className="px-8 py-6">
                        <h1 className="text-xl tracking-tight">Profile</h1>
                    </div>
                </header>

                <main className="px-8 py-8 max-w-3xl">
                    {/* User info row */}
                    {session?.user && (
                        <div className="flex items-center gap-5 mb-10">
                            {session.user.image ? (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name ?? "User"}
                                    className="w-20 h-20 rounded-full border border-slate-200"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User size={36} strokeWidth={1.5} className="text-slate-400" />
                                </div>
                            )}
                            <div>
                                <div className="text-2xl tracking-tight mb-1">
                                    {session.user.name}
                                </div>
                                <div className="text-sm text-slate-500">{session.user.email}</div>
                                <div className="flex items-center gap-1.5 text-sm text-green-700 mt-1.5">
                                    <ShieldCheck size={14} strokeWidth={2} />
                                    <span>USC Identity Verified</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Balance + stats */}
                    <BalanceSection
                        stats={stats}
                        isLoading={isLoading}
                        onAddFunds={() => router.push("/billing-methods")}
                    />

                    {/* Account section */}
                    <section className="mb-10">
                        <h2 className="mb-4 text-sm text-slate-600 tracking-wider uppercase">
                            Account
                        </h2>
                        <div className="border border-slate-200 rounded overflow-hidden">
                            <MenuItem
                                icon={<User size={20} strokeWidth={1.5} />}
                                label="Account Information"
                                onClick={() => { }}
                            />
                            <MenuItem
                                icon={<CreditCard size={20} strokeWidth={1.5} />}
                                label="Billing Methods"
                                onClick={() => router.push("/billing-methods")}
                            />
                        </div>
                    </section>

                    {/* Support section */}
                    <section className="mb-10">
                        <h2 className="mb-4 text-sm text-slate-600 tracking-wider uppercase">
                            Support
                        </h2>
                        <div className="border border-slate-200 rounded overflow-hidden">
                            <MenuItem
                                icon={<AlertCircle size={20} strokeWidth={1.5} />}
                                label="Report a Dispute"
                                onClick={() => { }}
                            />
                            <MenuItem
                                icon={<LogOut size={20} strokeWidth={1.5} />}
                                label="Sign Out"
                                variant="danger"
                                onClick={handleSignOut}
                            />
                        </div>
                    </section>

                    <footer className="text-center pb-12">
                        <p className="text-xs text-slate-400 mb-1">Version 1.0.0</p>
                        <p className="text-xs text-slate-400">© 2026 USC Task Marketplace</p>
                    </footer>
                </main>
            </div>
        </DesktopLayout>
    );
}

// ──────────────────────────────────────────────
// Entry point — fetches stats once
// ──────────────────────────────────────────────
export default function ProfilePage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<Stats>({ selling: 0, buying: 0, totalValue: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            if (!session?.user?.email) return;
            setIsLoading(true);
            try {
                const [myRes, accRes] = await Promise.all([
                    getMyListings(session.user.email!),
                    getAcceptedListings(session.user.email!),
                ]);

                const myData = (myRes.success && myRes.data ? myRes.data : []) as any[];
                const accData = (accRes.success && accRes.data ? accRes.data : []) as any[];

                const totalValue = [...myData, ...accData].reduce(
                    (sum: number, l: any) => sum + (l.price ?? 0),
                    0
                );

                setStats({
                    selling: myData.length,
                    buying: accData.length,
                    totalValue,
                });
            } catch (err) {
                console.error("Profile stats error:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStats();
    }, [session?.user?.email]);

    return (
        <>
            <div className="lg:hidden">
                <ProfileMobile stats={stats} isLoading={isLoading} />
            </div>
            <div className="hidden lg:block">
                <ProfileDesktop stats={stats} isLoading={isLoading} />
            </div>
        </>
    );
}
