// public/main.js
// Requires: public/vendor/client-sdk.mjs  (copied from node_modules/@d-id/client-sdk/dist/index.js)
import * as DID from "./vendor/client-sdk.mjs";

// --- DEBUG: show what page actually has ---
console.log("[Keilani] main.js loaded");
console.log("[Keilani] Looking for DOM elements...");

const videoEl  = document.getElementById("keilani");
const sendBtn  = document.getElementById("sendBtn");
const testBtn  = document.getElementById("testBtn");
const userText = document.getElementById("userText");
const statusEl = document.getElementById("status");

// Defensive checks
if (!videoEl || !sendBtn || !testBtn || !userText || !statusEl) {
  console.error("[Keilani] Missing DOM elements", { videoEl, sendBtn, testBtn, userText, statusEl });
  alert("Page didn’t load expected elements. Hard-refresh (Ctrl+F5) and ensure Netlify is serving /public/index.html.");
  // Don’t proceed if DOM is incomplete
} else {
  console.log("[Keilani] DOM OK");

  (async () => {
    try {
      // 1) Fetch safe public env (Agent ID + Client Key) from Netlify function
      const envRes = await fetch("/.netlify/functions/env", { cache: "no-store" });
      const { DID_AGENT_ID, DID_CLIENT_KEY } = await envRes.json();

      if (!DID_AGENT_ID || !DID_CLIENT_KEY) {
        statusEl.textContent = "Missing DID vars. Set DID_AGENT_ID & DID_CLIENT_KEY in Netlify env.";
        console.error("Missing DID vars:", { DID_AGENT_ID, DID_CLIENT_KEY });
        return;
      }
      console.log("[Keilani] Env OK:", { DID_AGENT_ID, DID_CLIENT_KEY: DID_CLIENT_KEY.slice(0,6) + "…" });

      // 2) Auth + callbacks
      const auth = { type: "key", clientKey: DID_CLIENT_KEY };
      const callbacks = {
        onSrcObjectReady: (srcObject) => {
          console.log("[Keilani] onSrcObjectReady");
          // ultra-defensive: ensure element still exists
          const v = document.getElementById("keilani");
          if (v) v.srcObject = srcObject;
          else console.warn("[Keilani] video element vanished?");
        },
        onVideoStateChange: (s) => { 
          console.log("[Keilani] video:", s); 
          statusEl.textContent = `video: ${s}`; 
        },
        onConnectionStateChange: (s) => { console.log("[Keilani] webrtc:", s); },
        onNewMessage: (messages, type) => { console.log("[Keilani] chat:", type, messages); },
        onError: (e) => { 
          console.error("[Keilani] SDK error:", e); 
          statusEl.textContent = "Error: " + (e?.message || e); 
        },
      };

      // 3) Force TURN relay to survive strict NAT/VPN (fixes many ICE failures)
      const rtcConfig = { iceTransportPolicy: "relay" };

      // 4) Create & connect the live stream to your D-ID Agent
      const agentManager = await DID.createAgentManager(
        DID_AGENT_ID,
        { auth, callbacks, rtcConfig }
      );
      await agentManager.connect();

      // 5) Unmute on click (browser autoplay policy)
      videoEl.addEventListener("click", () => { videoEl.muted = false; });

      // 6) Test Speak: bypass backend to verify stream+voice quickly
      testBtn.onclick = async () => {
        try {
          statusEl.textContent = "Testing…";
          await agentManager.speak({ type: "text", input: "Hi co-bro, I am connected!" });
          statusEl.textContent = "Ready.";
        } catch (e) {
          console.error("[Keilani] Test speak failed:", e);
          statusEl.textContent = "Test speak failed. See console.";
        }
      };

      // 7) Send → Netlify function (OpenAI) → speak reply
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
            console.error("[Keilani] Function error:", t);
            statusEl.textContent = "Server error. Check OPENAI_API_KEY (Netlify env).";
            return;
          }

          const { text } = await r.json();
          console.log("[Keilani] Reply:", text);
          statusEl.textContent = "Speaking…";
          await agentManager.speak({ type: "text", input: text });
          statusEl.textContent = "Ready.";
        } catch (e) {
          console.error("[Keilani] Send flow failed:", e);
          statusEl.textContent = "Failed to speak. See console.";
        }
      };
    } catch (err) {
      console.error("[Keilani] Init error:", err);
      statusEl.textContent = "Init failed. See console.";
    }
  })();
}
