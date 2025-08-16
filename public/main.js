// Use the SDK file you stored in your repo (no CDN, no CORS)
import * as sdk from "./vendor/client-sdk.mjs";

const videoEl  = document.getElementById("keilani");
const sendBtn  = document.getElementById("sendBtn");
const testBtn  = document.getElementById("testBtn");
const userText = document.getElementById("userText");
const statusEl = document.getElementById("status");

(async () => {
  try {
    // 1) Get public env (Agent ID + Client Key) from Netlify function
    const envRes = await fetch("/.netlify/functions/env");
    const { DID_AGENT_ID, DID_CLIENT_KEY } = await envRes.json();

    if (!DID_AGENT_ID || !DID_CLIENT_KEY) {
      statusEl.textContent = "Missing DID env vars. Check Netlify Site Settings → Environment variables.";
      console.error("Missing DID vars:", { DID_AGENT_ID, DID_CLIENT_KEY });
      return;
    }
    console.log("Env OK:", { DID_AGENT_ID, DID_CLIENT_KEY: DID_CLIENT_KEY.slice(0,6) + "…" });

    // 2) Auth + callbacks
    const auth = { type: "key", clientKey: DID_CLIENT_KEY };
    const callbacks = {
      onSrcObjectReady: (srcObject) => { videoEl.srcObject = srcObject; },
      onVideoStateChange: (s) => { console.log("video:", s); statusEl.textContent = `video: ${s}`; },
      onConnectionStateChange: (s) => { console.log("webrtc:", s); },
      onNewMessage: (messages, type) => { console.log("chat:", type, messages); },
      onError: (e) => { console.error("SDK error:", e); statusEl.textContent = "Error: " + (e?.message || e); },
    };

    // 3) Force TURN relay to survive strict NAT/firewalls (fixes many ICE issues)
    const rtcConfig = { iceTransportPolicy: "relay" };

    // 4) Create & connect the live stream to your D-ID Agent
    const agentManager = await sdk.createAgentManager(
      DID_AGENT_ID,
      { auth, callbacks, rtcConfig }
    );
    await agentManager.connect();

    // 5) Unmute when the user clicks the video (browser autoplay policy)
    videoEl.addEventListener("click", () => { videoEl.muted = false; });

    // 6) Test Speak: bypass backend to verify stream+voice quickly
    testBtn.onclick = async () => {
      try {
        statusEl.textContent = "Testing…";
        await agentManager.speak({ type: "text", input: "Hi co-bro, I am connected!" });
        statusEl.textContent = "Ready.";
      } catch (e) {
        console.error("Test speak failed:", e);
        statusEl.textContent = "Test speak failed. See console.";
      }
    };

    // 7) Send → ask our Netlify function (OpenAI) → speak reply
    sendBtn.onclick = async () => {
      const msg = userText.value.trim();
      if (!msg) return;
      statusEl.textContent = "Thinking…";

      try {
        const r = await fetch("/.netlify/functions/keilani-reply", {
          method: "POST",
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify({ user: msg })
        });

        if (!r.ok) {
          const t = await r.text();
          console.error("Function error:", t);
          statusEl.textContent = "Server error. Check OPENAI_API_KEY (Netlify env).";
          return;
        }

        const { text } = await r.json();
        console.log("Keilani says:", text);
        statusEl.textContent = "Speaking…";
        await agentManager.speak({ type: "text", input: text });
        statusEl.textContent = "Ready.";
      } catch (e) {
        console.error("Send flow failed:", e);
        statusEl.textContent = "Failed to speak. See console.";
      }
    };

  } catch (err) {
    console.error("Fatal init error:", err);
    statusEl.textContent = "Init failed. See console for details.";
  }
})();
