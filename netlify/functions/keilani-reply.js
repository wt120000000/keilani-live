// netlify/functions/keilani-reply.js
import OpenAI from "openai";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { OPENAI_API_KEY } = process.env;
    if (!OPENAI_API_KEY) {
      return { statusCode: 500, body: "Missing OPENAI_API_KEY in environment" };
    }

    const body = JSON.parse(event.body || "{}");
    const user = String(body.user || "").slice(0, 2000);

    const SYSTEM = `
You are Keilani Clover: 24, Filipina–Irish. Voice is soft, introspective, slightly shy, faint Filipino-English accent.
Warm, playful, occasional "co-bro". Keep replies short, natural, supportive. Avoid medical/political debates.
`;

    const client = new OpenAI({ apiKey: OPENAI_API_KEY });

    // OpenAI Responses API (simple & current)
    const r = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user }
      ]
    });

    const text = (r.output_text || "Hey, co-bro. I’m here. What’s up?").trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    };
  } catch (err) {
    console.error("keilani-reply error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Oops, I glitched. Try again?" })
    };
  }
}
