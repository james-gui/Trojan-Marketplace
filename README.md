# ✌️ Trojan Marketplace (Web Frontend)

This is the main Next.js web application for the Trojan Marketplace project, built for the SEP Hackathon.

## ✨ Features

- **Order Book**: Real-time view of all open and accepted listings.
- **Task Management**: Create, accept, and complete tasks with integrated status updates.
- **Onboarding**: Multi-stage user registration and profile creation.
- **Cosmos DB Integration**: Direct interaction with NoSQL collections via Server Actions.
- **ACS Notifications**: Integrated email handshake logic using Azure Communication Services.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State/Logic**: [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- **Database**: [Azure Cosmos DB](https://azure.microsoft.com/en-us/products/cosmos-db/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) (Google Provider)
- **SMS/Email**: [Azure Communication Services](https://azure.microsoft.com/en-us/products/communication-services/) & [Twilio](https://www.twilio.com/)

## 🏗️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.local` and provide your credentials:

```bash
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
COSMOS_ENDPOINT=
COSMOS_KEY=
ACS_CONNECTION_STRING=
ACS_PHONE_NUMBER=
ACS_FROM_EMAIL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Directory Structure

- `src/app`: Page components and server actions.
- `src/components`: Reusable UI elements (Buttons, Modals, Cards).
- `src/lib`: Logic for database connection, email/SMS clients, and utility functions.
- `public`: Static assets (Logos, Icons).

---
Refer to the [Root README](../README.md) for full project architecture and system overview.
