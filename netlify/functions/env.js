// netlify/functions/env.js
// Expose only SAFE public values for the front end.
export async function handler() {
  const { DID_AGENT_ID, DID_CLIENT_KEY } = process.env;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      DID_AGENT_ID: DID_AGENT_ID || "",
      DID_CLIENT_KEY: DID_CLIENT_KEY || ""
    })
  };
}
