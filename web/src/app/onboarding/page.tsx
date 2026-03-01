"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { ProfileSetup } from "@/components/onboarding/ProfileSetup";
import { CategorySelection } from "@/components/onboarding/CategorySelection";
import { Loader2 } from "lucide-react";

function OnboardingSteps() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const step = searchParams.get("step") || "profile";

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!session) return null;

    if (step === "categories") {
        return <CategorySelection />;
    }

    return <ProfileSetup />;
}

export default function OnboardingPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-100">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            }
        >
            <OnboardingSteps />
        </Suspense>
    );
}
