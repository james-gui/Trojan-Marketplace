import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const twilioNumber = process.env.TWILIO_PHONE_NUMBER || "";

// Prevents multiple instances in development
const globalForTwilio = global as unknown as { twilioClient?: twilio.Twilio };

export const twilioClient =
    globalForTwilio.twilioClient ||
    (accountSid && authToken ? twilio(accountSid, authToken) : null);

if (!globalForTwilio.twilioClient && twilioClient) {
    globalForTwilio.twilioClient = twilioClient;
}

/**
 * Sends an SMS message using Twilio.
 * @param to Phone number to send to (E.164 format)
 * @param message The text message content
 */
export async function sendNotification(to: string, message: string) {
    if (!twilioClient || !twilioNumber) {
        console.warn("[TWILIO] Credentials missing. Logged message:");
        console.log(`[TO: ${to}] ${message}`);
        return { success: false, error: "Twilio not configured" };
    }

    try {
        const result = await twilioClient.messages.create({
            body: message,
            from: twilioNumber,
            to: to
        });

        console.log(`[TWILIO] SMS Sent! SID: ${result.sid}`);
        return { success: true, sid: result.sid };
    } catch (error: any) {
        console.error("[TWILIO] Error sending SMS:", error);
        return { success: false, error: error.message };
    }
}
