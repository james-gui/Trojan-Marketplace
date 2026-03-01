"use server";

import { getListingsContainer, getUsersContainer } from "@/lib/cosmos";
import { sendHandshakeEmail } from "@/lib/email";

// ----------------------------------------------------------------------
// Users & Onboarding
// ----------------------------------------------------------------------

export async function getUserProfile(email: string) {
    try {
        const container = await getUsersContainer();
        const querySpec = {
            query: "SELECT * FROM c WHERE c.email = @email",
            parameters: [{ name: "@email", value: email }]
        };
        const { resources } = await container.items.query(querySpec).fetchAll();

        if (resources.length > 0) {
            return { success: true, data: resources[0] };
        }
        return { success: false, error: "User not found" };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to get user profile:", error);
        return { success: false, error: error.message };
    }
}

export async function completeOnboarding(email: string, name: string, phone: string, profilePic: string) {
    try {
        const container = await getUsersContainer();
        const userEmail = email.toLowerCase();
        const { resource: user } = await container.item(userEmail, userEmail).read();

        if (user) {
            user.name = name;

            // Normalize phone number to E.164 (+1XXXXXXXXXX)
            let cleaned = phone.replace(/\D/g, "");
            if (cleaned.length === 10) {
                cleaned = "1" + cleaned;
            }
            user.phoneNumber = "+" + cleaned;

            user.profilePicture = profilePic;
            user.isOnboarded = true;

            await container.item(user.id, user.id).replace(user);
            return { success: true, data: user };
        }

        return { success: false, error: "User not found" };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to complete onboarding:", error);
        return { success: false, error: error.message };
    }
}

// Type matches our frontend `Listing`
interface ListingPayload {
    title: string;
    description: string;
    price: number;
    location: string;
    time: string;
    category: string;
    type: "Offer" | "Request";
    posterEmail: string;
    posterName?: string;
    aiVerificationStatus?: "Pending" | "Verified" | "Failed";
    aiVerificationReason?: string;
}

export async function createListing(data: ListingPayload) {
    try {
        const container = await getListingsContainer();
        const listingId = Math.random().toString(36).substr(2, 9);

        // Create the document
        const document = {
            id: listingId,
            ...data,
            posterEmail: data.posterEmail.toLowerCase(),
            status: "Open", // Can be "Open" or "Accepted"
            createdAt: new Date().toISOString(),
        };

        await container.items.create(document);

        return { success: true, id: listingId };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to create listing:", error);
        return { success: false, error: error.message };
    }
}

export async function getOpenListings() {
    try {
        const container = await getListingsContainer();
        const querySpec = {
            query: "SELECT * FROM c WHERE c.status = 'Open' ORDER BY c.createdAt DESC"
        };

        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return { success: true, data: items };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to fetch listings:", error);
        return { success: false, error: error.message };
    }
}

export async function getMyListings(email: string) {
    try {
        const container = await getListingsContainer();
        const querySpec = {
            query: "SELECT * FROM c WHERE LOWER(c.posterEmail) = @email ORDER BY c.createdAt DESC",
            parameters: [{ name: "@email", value: email.toLowerCase() }]
        };
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return { success: true, data: items };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to fetch my listings:", error);
        return { success: false, error: error.message };
    }
}

export async function getAcceptedListings(email: string) {
    try {
        const container = await getListingsContainer();
        const querySpec = {
            query: "SELECT * FROM c WHERE LOWER(c.accepterEmail) = @email ORDER BY c.createdAt DESC",
            parameters: [{ name: "@email", value: email.toLowerCase() }]
        };
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return { success: true, data: items };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to fetch accepted listings:", error);
        return { success: false, error: error.message };
    }
}

export async function getAllUserListings(email: string) {
    try {
        const container = await getListingsContainer();
        const querySpec = {
            query: "SELECT * FROM c WHERE LOWER(c.posterEmail) = @email OR LOWER(c.accepterEmail) = @email",
            parameters: [{ name: "@email", value: email.toLowerCase() }]
        };
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return { success: true, data: items };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to fetch all user listings:", error);
        return { success: false, error: error.message };
    }
}

export async function acceptListing(listingId: string, accepterEmail: string) {
    try {
        const container = await getListingsContainer();

        const { resource: item } = await container.item(listingId, listingId).read();

        if (!item) {
            return { success: false, error: "Listing not found" };
        }

        if (item.status === "Accepted") {
            return { success: false, error: "Listing already accepted by someone else." };
        }

        if (item.posterEmail === accepterEmail) {
            return { success: false, error: "You cannot accept your own listing." };
        }

        // Modify and replace
        item.status = "Accepted";
        const sanitizedAccepterEmail = accepterEmail.toLowerCase();
        item.accepterEmail = sanitizedAccepterEmail;
        item.acceptedAt = new Date().toISOString();

        await container.item(listingId, listingId).replace(item);

        // --- EMAIL HANDSHAKE LOGIC ---
        try {
            console.log(`[EMAIL DEBUG] Starting Handshake flow for ${item.title}`);
            const usersContainer = await getUsersContainer();

            const posterEmail = item.posterEmail.toLowerCase();
            const { resource: poster } = await usersContainer.item(posterEmail, posterEmail).read();
            const { resource: accepter } = await usersContainer.item(sanitizedAccepterEmail, sanitizedAccepterEmail).read();

            if (poster && accepter) {
                const subject = `Trojan Marketplace: Match Found for "${item.title}"`;
                const priceStr = `$${typeof item.price === "number" ? item.price.toFixed(2) : item.price}`;

                console.log(`[EMAIL DEBUG] Sending handshake between ${posterEmail} and ${sanitizedAccepterEmail}`);

                await Promise.all([
                    sendHandshakeEmail(
                        posterEmail,
                        subject,
                        `Hi ${poster.name},\n\nGood news! Your listing "${item.title}" has been accepted by ${accepter.name} for ${priceStr}.\n\nYou can reach them at ${sanitizedAccepterEmail} or ${accepter.phoneNumber} to coordinate your next steps.\n\nBest,\nThe Trojan Marketplace Team`
                    ),
                    sendHandshakeEmail(
                        sanitizedAccepterEmail,
                        subject,
                        `Hi ${accepter.name},\n\nYou have successfully accepted the listing "${item.title}" for ${priceStr} from ${poster.name}.\n\nYou can reach them at ${posterEmail} or ${poster.phoneNumber} to coordinate your next steps.\n\nBest,\nThe Trojan Marketplace Team`
                    )
                ]);
                console.log("[EMAIL DEBUG] Handshake emails sent successfully.");
            }
        } catch (emailError) {
            console.error("[SERVER ACTION] Handshake email failed:", emailError);
        }

        return { success: true };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to accept listing:", error);
        return { success: false, error: error.message };
    }
}

export async function uploadProof(listingId: string, proofImageUrl: string) {
    try {
        const container = await getListingsContainer();
        const { resource: item } = await container.item(listingId, listingId).read();

        if (!item) return { success: false, error: "Listing not found" };

        item.proofImageUrl = proofImageUrl;
        item.aiVerificationStatus = "Pending";

        // --- Azure OpenAI Verification Logic ---
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_API_KEY;
        const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o";

        if (endpoint && apiKey) {
            try {
                const apiVersion = "2024-06-01"; // Newer stable version
                const fetchUrl = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;

                const promptPayload = {
                    messages: [
                        {
                            role: "system",
                            content: "You are a common-sense campus marketplace assistant. A student is proving they finished a task. If the image reasonably represents the result or progress of the task, mark it 'verified': true. Be permissive! For laundry, folded clothes are a pass. For food delivery, a photo of the food at a door is a pass. Only fail if the image is completely unrelated. Return ONLY a JSON object with 'verified' (boolean) and 'reason' (string, <20 words)."
                        },
                        {
                            role: "user",
                            content: [
                                { type: "text", text: `Verify if this image proves the task: "${item.title}". Task details: "${item.description || "No description"}".` },
                                { type: "image_url", image_url: { url: proofImageUrl } }
                            ]
                        }
                    ],
                    response_format: { type: "json_object" },
                    max_completion_tokens: 400
                };

                const aiRes = await fetch(fetchUrl, {
                    method: "POST",
                    headers: {
                        "api-key": apiKey,
                        "Authorization": `Bearer ${apiKey}`, // Some Foundry APIs prefer Bearer
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(promptPayload)
                });

                if (aiRes.ok) {
                    const aiData = await aiRes.json();
                    const aiContent = JSON.parse(aiData.choices[0].message.content);
                    item.aiVerificationStatus = aiContent.verified ? "Verified" : "Failed";
                    item.aiVerificationReason = aiContent.reason;
                } else {
                    console.error("[SERVER ACTION] AI Verification API error:", await aiRes.text());
                    item.aiVerificationStatus = "Failed";
                    item.aiVerificationReason = "AI service error. Manual review needed.";
                }

            } catch (aiErr) {
                console.error("[SERVER ACTION] Failed to call Azure OpenAI:", aiErr);
                item.aiVerificationStatus = "Failed";
                item.aiVerificationReason = "AI service unavailable. Manual review needed.";
            }
        } else {
            console.warn("[SERVER ACTION] Azure OpenAI credentials missing, skipping AI verification.");
            item.aiVerificationStatus = "Failed";
            item.aiVerificationReason = "AI Verification API keys missing.";
        }

        await container.item(listingId, listingId).replace(item);

        return { success: true };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to upload proof:", error);
        return { success: false, error: error.message };
    }
}

export async function completeListing(listingId: string) {
    try {
        const container = await getListingsContainer();
        const { resource: item } = await container.item(listingId, listingId).read();

        if (!item) return { success: false, error: "Listing not found" };

        item.status = "Completed";
        await container.item(listingId, listingId).replace(item);

        return { success: true };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to complete listing:", error);
        return { success: false, error: error.message };
    }
}
