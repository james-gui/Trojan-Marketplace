import { SmsClient } from "@azure/communication-sms";

const connectionString = (process.env.ACS_CONNECTION_STRING || "").trim();
const acsPhoneNumber = (process.env.ACS_PHONE_NUMBER || "").trim();

// Prevents multiple instances in development
const globalForSms = global as unknown as { smsClient?: SmsClient };

console.log(`[SMS INIT] Connection string present: ${!!connectionString}, Length: ${connectionString.length}, Ends with: ...${connectionString.slice(-4)}`);
console.log(`[SMS INIT] Phone number: ${acsPhoneNumber}`);

export const smsClient =
    globalForSms.smsClient ||
    (connectionString ? new SmsClient(connectionString) : null);

if (!smsClient) {
    console.error("[SMS INIT] Failed to initialize SmsClient - Connection string likely empty.");
}

/**
 * Sends an SMS message using Azure Communication Services.
 * @param to Phone number to send to (must be in E.164 format, e.g., +18005551234)
 * @param message The text message content
 */
export async function sendNotification(to: string, message: string) {
    if (!smsClient || !acsPhoneNumber) {
        console.warn("[SMS] ACS credentials missing. Mocking SMS sending...");
        console.log(`[SMS To: ${to}] ${message}`);
        return { success: false, error: "ACS credentials not configured" };
    }

    try {
        const sendResults = await smsClient.send({
            from: acsPhoneNumber,
            to: [to],
            message: message
        });

        const result = sendResults[0];
        if (result.successful) {
            console.log(`[SMS] Successfully sent message to ${to}. MessageId: ${result.messageId}`);
            return { success: true, messageId: result.messageId };
        } else {
            console.error(`[SMS] Failed to send message to ${to}: ${result.errorMessage}`);
            return { success: false, error: result.errorMessage };
        }
    } catch (e: any) {
        console.error("[SMS] Exception when sending SMS:", e);
        return { success: false, error: e.message };
    }
}
