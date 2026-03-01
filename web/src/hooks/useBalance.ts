import { useBalance as useBalanceContext } from "@/context/BalanceContext";

export function useBalance() {
    return useBalanceContext();
}
