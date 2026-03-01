"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { getAcceptedListings } from "@/app/actions";

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
            const result = await getAcceptedListings(session.user.email!);
            const data = result.success && result.data ? (result.data as any[]) : [];
            const spent = data.reduce((sum: number, l: any) => sum + (l.price ?? 0), 0);
            setBalance(STARTING_CREDITS - spent);
        } catch {
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
