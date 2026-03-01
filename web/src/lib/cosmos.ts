import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT || "";
const key = process.env.COSMOS_KEY || "";
const databaseId = "TrojanMarketDB";
const usersContainerId = "Users";
const listingsContainerId = "Listings";

// Prevent multiple instances of Cosmos client in development 
// which causes connection leaking in Next.js hot reloads.
const globalForCosmos = global as unknown as { cosmosClient?: CosmosClient };

export const cosmosClient =
    globalForCosmos.cosmosClient ||
    new CosmosClient({ endpoint, key });

if (process.env.NODE_ENV !== "production") {
    globalForCosmos.cosmosClient = cosmosClient;
}

export async function getDatabase() {
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseId });
    return database;
}

export async function getUsersContainer() {
    const db = await getDatabase();
    const { container } = await db.containers.createIfNotExists({
        id: usersContainerId,
        partitionKey: { paths: ["/id"] }
    });
    return container;
}

export async function getListingsContainer() {
    const db = await getDatabase();
    const { container } = await db.containers.createIfNotExists({
        id: listingsContainerId,
        partitionKey: { paths: ["/id"] }
    });
    return container;
}
