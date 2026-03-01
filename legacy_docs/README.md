# ✌️ Trojan Marketplace (TrojanTasker)

Trojan Marketplace is an AI-orchestrated, hyper-local gig economy platform designed exclusively for university campuses. It eliminates the friction of traditional peer-to-peer service apps by utilizing a **"Text-to-Task" interface** and an **autonomous AI mediator**.

Users post what they need using natural language on a public web board. Once a task is accepted, the system leverages SMS to broker the connection, handles simulated deposits in escrow, and uses computer vision to verify completed work before releasing funds.

## 🏗️ Architecture & Tech Stack

The system utilizes a hybrid serverless architecture to ensure rapid deployment and high reliability.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **Next.js 15 + Tailwind CSS 4** | Hosts the real-time "Order Book" dashboard with high read/write performance. |
| **Backend API** | **Next.js Server Actions** | Handles business logic, database mutations, and integration calls. |
| **Database** | **Azure Cosmos DB** | NoSQL storage for active listings, user profiles, and transaction history. |
| **Messaging** | **Azure Communication Services (ACS)** | Provisions virtual identifiers and handles email notifications. |
| **SMS** | **Twilio / Azure ACS** | Multi-provider support for SMS routing and tasker notifications. |
| **Intelligence** | **Gemini 1.5 Pro API** | Multimodal AI used for NLP extraction and Vision verification (proof-of-work). |

## 📁 Repository Structure

```text
.
├── web/                           # Main Next.js Web Application
│   ├── src/app/                   # Next.js App Router (Dashboard, Login, Listings)
│   ├── src/components/            # Reusable UI Components (Shadcn UI)
│   └── src/lib/                   # Shared Utilities (Cosmos, Email, SMS)
├── landingpage/                   # Marketing Landing Page (Vite + React)
├── onboarding_trojanmarketplace/  # Specialized Onboarding Flow (Vite + React)
├── figmaui/                       # Exported UI designs and assets
└── PRD.md                         # Product Requirements Document
```

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js 20+**
- **Azure Account** (Cosmos DB, Communication Services)
- **Google Cloud Console** (for NextAuth Google Login)
- **Twilio Account** (optional, for SMS fallback)

### 2. Environment Setup

Copy `.env.example` to `.env.local` in the `web/` directory and configure the following:

```bash
# Auth
AUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Azure Cosmos DB
COSMOS_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
COSMOS_KEY=your_cosmos_primary_key

# Azure Communication Services (Email)
ACS_CONNECTION_STRING="your_acs_connection_string"
ACS_FROM_EMAIL="DoNotReply@your-verified-domain.com"

# Twilio (SMS)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

### 3. Installation

```bash
# Install dependencies for the main web app
cd web
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

## ✨ Key Features

- **Text-to-Task Interface**: Post jobs using natural language (e.g., "Need someone to grab my laundry from Birnkrant for $10").
- **AI Intent Extraction**: Gemini NLP automatically parses requests into structured tasks (Category, Location, Price).
- **Secure Escrow**: Deposits are held virtually and released only upon verification.
- **Proof-of-Work Vision**: AI-powered photo verification ensures tasks are completed as described.
- **Privacy-First Messaging**: Real phone numbers are kept private through automated relay systems.

## 🤝 Contributing

1. Review the [PRD.md](./PRD.md) for full system specifications.
2. Follow the established coding standards in the `web/src` directory.
3. Ensure all environment variables are correctly configured before testing.

---
Built with ❤️ during the SEP Hackathon.
