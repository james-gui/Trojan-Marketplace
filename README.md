# ✌️ Trojan Marketplace

**Scaling the campus economy with Escrow Credits and Vision AI verification.**

Trojan Marketplace is a localized service economy built exclusively for the USC community. It allows students to trade services—from laundry and moving help to coffee deliveries—using a secure, AI-orchestrated platform. 

## ✨ Key Features
- **Dual Marketplace**: Seamlessly toggle between offering your skills and requesting help.
- **Handshake Connection**: Instant email notifications connect buyers and sellers the moment a task is accepted.
- **Escrow Credit System**: Protects both parties by holding funds securely until the work is verified.
- **Vision AI Verification**: Powered by GPT-4o, our AI automatically analyzes proof-of-work images to verify task completion before releasing funds.
- **Trojan-Only Auth**: Restricted to `@usc.edu` domains to ensure a trusted, exclusive network.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Framer Motion (Animations), Vanilla CSS.
- **Database**: Azure Cosmos DB (SQL API) for globally scalable storage.
- **AI Core**: Azure OpenAI (GPT-4o Vision API) for intelligent proof verification.
- **Communications**: Azure Communication Services for P2P "Handshake" emails.
- **Authentication**: NextAuth.js with Google OAuth (USC Restricted).
- **Icons**: Lucide React.

## 🚀 Deployment Guide (Vercel)

Trojan Marketplace is optimized for deployment on Vercel. Follow these steps to get your own instance running:

### 1. Environment Variables
You must configure the following variables in your Vercel project dashboard:
- `AUTH_SECRET`: Generate with `npx auth secret`
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- `COSMOS_ENDPOINT`: Your Azure Cosmos DB URI
- `COSMOS_KEY`: Your Azure Cosmos DB Primary Key
- `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI Resource endpoint
- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API Key
- `AZURE_OPENAI_DEPLOYMENT_NAME`: The name of your GPT-4o model deployment
- `ACS_CONNECTION_STRING`: Azure Communication Services connection string
- `ACS_FROM_EMAIL`: Your verified sender email on ACS

### 2. Update OAuth Redirects
In your **Google Cloud Console**, update your OAuth 2.0 credentials to include:
- **Authorized JavaScript origins**: `https://your-app-name.vercel.app`
- **Authorized redirect URIs**: `https://your-app-name.vercel.app/api/auth/callback/google`

### 3. Database Setup
The application uses **Azure Cosmos DB**. Ensure you have two containers created in a database named `TrojanMarketDB`:
1. `Users` (Partition Key: `/id`)
2. `Listings` (Partition Key: `/id`)

## 🤝 Project Background
Built during the SEP Hackathon 2026. This project was born from the need for a standardized, secure platform for student gigs, moving away from disorganized group chats into a professional, AI-verified marketplace.

---
Built with ❤️ by Trojans, for Trojans. **Fight On!** ✌️
