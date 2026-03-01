import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    // Check both session.user.isOnboarded and the root token property
    const isOnboarded =
        (req.auth?.user as any)?.isOnboarded === true ||
        (req.auth as any)?.isOnboarded === true;

    // Define route types
    const isAuthRoute = nextUrl.pathname.startsWith("/login");
    const isPublicRoute = nextUrl.pathname === "/";
    const isOnboardingRoute = nextUrl.pathname.startsWith("/onboarding");
    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

    // 1. Allow API Auth routes to work without interruption
    if (isApiAuthRoute) {
        return;
    }

    // 2. If logged in and on the login page, go setup or dashboard
    if (isAuthRoute) {
        if (isLoggedIn) {
            if (isOnboarded) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            } else {
                return Response.redirect(new URL("/onboarding", nextUrl));
            }
        }
        return;
    }

    // 3. If NOT logged in and trying to access a protected route
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/", nextUrl));
    }

    // 4. Logged in User routing logic
    if (isLoggedIn) {
        if (!isOnboarded && !isOnboardingRoute && !isPublicRoute) {
            return Response.redirect(new URL("/onboarding", nextUrl));
        }

        if (isOnboarded && isOnboardingRoute) {
            return Response.redirect(new URL("/dashboard", nextUrl));
        }
    }

});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
