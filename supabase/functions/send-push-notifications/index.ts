import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing required environment variables");
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  try {
    // Ensure the request body is properly parsed
    const { record } = await req.json();
    if (!record || !record.title || !record.body) {
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
        }),
        {
          status: 400,
        }
      );
    }
    const title = record.title;
    const body = record.body;
    // Get all stored expo push tokens
    const { data: tokens, error } = await supabase
      .from("expo_tokens")
      .select("token");
    if (error) {
      console.error("Error fetching tokens:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch tokens",
        }),
        {
          status: 500,
        }
      );
    }
    if (!tokens || tokens.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No tokens found",
        }),
        {
          status: 404,
        }
      );
    }
    const notifications = tokens.map(({ token }) =>
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: token,
          sound: "default",
          title,
          body,
        }),
      })
    );
    await Promise.all(notifications);
    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error processing request:", err);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
      }
    );
  }
});

// supabase functions deploy send-push-notifications
