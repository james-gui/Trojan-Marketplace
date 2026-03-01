const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config({ path: ".env.local" });

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = "TrojanMarketDB";
const containerId = "Listings";

async function findAndAccept() {
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const { resources: items } = await container.items.readAll().fetchAll();

    for (const item of items) {
        if (item.title && item.title.toLowerCase().includes("jker")) {
            console.log(`Found item: ${item.title}`);
            item.status = "Accepted";
            item.accepterEmail = "tester2@usc.edu"; // fake accepter
            item.acceptedAt = new Date().toISOString();
            await container.item(item.id, item.id).replace(item);
            console.log("Updated to Accepted!");
        }
    }
}

findAndAccept().catch(console.error);
