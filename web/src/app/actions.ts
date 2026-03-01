"use server";

import { getListingsContainer } from "@/lib/cosmos";

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
}

export async function createListing(data: ListingPayload) {
    try {
        const container = await getListingsContainer();
        const listingId = Math.random().toString(36).substr(2, 9);

        // Create the document
        const document = {
            id: listingId,
            ...data,
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
            query: "SELECT * FROM c WHERE c.posterEmail = @email ORDER BY c.createdAt DESC",
            parameters: [{ name: "@email", value: email }]
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
            query: "SELECT * FROM c WHERE c.accepterEmail = @email ORDER BY c.createdAt DESC",
            parameters: [{ name: "@email", value: email }]
        };
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return { success: true, data: items };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to fetch accepted listings:", error);
        return { success: false, error: error.message };
    }
}

export async function acceptListing(listingId: string, accepterEmail: string) {
    try {
        const container = await getListingsContainer();

        // In a real app, we'd first read the listing to ensure it exists and is "Open"
        // For this hackathon scope, we'll try to do a targeted patch operation if supported,
        // or just a read-modify-write.

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
        item.accepterEmail = accepterEmail;
        item.acceptedAt = new Date().toISOString();

        await container.item(listingId, listingId).replace(item);

        return { success: true };
    } catch (error: any) {
        console.error("[SERVER ACTION] Failed to accept listing:", error);
        return { success: false, error: error.message };
    }
}
