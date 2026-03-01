import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getAcceptedListings } from "@/app/actions";

const STARTING_CREDITS = 100;

/**
 * Returns the user's current credit balance.
 * Balance = $100 – sum of prices of tasks the user has accepted (bought).
 * When you buy/accept a service the full price is held as a deposit,
 * reducing your available credits.
 */
export function useBalance() {
    const { data: session } = useSession();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBalance() {
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
        }
        fetchBalance();
    }, [session?.user?.email]);

    return { balance, isLoading };
}
