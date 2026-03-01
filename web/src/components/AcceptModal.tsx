"use client";

import { MapPin, DollarSign, Clock, CheckCircle2, User } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Listing } from "./Feed";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { acceptListing } from "@/app/actions";

interface AcceptModalProps {
    listing: Listing | null;
    isOpen: boolean;
    onClose: () => void;
    onListingAccepted: (listingId: string) => void;
}

export default function AcceptModal({ listing, isOpen, onClose, onListingAccepted }: AcceptModalProps) {
    const { data: session } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!listing) return null;

    const handleAccept = async () => {
        if (!session?.user?.email) {
            alert("You must be logged in to accept a listing.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Server Action to update the database
            const result = await acceptListing(listing.id, session.user.email);

            if (result.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    onListingAccepted(listing.id);
                    onClose();
                    setIsSuccess(false);
                }, 1500);
            } else {
                console.error(result.error);
                alert("Failed to accept listing.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-slate-950 border-slate-800 text-slate-200">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${listing.type === "Offer"
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                            : "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/20"
                            }`}>
                            {listing.type}
                        </span>
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
                            {listing.category}
                        </span>
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight text-white line-clamp-2">
                        {listing.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {listing.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">Price</span>
                            <div className="flex items-center text-emerald-400 font-semibold text-lg">
                                <DollarSign className="w-5 h-5 mr-0.5" />
                                {listing.price.toFixed(2)}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">Timing</span>
                            <div className="flex items-center text-slate-200 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                <Clock className="w-4 h-4 mr-1.5 text-slate-400 shrink-0" />
                                <span className="truncate">{listing.time}</span>
                            </div>
                        </div>

                        <div className="col-span-2 flex flex-col gap-1 p-3 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">Location</span>
                            <div className="flex items-center text-slate-200 font-medium">
                                <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                                {listing.location}
                            </div>
                        </div>
                    </div>

                    {/* Real poster profile */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{listing.posterName || "USC Student"}</p>
                            <p className="text-xs text-slate-500">{listing.posterEmail || ""}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    {!session ? (
                        <Button disabled className="w-full bg-slate-800 text-slate-400 cursor-not-allowed py-6 rounded-xl">
                            Sign in to Accept
                        </Button>
                    ) : isSuccess ? (
                        <Button disabled className="w-full bg-emerald-500/20 text-emerald-400 py-6 rounded-xl border border-emerald-500/50 flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Accepted Successfully
                        </Button>
                    ) : (
                        <Button
                            onClick={handleAccept}
                            disabled={isSubmitting}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                        >
                            {isSubmitting ? "Processing..." : `Accept ${listing.type}`}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
