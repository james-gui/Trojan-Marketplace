import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUsersContainer } from "@/lib/cosmos";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // We will build a custom login page
        error: "/login", // Redirect back to login if they fail the usc.edu check
    },
    callbacks: {
        async signIn({ user, account }) {
            // 1. Verify it is a USC email
            if (!user.email?.endsWith("@usc.edu")) {
                return "/login?error=AccessDenied";
            }

            // 2. Upsert the user into Cosmos DB
            if (user.email) {
                try {
                    const container = await getUsersContainer();
                    const userEmail = user.email.toLowerCase();
                    const userDocument = {
                        id: userEmail,
                        name: user.name,
                        email: userEmail,
                        image: user.image,
                        provider: account?.provider,
                        lastLogin: new Date().toISOString(),
                    };
                    await container.items.upsert(userDocument);
                } catch (error) {
                    console.error("[AUTH] Failed to sync user to Cosmos DB:", error);
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }

            // Manual session update from client
            if (trigger === "update" && session) {
                if (session.isOnboarded !== undefined) token.isOnboarded = session.isOnboarded;
                if (session.profilePicture) token.profilePicture = session.profilePicture;
                if (session.name) token.name = session.name;
                return token;
            }

            // Fetch and cache user data if missing
            if (!token.email) return token;

            // Use item.read() for maximal performance (O(1) vs Query O(N))
            if (token.isOnboarded === undefined) {
                try {
                    const container = await getUsersContainer();
                    const userId = (token.email as string).toLowerCase();
                    const { resource } = await container.item(userId, userId).read();

                    if (resource) {
                        token.isOnboarded = resource.isOnboarded === true;
                        token.profilePicture = resource.profilePicture || resource.image;
                        token.name = resource.name || token.name;
                    } else {
                        token.isOnboarded = false;
                    }
                } catch (e) {
                    console.error("[AUTH] JWT Fetch Error", e);
                    token.isOnboarded = false;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.isOnboarded = token.isOnboarded as boolean;
                session.user.profilePicture = token.profilePicture as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
});
