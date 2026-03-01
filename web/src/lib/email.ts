import { EmailClient } from "@azure/communication-email";

const connectionString = (process.env.ACS_CONNECTION_STRING || "").trim();
const fromEmail = (process.env.ACS_FROM_EMAIL || "").trim();

// Prevents multiple instances in development
const globalForEmail = global as unknown as { emailClient?: EmailClient };

export const emailClient =
    globalForEmail.emailClient ||
    (connectionString ? new EmailClient(connectionString) : null);

if (!globalForEmail.emailClient && emailClient) {
    globalForEmail.emailClient = emailClient;
}

/**
 * Sends a handshake email between two users.
 */
export async function sendHandshakeEmail(
    toEmail: string,
    subject: string,
    content: string
) {
    if (!emailClient || !fromEmail) {
        console.warn("[EMAIL] ACS Email not configured. Logged content:");
        console.log(`[TO: ${toEmail}] ${subject}: ${content}`);
        return { success: false, error: "Email not configured" };
    }

    try {
        const poller = await emailClient.beginSend({
            senderAddress: fromEmail,
            content: {
                subject: subject,
                plainText: content,
            },
            recipients: {
                to: [{ address: toEmail }],
            },
        });

        const result = await poller.pollUntilDone();
        console.log(`[EMAIL] Sent to ${toEmail}. Status: ${result.status}`);
        return { success: true, id: result.id };
    } catch (error: any) {
        console.error("[EMAIL] Error sending email:", error);
        return { success: false, error: error.message };
    }
}
