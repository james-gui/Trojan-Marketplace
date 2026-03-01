const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config({ path: ".env.local" });

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = "TrojanMarketDB";
const containerId = "Listings";

async function seed() {
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const listings = [
        {
            id: "fake-laundry-" + Date.now(),
            title: "Premium Laundry Service",
            description: "I will pick up your laundry, wash, dry, fold, and return it within 24 hours. Includes detergent and fabric softener.",
            price: 15.00,
            location: "USC Village",
            time: "Within 24 hours",
            category: "Services",
            type: "Offer",
            posterEmail: "tester@usc.edu",
            status: "Open",
            createdAt: new Date().toISOString()
        },
        {
            id: "fake-tutoring-" + Date.now(),
            title: "Python Tutoring Needed",
            description: "Looking for someone to help me debug my CS-310 project. Need someone familiar with NumPy and data visualizations.",
            price: 25.00,
            location: "Leavey Library",
            time: "Tonight at 8 PM",
            category: "Education",
            type: "Request",
            posterEmail: "tester@usc.edu",
            status: "Open",
            createdAt: new Date().toISOString()
        }
    ];

    console.log("Seeding fake listings...");
    for (const listing of listings) {
        try {
            await container.items.create(listing);
            console.log(`Created listing: ${listing.title}`);
        } catch (err) {
            console.error(`Failed to create ${listing.title}: ${err.message}`);
        }
    }
    console.log("Done!");
}

seed().catch(console.error);
