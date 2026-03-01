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
                    const userDocument = {
                        id: user.id || user.email,
                        name: user.name,
                        email: user.email,
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
            }

            // Fetch and cache user data if not present or on update
            if (!token.email) return token;

            // Only fetch from DB if we don't have the onboarding status yet, or if alerted to update
            if (token.isOnboarded === undefined || trigger === "update") {
                try {
                    const container = await getUsersContainer();
                    const querySpec = {
                        query: "SELECT * FROM c WHERE c.email = @email",
                        parameters: [{ name: "@email", value: token.email }]
                    };
                    const { resources } = await container.items.query(querySpec).fetchAll();
                    if (resources.length > 0) {
                        token.isOnboarded = resources[0].isOnboarded === true;
                        token.profilePicture = resources[0].profilePicture || resources[0].image;
                        token.name = resources[0].name || token.name;
                    } else {
                        token.isOnboarded = false;
                    }
                } catch (e) {
                    console.error("[AUTH] JWT Fetch Error", e);
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
