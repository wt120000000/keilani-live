// public/main.js
import * as sdk from "https://esm.sh/@d-id/client-sdk@latest";

const videoEl = document.getElementById("keilani");
const sendBtn = document.getElementById("sendBtn");
const userText = document.getElementById("userText");
const statusEl = document.getElementById("status");

// 1) Fetch safe public env (Agent ID + Client Key)
const envRes = await fetch("/.netlify/functions/env");
const { DID_AGENT_ID, DID_CLIENT_KEY } = await envRes.json();

if (!DID_AGENT_ID || !DID_CLIENT_KEY) {
  statusEl.textContent = "Missing DID env vars. Check Netlify settings.";
  throw new Error("Missing DID_AGENT_ID or DID_CLIENT_KEY");
}

// 2) Set up D-ID auth + callbacks
const auth = { type: "key", clientKey: DID_CLIENT_KEY };

const callbacks = {
  onSrcObjectReady: (srcObject) => { videoEl.srcObject = srcObject; },
  onVideoStateChange: (s) => { console.log("video:", s); statusEl.textContent = `video: ${s}`; },
  onConnectionStateChange: (s) => { console.log("webrtc:", s); },
  onNewMessage: (messages, type) => { console.log("chat:", type, messages); },
  onError: (e) => { console.error(e); statusEl.textContent = "Error: " + (e?.message || e); },
};

// 3) Connect to your D-ID Agent’s live stream
const agentManager = await sdk.createAgentManager(DID_AGENT_ID, { auth, callbacks });
await agentManager.connect();

// 4) Allow unmute on user gesture (browser rule)
videoEl.addEventListener("click", () => { videoEl.muted = false; });

// 5) Send → ask server → speak
sendBtn.onclick = async () => {
  const msg = userText.value.trim();
  if (!msg) return;

  // Get Keilani's reply from your Netlify function (OpenAI on server)
  const r = await fetch("/.netlify/functions/keilani-reply", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ user: msg })
  });

  if (!r.ok) {
    statusEl.textContent = "Server error. Check OpenAI key/env.";
    console.error("Function error", await r.text());
    return;
  }

  const { text } = await r.json();
  console.log("Keilani says:", text);

  // Speak via D-ID (uses the Agent's baked-in voice)
  await agentManager.speak({ type: "text", input: text });
};
