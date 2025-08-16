// public/main.js
// Fix B: external module file + run after DOM is ready.
// Requires: public/vendor/client-sdk.mjs (copied from node_modules/@d-id/client-sdk/dist/index.js)

import * as DID from "./vendor/client-sdk.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const videoEl  = document.getElementById("keilani");
  const sendBtn  = document.getElementById("sendBtn");
  const testBtn  = document.getElementById("testBtn");
  const userText = document.getElementById("userText");
  const statusEl = document.getElementById("status");

  (async () => {
    try {
      // 1) Fetch safe public env (Agent ID + Client Key) from Netlify function
      const envRes = await fetch("/.netlify/functions/env");
      const { DID_AGENT_ID, DID_CLIENT_KEY } = await envRes.json();

      if (!DID_AGENT_ID || !DID_CLIENT_KEY) {
        statusEl.textContent = "Missing DID vars. Set DID_AGENT_ID & DID_CLIENT_KEY in Netlify env.";
        console.error("Missing DID vars:", { DID_AGENT_ID, DID_CLIENT_KEY });
        return;
      }
      console.log("Env OK:", { DID_AGENT_ID, DID_CLIENT_KEY: DID_CLIENT_KEY.slice(0,6) + "…" });

      // 2) Auth + callbacks
      const auth = { type: "key", clientKey: DID_CLIENT_KEY };
      const callbacks = {
        onSrcObjectReady: (srcObject) => { 
          if (videoEl) videoEl.srcObject = srcObject; 
        },
        onVideoStateChange: (s) => { 
          console.log("video:", s); 
          if (statusEl) statusEl.textContent = `video: ${s}`; 
        },
        onConnectionStateChange: (s) => { console.log("webrtc:", s); },
        onNewMessage: (messages, type) => { console.log("chat:", type, messages); },
        onError: (e) => { 
          console.error("SDK error:", e); 
          if (statusEl) statusEl.textContent = "Error: " + (e?.message || e); 
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

      // 5) Unmute when the user clicks the video (browser autoplay policy)
      if (videoEl) {
        videoEl.addEventListener("click", () => { videoEl.muted = false; });
      }

      // 6) Test Speak: bypass backend to verify stream+voice quickly
      if (testBtn) {
        testBtn.onclick = async () => {
          try {
            if (statusEl) statusEl.textContent = "Testing…";
            await agentManager.speak({ type: "text", input: "Hi co-bro, I am connected!" });
            if (statusEl) statusEl.textContent = "Ready.";
          } catch (e) {
            console.error("Test speak failed:", e);
            if (statusEl) statusEl.textContent = "Test speak failed. See console.";
          }
        };
      }

      // 7) Send → Netlify function (OpenAI) → speak reply
      if (sendBtn) {
        sendBtn.onclick = async () => {
          const msg = (userText?.value || "").trim();
          if (!msg) return;

          if (statusEl) statusEl.textContent = "Thinking…";

          try {
            const r = await fetch("/.netlify/functions/keilani-reply", {
              method: "POST",
              headers: { "Content-Type":"application/json" },
              body: JSON.stringify({ user: msg })
            });

            if (!r.ok) {
              const t = await r.text();
              console.error("Function error:", t);
              if (statusEl) statusEl.textContent = "Server error. Check OPENAI_API_KEY (Netlify env).";
              return;
            }

            const { text } = await r.json();
            console.log("Keilani says:", text);
            if (statusEl) statusEl.textContent = "Speaking…";
            await agentManager.speak({ type: "text", input: text });
            if (statusEl) statusEl.textContent = "Ready.";
          } catch (e) {
            console.error("Send flow failed:", e);
            if (statusEl) statusEl.textContent = "Failed to speak. See console.";
          }
        };
      }
    } catch (err) {
      console.error("Init error:", err);
      if (statusEl) statusEl.textContent = "Init failed. See console.";
    }
  })();
});
