"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { getAllUserListings } from "@/app/actions";

const STARTING_CREDITS = 100;

interface BalanceContextType {
    balance: number | null;
    isLoading: boolean;
    refreshBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBalance = async () => {
        if (!session?.user?.email) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const result = await getAllUserListings(session.user.email!);
            const listings = result.success && result.data ? (result.data as any[]) : [];
            const userEmail = session.user.email!.toLowerCase();

            let netBalance = STARTING_CREDITS;

            listings.forEach((l) => {
                const price = Number(l.price) || 0;

                const isBuyer = (l.posterEmail?.toLowerCase() === userEmail && l.type === 'Request') ||
                    (l.accepterEmail?.toLowerCase() === userEmail && l.type === 'Offer');

                const isSeller = (l.posterEmail?.toLowerCase() === userEmail && l.type === 'Offer') ||
                    (l.accepterEmail?.toLowerCase() === userEmail && l.type === 'Request');

                if (isBuyer) {
                    netBalance -= price;
                }

                if (isSeller && l.status === 'Completed') {
                    netBalance += price;
                }
            });

            console.log(`[BALANCE] User: ${userEmail}, Listings found: ${listings.length}, Net: ${netBalance}`);
            setBalance(netBalance);
        } catch (error) {
            console.error("Balance fetch error:", error);
            setBalance(STARTING_CREDITS);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchBalance();
        }
    }, [session?.user?.email]);

    return (
        <BalanceContext.Provider value={{ balance, isLoading, refreshBalance: fetchBalance }}>
            {children}
        </BalanceContext.Provider>
    );
}

export function useBalance() {
    const context = useContext(BalanceContext);
    if (context === undefined) {
        throw new Error("useBalance must be used within a BalanceProvider");
    }
    return context;
}
