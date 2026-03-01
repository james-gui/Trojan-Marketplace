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
        async signIn({ user, account, profile }) {
            // 1. Verify it is a USC email
            if (!user.email?.endsWith("@usc.edu")) {
                // Return a custom error URL string that NextAuth will redirect to
                return "/login?error=AccessDenied";
            }

            // 2. Upsert the user into Cosmos DB
            if (user.email) {
                try {
                    const container = await getUsersContainer();

                    // Create the user document structure
                    const userDocument = {
                        id: user.id || user.email, // Cosmos requires an 'id' string
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: account?.provider,
                        lastLogin: new Date().toISOString(),
                    };

                    // Upsert means "Insert if it doesn't exist, Update if it does"
                    await container.items.upsert(userDocument);
                    console.log(`[AUTH] Successfully syned ${user.email} to Cosmos DB`);
                } catch (error) {
                    console.error("[AUTH] Failed to sync user to Cosmos DB:", error);
                    // We still let them log in even if the sync fails, so the hackathon demo doesn't completely break
                }
            }

            // 3. Allow sign in
            return true;
        },
        async session({ session, token }) {
            // Pass the user ID to the client session object
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});
