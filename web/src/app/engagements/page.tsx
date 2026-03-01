"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, ShieldCheck, Check, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { BottomNavigation } from "@/components/figma/BottomNavigation";
import { DesktopLayout } from "@/components/figma/DesktopLayout";
import { TaskDetailsDrawer } from "@/components/figma/TaskDetailsDrawer";
import { ProofModal } from "@/components/figma/ProofModal";
import { getMyListings, getAcceptedListings, uploadProof, completeListing } from "@/app/actions";
import { ImageIcon, Upload } from "lucide-react";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface Listing {
    id: string;
    title: string;
    location: string;
    price: number;
    description?: string;
    type: "Offer" | "Request";
    status: "Open" | "Accepted" | "Completed";
    posterEmail?: string;
    posterName?: string;
    accepterEmail?: string;
    createdAt?: string;
    proofImageUrl?: string;
}

// ──────────────────────────────────────────────
// Status → progress stage mapping
// ──────────────────────────────────────────────
type Stage = "open" | "accepted" | "completed";
function statusToStage(status: string): Stage {
    if (status === "Accepted") return "accepted";
    if (status === "Completed") return "completed";
    return "open";
}

const STAGES: { key: Stage; label: string; pct: number }[] = [
    { key: "open", label: "Open", pct: 10 },
    { key: "accepted", label: "Accepted", pct: 50 },
    { key: "completed", label: "Completed", pct: 100 },
];

// ──────────────────────────────────────────────
// ProgressBar
// ──────────────────────────────────────────────
function ProgressBar({ status, price }: { status: string; price: number }) {
    const stage = statusToStage(status);
    const idx = STAGES.findIndex((s) => s.key === stage);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Amount</span>
                <span className="text-base tracking-tight">${price.toFixed(2)}</span>
            </div>

            <div className="h-2 bg-slate-200 rounded-sm overflow-hidden">
                <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${STAGES[idx].pct}%` }}
                />
            </div>

            <div className="flex items-center justify-between">
                {STAGES.map((s, i) => (
                    <div key={s.key} className="flex flex-col items-center gap-1">
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${i <= idx ? "border-black bg-black" : "border-slate-300 bg-white"
                                }`}
                        >
                            {i < idx && <Check size={14} strokeWidth={3} className="text-white" />}
                            {i === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className={`text-xs ${i <= idx ? "text-black" : "text-slate-400"}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────
// ListingCard
// ──────────────────────────────────────────────
function ListingCard({
    listing,
    role,
    onClick,
    onProofAction,
}: {
    listing: Listing;
    role: "buyer" | "seller";
    onClick: () => void;
    onProofAction: () => void;
}) {
    const partnerLabel = role === "buyer" ? "Seller" : "Buyer";
    const partnerEmail =
        role === "buyer"
            ? (listing.type === "Offer" ? listing.posterEmail : listing.accepterEmail)
            : (listing.type === "Offer" ? listing.accepterEmail : listing.posterEmail);

    return (
        <div
            onClick={onClick}
            className="w-full bg-white border-2 border-slate-200 rounded p-4 space-y-4 hover:border-black transition-colors text-left cursor-pointer"
        >
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-base mb-1">{listing.title}</h3>
                    <p className="text-sm text-slate-600">{listing.location}</p>
                </div>
                <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded text-xs">
                    <ShieldCheck size={12} strokeWidth={2} />
                    <span>USC.edu</span>
                </div>
            </div>

            {/* Partner */}
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{partnerLabel}:</span>
                <span className="text-black truncate max-w-[180px]">
                    {partnerEmail ?? "—"}
                </span>
            </div>

            {/* Progress */}
            <ProgressBar status={listing.status} price={listing.price} />

            {/* Actions */}
            {listing.status === "Accepted" && (
                <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                    {role === "seller" && !listing.proofImageUrl && (
                        <button
                            onClick={onProofAction}
                            className="flex-1 bg-black text-white rounded py-2 text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                        >
                            <Upload size={16} strokeWidth={1.5} />
                            Upload Proof
                        </button>
                    )}
                    {role === "seller" && listing.proofImageUrl && (
                        <button
                            onClick={onProofAction}
                            className="flex-1 border border-slate-200 text-slate-700 rounded py-2 text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition"
                        >
                            <ImageIcon size={16} strokeWidth={1.5} />
                            View Proof & Status
                        </button>
                    )}
                    {role === "buyer" && listing.proofImageUrl && (
                        <button
                            onClick={onProofAction}
                            className="flex-1 bg-black text-white rounded py-2 text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                        >
                            <ImageIcon size={16} strokeWidth={1.5} />
                            Review & Release
                        </button>
                    )}
                    {role === "buyer" && !listing.proofImageUrl && (
                        <div className="flex-1 border border-slate-200 text-slate-400 rounded py-2 text-sm flex items-center justify-center gap-2 bg-slate-50 cursor-not-allowed">
                            Waiting for Proof
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ──────────────────────────────────────────────
// Collapsible Section
// ──────────────────────────────────────────────
function Section({
    title,
    count,
    children,
}: {
    title: string;
    count: number;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(true);
    return (
        <div className="border-y border-slate-200">
            <div
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between px-0 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <h2 className="text-base text-black">{title}</h2>
                    <span className="text-sm text-slate-500">({count})</span>
                </div>
                {open ? (
                    <ChevronUp size={18} strokeWidth={1.5} className="text-slate-400" />
                ) : (
                    <ChevronDown size={18} strokeWidth={1.5} className="text-slate-400" />
                )}
            </div>
            {open && <div className="pb-4 space-y-3">{children}</div>}
        </div>
    );
}

// ──────────────────────────────────────────────
// Main content (shared between mobile + desktop)
// ──────────────────────────────────────────────
function EngagementsContent() {
    const { data: session } = useSession();
    const [myListings, setMyListings] = useState<Listing[]>([]);
    const [acceptedListings, setAcceptedListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedTask, setSelectedTask] = useState<Listing | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [proofModalOpen, setProofModalOpen] = useState(false);
    const [proofTask, setProofTask] = useState<Listing | null>(null);

    const handleTaskClick = (task: Listing) => {
        setSelectedTask(task);
        setDrawerOpen(true);
    };

    const handleProofAction = (task: Listing) => {
        setProofTask(task);
        setProofModalOpen(true);
    };

    const reloadData = async () => {
        if (!session?.user?.email) return;
        const [myRes, accRes] = await Promise.all([
            getMyListings(session.user.email!),
            getAcceptedListings(session.user.email!),
        ]);
        if (myRes.success && myRes.data) setMyListings(myRes.data as Listing[]);
        if (accRes.success && accRes.data)
            setAcceptedListings(accRes.data as Listing[]);
    };

    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.email) return;
            setIsLoading(true);
            await reloadData();
            setIsLoading(false);
        }
        fetchData();
    }, [session?.user?.email]);

    if (!session?.user?.email) {
        return (
            <p className="text-sm text-slate-500 text-center py-16">
                Sign in to view your engagements.
            </p>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        );
    }

    const allMyTasks = [...myListings, ...acceptedListings];
    const totalValue = allMyTasks.reduce((sum, l) => sum + (l.price ?? 0), 0);

    const sellingTasks = [
        ...myListings.filter((l) => l.type === "Offer"),
        ...acceptedListings.filter((l) => l.type === "Request"),
    ];

    const buyingTasks = [
        ...myListings.filter((l) => l.type === "Request"),
        ...acceptedListings.filter((l) => l.type === "Offer"),
    ];

    return (
        <div className="space-y-6">
            {/* Summary card */}
            <div className="bg-white border-2 border-black rounded p-4 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} strokeWidth={1.5} />
                    <h2 className="text-base">Payment Status</h2>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <div className="text-2xl">${totalValue.toFixed(2)}</div>
                        <div className="text-xs text-slate-600 mt-1">Total Value</div>
                    </div>
                    <div>
                        <div className="text-2xl">{acceptedListings.length}</div>
                        <div className="text-xs text-slate-600 mt-1">Buying</div>
                    </div>
                    <div>
                        <div className="text-2xl">{myListings.length}</div>
                        <div className="text-xs text-slate-600 mt-1">Selling</div>
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-600">
                    Funds are held securely until task completion. Release funds after verifying proof of work.
                </div>
            </div>

            {/* Buying — tasks I am buying */}
            <Section title="Buying" count={buyingTasks.length}>
                {buyingTasks.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded border border-slate-200">
                        <p className="text-sm text-slate-600">No active purchases</p>
                    </div>
                ) : (
                    buyingTasks.map((l) => (
                        <ListingCard
                            key={l.id}
                            listing={l}
                            role="buyer"
                            onClick={() => handleTaskClick(l)}
                            onProofAction={() => handleProofAction(l)}
                        />
                    ))
                )}
            </Section>

            {/* Selling — tasks I am selling */}
            <Section title="Selling" count={sellingTasks.length}>
                {sellingTasks.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded border border-slate-200">
                        <p className="text-sm text-slate-600">No active sales</p>
                    </div>
                ) : (
                    sellingTasks.map((l) => (
                        <ListingCard
                            key={l.id}
                            listing={l}
                            role="seller"
                            onClick={() => handleTaskClick(l)}
                            onProofAction={() => handleProofAction(l)}
                        />
                    ))
                )}
            </Section>

            {/* How it works */}
            <div className="bg-white border border-slate-200 rounded p-4 space-y-3">
                <h3 className="text-sm">How Payment Works</h3>
                <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex gap-2">
                        <span className="text-black">1.</span>
                        <span><strong>Open:</strong> Your listing is live on the marketplace.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-black">2.</span>
                        <span><strong>Accepted:</strong> A buyer has committed — task is in progress.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-black">3.</span>
                        <span><strong>Completed:</strong> Task done and funds released.</span>
                    </div>
                </div>
            </div>

            {/* Task Details Drawer */}
            <TaskDetailsDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                readOnly={true}
                task={
                    selectedTask
                        ? {
                            title: selectedTask.title,
                            location: selectedTask.location,
                            price: `$${typeof selectedTask.price === "number" ? selectedTask.price.toFixed(2) : selectedTask.price}`,
                            description: selectedTask.description,
                            postedBy: selectedTask.posterEmail || selectedTask.posterName,
                        }
                        : null
                }
            />

            {/* Proof Modal */}
            <ProofModal
                isOpen={proofModalOpen}
                onClose={() => setProofModalOpen(false)}
                title={proofTask?.title || ""}
                amount={`$${proofTask?.price?.toFixed(2)}`}
                proofImage={proofTask?.proofImageUrl}
                role={
                    sellingTasks.find(t => t.id === proofTask?.id) ? "seller" : "buyer"
                }
                onUpload={async (base64) => {
                    if (proofTask) {
                        const res = await uploadProof(proofTask.id, base64);
                        if (res.success) {
                            await reloadData();
                        } else {
                            alert("Failed to upload proof");
                        }
                    }
                }}
                onRelease={async () => {
                    if (proofTask) {
                        const res = await completeListing(proofTask.id);
                        if (res.success) {
                            await reloadData();
                            setProofModalOpen(false);
                            alert("Funds released to seller!");
                        } else {
                            alert("Failed to release funds");
                        }
                    }
                }}
            />
        </div>
    );
}

// ──────────────────────────────────────────────
// Mobile layout
// ──────────────────────────────────────────────
function EngagementsMobile() {
    return (
        <div className="min-h-screen bg-white pb-24">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center">
                    <h1 className="text-base tracking-tight">MY ENGAGEMENTS</h1>
                </div>
            </header>
            <main className="max-w-md mx-auto px-4 py-6">
                <EngagementsContent />
            </main>
            <BottomNavigation />
        </div>
    );
}

// ──────────────────────────────────────────────
// Desktop layout
// ──────────────────────────────────────────────
function EngagementsDesktop() {
    return (
        <DesktopLayout>
            <div className="min-h-screen bg-white">
                <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                    <div className="px-8 py-6">
                        <h1 className="text-xl tracking-tight">My Engagements</h1>
                    </div>
                </header>
                <main className="px-8 py-8 max-w-4xl">
                    <EngagementsContent />
                </main>
            </div>
        </DesktopLayout>
    );
}

// ──────────────────────────────────────────────
// Entry point
// ──────────────────────────────────────────────
export default function EngagementsPage() {
    return (
        <>
            <div className="lg:hidden">
                <EngagementsMobile />
            </div>
            <div className="hidden lg:block">
                <EngagementsDesktop />
            </div>
        </>
    );
}
