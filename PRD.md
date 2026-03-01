# Product Requirements Document: TrojanTasker

**Target Environment:** 24-Hour Hackathon Build  
**Platform:** Next.js Web App (Discovery) + SMS (Execution)  
**Version:** 2.0  

## 1. Product Overview & Vision
TrojanTasker is an AI-orchestrated, hyper-local gig economy platform designed exclusively for university campuses. 

Current peer-to-peer service apps suffer from high friction: users must download heavy apps, fill out complex onboarding forms, and manually coordinate payments. TrojanTasker eliminates this friction by utilizing a **"Text-to-Task" interface** and an **autonomous AI mediator**. 

Users simply post what they need using natural language on a public web board. Once a task is accepted, the system leverages SMS to broker the connection, hold a simulated deposit in escrow, and use computer vision to verify the completed work before releasing funds. The product acts less like a software application and more like an automated campus concierge.

## 2. Target Audience
The platform serves a dual-sided marketplace within a closed university ecosystem:

* **The Buyer (The Overwhelmed Student):** Students who are cash/credit-rich but time-poor. They are studying for finals, sick in their dorm, or simply want to outsource minor inconveniences. 
* **The Tasker (The Campus Hustler):** Students looking for highly flexible, immediate micro-gigs to earn spending money or platform credits without committing to a formal part-time job.

## 3. Core Use Cases
* **Late-Night Food Runs:** "I need someone to grab a burrito from the dining hall and bring it to Leavey Library."
* **Laundry Emergencies:** "I'll pay 15 credits for someone to switch my laundry to the dryer in Birnkrant and fold it."
* **Space Holding:** "Need someone to hold a study room in the Marshall building for the next hour."
* **Micro-Chores:** "Paying $5 for someone to take my dorm trash out to the dumpster."

---

## 4. Technical Architecture & Stack



The system utilizes a hybrid serverless architecture to ensure rapid deployment and high reliability.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **Next.js + Tailwind CSS (Vercel)** | Hosts the real-time "Order Book" dashboard. Extremely fast read/write for task discovery. |
| **Backend API** | **Azure Functions (Python)** | Event-driven microservices that handle business logic, payment routing, and API integrations. |
| **Database** | **Azure Cosmos DB** | NoSQL storage for active tasks, user phone numbers, and virtual wallet balances. |
| **Messaging** | **Azure Communication Services (ACS)** | Provisions the virtual phone number and handles outbound/inbound SMS routing. |
| **Event Routing** | **Azure Event Grid** | Catches incoming texts from ACS and securely triggers the Azure Functions webhooks. |
| **Intelligence** | **Gemini 3.1 Pro API** | Multimodal AI used for NLP extraction (turning user text into JSON) and Vision verification (analyzing proof-of-work photos). |

---

## 5. System Execution Flow (The State Machine)



### State 1: Task Creation (`OPEN`)
1. Buyer types a natural language request on the Next.js web app.
2. The UI calls the `createTask` API.
3. The Azure Function uses the Gemini API to extract intent (Task, Category, Location, Price) into a structured JSON object.
4. The task is saved to Cosmos DB with the status `OPEN` and appears on the public board.
5. **Targeted Broadcast:** The system checks the task's extracted `Category` and sends an SMS alert to Taskers who have subscribed to that specific service type.

### State 2: The Handshake (`PENDING_DEPOSIT`)
1. A Tasker sees the listing on the web dashboard (or via the SMS broadcast) and clicks "Accept" (or replies via SMS).
2. The UI calls the `acceptTask` API.
3. Cosmos DB updates the status to `PENDING_DEPOSIT`.
4. ACS texts the Buyer: *"Match found! Reply YES to deposit [10% of price] credits and lock this in."*
5. **Timeout:** If the Buyer does not reply "YES" within 12 hours, the task automatically reverts to `OPEN` status so other Taskers can accept it.

### State 3: Execution (`IN_PROGRESS`)
1. Buyer texts "YES" back to the ACS number.
2. Event Grid routes the text to the `smsWebhook` API.
3. The logic deducts the 10% deposit from the Buyer's virtual wallet and changes the status to `IN_PROGRESS`.
4. ACS texts the Tasker: *"Deposit secured. Begin task. Text a photo here when done."*
5. **Relay Mode:** For the duration of this state, ACS acts as a blind relay. Any text sent by the Buyer is forwarded to the Tasker, and vice versa, keeping their real phone numbers entirely private.

### State 4: Verification & Payout (`COMPLETED`)
1. The Tasker texts an MMS (photo) of the completed chore to the ACS number.
2. Event Grid routes the image payload to the Azure Function.
3. The Function passes the image to Gemini 3.1 Pro Vision for validation against the original task description.
4. **If Verified:** The status changes to `COMPLETED`. The remaining 90% is transferred to the Tasker's wallet. Both users receive an SMS receipt.
5. **If Failed:** ACS texts the Tasker: *"Verification failed: [AI-generated reason]. Please send a clearer photo of the completed work."*
6. **Manual Fallback:** If the AI verification fails multiple times, the submitted photo is forwarded to the Buyer via SMS. The Buyer can manually reply "APPROVE" to bypass the AI and release the funds to the Tasker.

---

## 6. Database Schema (Azure Cosmos DB)

### `Users` Collection
*Partition Key: `/phone_number`*
```json
{
  "id": "uuid-string",
  "phone_number": "+1234567890",
  "wallet_balance": 100.00,
  "subscribed_categories": ["food_delivery", "laundry", "space_holding"],
  "created_at": "ISO-8601-timestamp"
}
```
*Note: A dummy checkout flow (e.g., Stripe test mode) will be used to initialize or add to the `wallet_balance`.*
Tasks Collection
Partition Key: /status
{
  "id": "uuid-string",
  "buyer_phone": "+1234567890",
  "seller_phone": "+0987654321", 
  "status": "OPEN", 
  "raw_text": "Need someone to grab my laundry from Birnkrant for $10",
  "parsed_data": {
    "task_name": "Laundry Pickup",
    "category": "laundry",
    "location": "Birnkrant",
    "price": 10.00
  },
  "created_at": "ISO-8601-timestamp",
  "updated_at": "ISO-8601-timestamp"
}
7. API Endpoint Contracts (Azure Functions)
7.1 POST /api/createTask
Input: {"phone_number": "+1...", "raw_text": "..."}

Action: Calls Gemini to structure the raw_text, inserts a new document into Cosmos DB.

Output: 200 OK, {"task_id": "...", "parsed_data": {...}}

7.2 POST /api/acceptTask
Input: {"task_id": "...", "seller_phone": "+1..."}

Action: Updates Cosmos DB task status, triggers ACS to send the SMS handshake to the Buyer.

Output: 200 OK

7.3 POST /api/smsWebhook (Event Grid Trigger)
Input: Event Grid JSON schema (contains sender phone, recipient phone, and text/MMS payload).

Action: * Checks active task status for the sender's phone number.

Parses text ("YES" triggers deposit logic).

Parses MMS (Triggers Gemini Vision API).

Routes standard text to counterparty (Relay Mode).

Output: 200 OK (Acknowledges receipt to Event Grid).