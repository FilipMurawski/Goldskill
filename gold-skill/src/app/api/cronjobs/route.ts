import crypto from "crypto";
import { dailySubscriptionCheck } from "@/actions/dailySubscriptionCheck";


const cronjobActions: Record<string, () => Promise<void>> = {
    dailySubscriptionCheck,
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const headers = req.headers.get("Authorization")?.split(" ");
        const token = headers?.[1];
        const secret = process.env.CRONJOB_SECRET_KEY;

        if (!token || !secret) {
            return new Response("Unauthorized", { status: 401 });
        }

        // Validate the token using HMAC
        const isValidToken = crypto
            .createHmac("sha256", secret)
            .update(body.cronjob?.name || "")
            .digest("hex") === token;

        if (!isValidToken) {
            return new Response("Unauthorized", { status: 401 });
        }

        const cronjobName = body.cronjob?.name;
        if (!cronjobName) {
            return new Response("Bad Request: Missing cronjob name", { status: 400 });
        }

        const cronjobAction = cronjobActions[cronjobName];
        if (!cronjobAction) {
            return new Response("Cronjob not found", { status: 404 });
        }

        console.log(`Starting cronjob: ${cronjobName}`);
        await cronjobAction();
        console.log(`Cronjob ${cronjobName} executed successfully`);

        return new Response("Cronjob executed successfully", { status: 200 });
    } catch (error) {
        console.error("Error processing cronjob request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}