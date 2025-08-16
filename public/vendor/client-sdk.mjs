var ve = Object.defineProperty;
var ke = (e, t, n) => t in e ? ve(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Q = (e, t, n) => (ke(e, typeof t != "symbol" ? t + "" : t, n), n);
class G extends Error {
  constructor({
    kind: n,
    description: r,
    error: o
  }) {
    super(JSON.stringify({
      kind: n,
      description: r
    }));
    Q(this, "kind");
    Q(this, "description");
    Q(this, "error");
    this.kind = n, this.description = r, this.error = o;
  }
}
class De extends G {
  constructor(t, n) {
    super({
      kind: "ChatCreationFailed",
      description: `Failed to create ${n ? "persistent" : ""} chat, mode: ${t}`
    });
  }
}
class Ce extends G {
  constructor(t) {
    super({
      kind: "ChatModeDowngraded",
      description: `Chat mode downgraded to ${t}`
    });
  }
}
class H extends G {
  constructor(n, r) {
    super({
      kind: "ValidationError",
      description: n
    });
    Q(this, "key");
    this.key = r;
  }
}
class Re extends G {
  constructor(t) {
    super({
      kind: "WSError",
      description: t
    });
  }
}
var Se = /* @__PURE__ */ ((e) => (e.TRIAL = "trial", e.BASIC = "basic", e.ENTERPRISE = "enterprise", e.LITE = "lite", e.ADVANCED = "advanced", e))(Se || {}), Ie = /* @__PURE__ */ ((e) => (e.TRIAL = "deid-trial", e.PRO = "deid-pro", e.ENTERPRISE = "deid-enterprise", e.LITE = "deid-lite", e.ADVANCED = "deid-advanced", e.BUILD = "deid-api-build", e.LAUNCH = "deid-api-launch", e.SCALE = "deid-api-scale", e))(Ie || {}), _e = /* @__PURE__ */ ((e) => (e.Created = "created", e.Started = "started", e.Done = "done", e.Error = "error", e.Rejected = "rejected", e.Ready = "ready", e))(_e || {}), Ee = /* @__PURE__ */ ((e) => (e.Unrated = "Unrated", e.Positive = "Positive", e.Negative = "Negative", e))(Ee || {}), M = /* @__PURE__ */ ((e) => (e.Functional = "Functional", e.TextOnly = "TextOnly", e.Maintenance = "Maintenance", e.Playground = "Playground", e.DirectPlayback = "DirectPlayback", e.Off = "Off", e))(M || {}), q = /* @__PURE__ */ ((e) => (e.Embed = "embed", e.Query = "query", e.Partial = "partial", e.Answer = "answer", e.Complete = "done", e))(q || {}), Me = /* @__PURE__ */ ((e) => (e.KnowledgeProcessing = "knowledge/processing", e.KnowledgeIndexing = "knowledge/indexing", e.KnowledgeFailed = "knowledge/error", e.KnowledgeDone = "knowledge/done", e))(Me || {}), Te = /* @__PURE__ */ ((e) => (e.Knowledge = "knowledge", e.Document = "document", e.Record = "record", e))(Te || {}), je = /* @__PURE__ */ ((e) => (e.Pdf = "pdf", e.Text = "text", e.Html = "html", e.Word = "word", e.Json = "json", e.Markdown = "markdown", e.Csv = "csv", e.Excel = "excel", e.Powerpoint = "powerpoint", e.Archive = "archive", e.Image = "image", e.Audio = "audio", e.Video = "video", e))(je || {}), ce = /* @__PURE__ */ ((e) => (e.Clip = "clip", e.Talk = "talk", e))(ce || {});
const be = (e) => {
  switch (e) {
    case "clip":
      return "clip";
    case "talk":
      return "talk";
    default:
      throw new Error(`Unknown video type: ${e}`);
  }
};
var h = /* @__PURE__ */ ((e) => (e.Start = "START", e.Stop = "STOP", e))(h || {}), O = /* @__PURE__ */ ((e) => (e.Strong = "STRONG", e.Weak = "WEAK", e.Unknown = "UNKNOWN", e))(O || {}), X = /* @__PURE__ */ ((e) => (e.Idle = "IDLE", e.Talking = "TALKING", e))(X || {}), j = /* @__PURE__ */ ((e) => (e.ChatAnswer = "chat/answer", e.ChatPartial = "chat/partial", e.StreamDone = "stream/done", e.StreamStarted = "stream/started", e.StreamFailed = "stream/error", e.StreamReady = "stream/ready", e.StreamCreated = "stream/created", e.StreamInterrupt = "stream/interrupt", e.StreamVideoCreated = "stream-video/started", e.StreamVideoDone = "stream-video/done", e.StreamVideoError = "stream-video/error", e.StreamVideoRejected = "stream-video/rejected", e))(j || {}), I = /* @__PURE__ */ ((e) => (e.New = "new", e.Fail = "fail", e.Connected = "connected", e.Connecting = "connecting", e.Closed = "closed", e.Completed = "completed", e.Disconnected = "disconnected", e))(I || {}), W = /* @__PURE__ */ ((e) => (e.Legacy = "legacy", e.Fluent = "fluent", e))(W || {}), Ae = /* @__PURE__ */ ((e) => (e.Amazon = "amazon", e.Microsoft = "microsoft", e.Afflorithmics = "afflorithmics", e.Elevenlabs = "elevenlabs", e))(Ae || {}), Pe = /* @__PURE__ */ ((e) => (e.Public = "public", e.Premium = "premium", e.Private = "private", e))(Pe || {});
const $e = 45 * 1e3, Be = "X-Playground-Chat", Z = "https://api.d-id.com", Le = "wss://notifications.d-id.com", ze = "79f81a83a67430be2bc0fd61042b8faa", de = (e) => new Promise((t) => setTimeout(t, e)), V = (e = 16) => {
  const t = new Uint8Array(e);
  return window.crypto.getRandomValues(t), Array.from(t, (n) => n.toString(16).padStart(2, "0")).join("").slice(0, 13);
}, Ne = (e) => [M.TextOnly, M.Playground, M.Maintenance].includes(e), le = (e) => e && [M.DirectPlayback, M.Off].includes(e);
function xe(e, t) {
  let n;
  return {
    promise: new Promise((o, i) => {
      n = setTimeout(() => i(new Error(t)), e);
    }),
    clear: () => clearTimeout(n)
  };
}
async function te(e, t) {
  const n = {
    limit: (t == null ? void 0 : t.limit) ?? 3,
    delayMs: (t == null ? void 0 : t.delayMs) ?? 0,
    timeout: (t == null ? void 0 : t.timeout) ?? 3e4,
    timeoutErrorMessage: (t == null ? void 0 : t.timeoutErrorMessage) || "Timeout error",
    shouldRetryFn: (t == null ? void 0 : t.shouldRetryFn) ?? (() => !0),
    onRetry: (t == null ? void 0 : t.onRetry) ?? (() => {
    })
  };
  let r;
  for (let o = 1; o <= n.limit; o++)
    try {
      if (!n.timeout)
        return await e();
      const {
        promise: i,
        clear: c
      } = xe(n.timeout, n.timeoutErrorMessage), a = e().finally(c);
      return await Promise.race([a, i]);
    } catch (i) {
      if (r = i, !n.shouldRetryFn(i) || o >= n.limit)
        throw i;
      await de(n.delayMs), n.onRetry(i);
    }
  throw r;
}
function ue() {
  let e = window.localStorage.getItem("did_external_key_id");
  if (!e) {
    let t = V();
    window.localStorage.setItem("did_external_key_id", t), e = t;
  }
  return e;
}
let Fe = V();
function me(e) {
  if (e.type === "bearer")
    return `Bearer ${e.token}`;
  if (e.type === "basic")
    return `Basic ${btoa(`${e.username}:${e.password}`)}`;
  if (e.type === "key")
    return `Client-Key ${e.clientKey}.${ue()}_${Fe}`;
  throw new Error(`Unknown auth type: ${e}`);
}
const Je = (e) => te(e, {
  limit: 3,
  delayMs: 1e3,
  timeout: 0,
  shouldRetryFn: (t) => t.status === 429
});
function ae(e, t = Z, n) {
  const r = async (o, i) => {
    const {
      skipErrorHandler: c,
      ...a
    } = i || {}, s = await Je(() => fetch(t + (o != null && o.startsWith("/") ? o : `/${o}`), {
      ...a,
      headers: {
        ...a.headers,
        Authorization: me(e),
        "Content-Type": "application/json"
      }
    }));
    if (!s.ok) {
      let l = await s.text().catch(() => `Failed to fetch with status ${s.status}`);
      const d = new Error(l);
      throw n && !c && n(d, {
        url: o,
        options: a,
        headers: s.headers
      }), d;
    }
    return s.json();
  };
  return {
    get(o, i) {
      return r(o, {
        ...i,
        method: "GET"
      });
    },
    post(o, i, c) {
      return r(o, {
        ...c,
        body: JSON.stringify(i),
        method: "POST"
      });
    },
    delete(o, i, c) {
      return r(o, {
        ...c,
        body: JSON.stringify(i),
        method: "DELETE"
      });
    },
    patch(o, i, c) {
      return r(o, {
        ...c,
        body: JSON.stringify(i),
        method: "PATCH"
      });
    }
  };
}
function fe(e, t = Z, n) {
  const r = ae(e, `${t}/agents`, n);
  return {
    create(o, i) {
      return r.post("/", o, i);
    },
    getAgents(o, i) {
      return r.get(`/${o ? `?tag=${o}` : ""}`, i).then((c) => c ?? []);
    },
    getById(o, i) {
      return r.get(`/${o}`, i);
    },
    delete(o, i) {
      return r.delete(`/${o}`, void 0, i);
    },
    update(o, i, c) {
      return r.patch(`/${o}`, i, c);
    },
    newChat(o, i, c) {
      return r.post(`/${o}/chat`, i, c);
    },
    chat(o, i, c, a) {
      return r.post(`/${o}/chat/${i}`, c, a);
    },
    createRating(o, i, c, a) {
      return r.post(`/${o}/chat/${i}/ratings`, c, a);
    },
    updateRating(o, i, c, a, s) {
      return r.patch(`/${o}/chat/${i}/ratings/${c}`, a, s);
    },
    deleteRating(o, i, c, a) {
      return r.delete(`/${o}/chat/${i}/ratings/${c}`, a);
    },
    getSTTToken(o, i) {
      return r.get(`/${o}/stt-token`, i);
    }
  };
}
const ge = (e) => e.type === "clip" && e.presenter_id.startsWith("v2_") ? "clip_v2" : e.type;
function We(e) {
  var o, i, c, a;
  const t = () => /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop", n = () => {
    const s = navigator.platform;
    return s.toLowerCase().includes("win") ? "Windows" : s.toLowerCase().includes("mac") ? "Mac OS X" : s.toLowerCase().includes("linux") ? "Linux" : "Unknown";
  }, r = e.presenter;
  return {
    $os: `${n()}`,
    isMobile: `${t() == "Mobile"}`,
    browser: navigator.userAgent,
    origin: window.location.origin,
    agentType: ge(r),
    agentVoice: {
      voiceId: (i = (o = e.presenter) == null ? void 0 : o.voice) == null ? void 0 : i.voice_id,
      provider: (a = (c = e.presenter) == null ? void 0 : c.voice) == null ? void 0 : a.type
    }
  };
}
function Ue(e) {
  var n, r, o, i, c, a;
  const t = (n = e.llm) == null ? void 0 : n.prompt_customization;
  return {
    agentType: ge(e.presenter),
    owner_id: e.owner_id ?? "",
    promptVersion: (r = e.llm) == null ? void 0 : r.prompt_version,
    behavior: {
      role: t == null ? void 0 : t.role,
      personality: t == null ? void 0 : t.personality,
      instructions: (o = e.llm) == null ? void 0 : o.instructions
    },
    temperature: (i = e.llm) == null ? void 0 : i.temperature,
    knowledgeSource: t == null ? void 0 : t.knowledge_source,
    starterQuestionsCount: (a = (c = e.knowledge) == null ? void 0 : c.starter_message) == null ? void 0 : a.length,
    topicsToAvoid: t == null ? void 0 : t.topics_to_avoid,
    maxResponseLength: t == null ? void 0 : t.max_response_length
  };
}
const Ke = (e) => e.reduce((t, n) => t + n, 0), ie = (e) => Ke(e) / e.length;
function He(e, t, n) {
  var s, l, d;
  const {
    event: r,
    ...o
  } = e, {
    template: i
  } = (t == null ? void 0 : t.llm) || {}, {
    language: c
  } = ((s = t == null ? void 0 : t.presenter) == null ? void 0 : s.voice) || {};
  return {
    ...o,
    llm: {
      ...o.llm,
      template: i
    },
    script: {
      ...o.script,
      provider: {
        ...(l = o == null ? void 0 : o.script) == null ? void 0 : l.provider,
        language: c
      }
    },
    stitch: (t == null ? void 0 : t.presenter.type) === "talk" ? (d = t == null ? void 0 : t.presenter) == null ? void 0 : d.stitch : void 0,
    ...n
  };
}
let ee = {};
const qe = "https://api-js.mixpanel.com/track/?verbose=1&ip=1";
function Ve(e) {
  const t = window != null && window.hasOwnProperty("DID_AGENTS_API") ? "agents-ui" : "agents-sdk";
  return {
    token: e.token || "testKey",
    distinct_id: e.distinctId || ue(),
    agentId: e.agentId,
    additionalProperties: {},
    isEnabled: e.isEnabled ?? !0,
    getRandom: V,
    enrich(n) {
      this.additionalProperties = {
        ...this.additionalProperties,
        ...n
      };
    },
    async track(n, r) {
      if (!this.isEnabled)
        return Promise.resolve();
      const {
        audioPath: o,
        ...i
      } = r || {}, c = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          data: JSON.stringify([{
            event: n,
            properties: {
              ...this.additionalProperties,
              ...i,
              agentId: this.agentId,
              source: t,
              time: Date.now(),
              $insert_id: this.getRandom(),
              origin: window.location.href,
              "Screen Height": window.screen.height || window.innerWidth,
              "Screen Width": window.screen.width || window.innerHeight,
              "User Agent": navigator.userAgent
            }
          }])
        })
      };
      try {
        return await fetch(qe, c).then((a) => a.json());
      } catch (a) {
        return console.error(a);
      }
    },
    linkTrack(n, r, o, i) {
      ee[n] || (ee[n] = {
        events: {},
        resolvedDependencies: []
      }), i.includes(o) || i.push(o);
      const c = ee[n];
      if (c.events[o] = {
        props: r
      }, c.resolvedDependencies.push(o), i.every((s) => c.resolvedDependencies.includes(s))) {
        const s = i.reduce((l, d) => c.events[d] ? {
          ...l,
          ...c.events[d].props
        } : l, {});
        this.track(n, s), c.resolvedDependencies = c.resolvedDependencies.filter((l) => !i.includes(l)), i.forEach((l) => {
          delete c.events[l];
        });
      }
    }
  };
}
function he() {
  let e = 0;
  return {
    reset: () => e = 0,
    update: () => e = Date.now(),
    get: (t = !1) => t ? Date.now() - e : e
  };
}
const N = he(), re = he();
function pe(e) {
  return e === M.Playground ? {
    headers: {
      [Be]: "true"
    }
  } : {};
}
async function we(e, t, n, r, o = !1, i) {
  try {
    return !i && !le(r) && (i = await t.newChat(e.id, {
      persist: o
    }, pe(r)), n.track("agent-chat", {
      event: "created",
      chatId: i.id,
      agentId: e.id,
      mode: r,
      access: e.access,
      name: e.preview_name,
      ...e.access === "public" ? {
        from: "agent-template"
      } : {}
    })), {
      chat: i,
      chatMode: (i == null ? void 0 : i.chat_mode) ?? r
    };
  } catch (c) {
    try {
      const a = JSON.parse(c.message);
      if ((a == null ? void 0 : a.kind) === "InsufficientCreditsError")
        throw new Error("InsufficientCreditsError");
    } catch (a) {
      console.error("Error parsing the error message:", a);
    }
    throw new Error("Cannot create new chat");
  }
}
function Xe(e) {
  return e && e.length > 0 ? e : [];
}
function Ye(e, t, n) {
  if (!e)
    throw new Error("Please connect to the agent first");
  if (!e.interruptAvailable)
    throw new Error("Interrupt is not enabled for this stream");
  if (t !== W.Fluent)
    throw new Error("Interrupt only available for Fluent streams");
  if (!n)
    throw new Error("No active video to interrupt");
}
async function Qe(e, t) {
  const n = {
    type: j.StreamInterrupt,
    videoId: t,
    timestamp: Date.now()
  };
  e.sendDataChannelMessage(JSON.stringify(n));
}
function Oe(e) {
  return new Promise((t, n) => {
    const {
      callbacks: r,
      host: o,
      auth: i
    } = e, {
      onMessage: c = null,
      onOpen: a = null,
      onClose: s = null,
      onError: l = null
    } = r || {}, d = new WebSocket(`${o}?authorization=${me(i)}`);
    d.onmessage = c, d.onclose = s, d.onerror = (y) => {
      console.error(y), l == null || l("Websocket failed to connect", y), n(y);
    }, d.onopen = (y) => {
      a == null || a(y), t(d);
    };
  });
}
async function Ze(e) {
  const {
    retries: t = 1
  } = e;
  let n = null;
  for (let r = 0; (n == null ? void 0 : n.readyState) !== WebSocket.OPEN; r++)
    try {
      n = await Oe(e);
    } catch (o) {
      if (r === t)
        throw o;
      await de(r * 500);
    }
  return n;
}
async function Ge(e, t, n) {
  const r = n != null && n.onMessage ? [n.onMessage] : [], o = await Ze({
    auth: e,
    host: t,
    callbacks: {
      onError: (i) => {
        var c;
        return (c = n.onError) == null ? void 0 : c.call(n, new Re(i));
      },
      onMessage(i) {
        const c = JSON.parse(i.data);
        r.forEach((a) => a(c.event, c));
      }
    }
  });
  return {
    socket: o,
    disconnect: () => o.close(),
    subscribeToEvents: (i) => r.push(i)
  };
}
function et(e) {
  if (e.answer !== void 0)
    return e.answer;
  let t = 0, n = "";
  for (; t in e; )
    n += e[t++];
  return n;
}
function tt(e, t, n, r, o) {
  const i = r.messages[r.messages.length - 1];
  if (!(e === q.Partial || e === q.Answer) || (i == null ? void 0 : i.role) !== "assistant")
    return;
  const {
    content: c,
    sequence: a
  } = t;
  e === q.Partial ? n[a] = c : n.answer = c;
  const s = et(n);
  (i.content !== s || e === q.Answer) && (i.content = s, o == null || o([...r.messages], e));
}
function rt(e, t, n, r, o) {
  let i = {};
  return {
    clearQueue: () => i = {},
    onMessage: (c, a) => {
      var s, l;
      if ("content" in a)
        tt(c, a, i, t, n.callbacks.onNewMessage), c === q.Answer && e.track("agent-message-received", {
          messages: t.messages.length,
          mode: t.chatMode
        });
      else {
        const d = j, y = [d.StreamVideoDone, d.StreamVideoError, d.StreamVideoRejected], A = [d.StreamFailed, d.StreamVideoError, d.StreamVideoRejected], P = He(a, r, {
          mode: t.chatMode
        });
        if (c = c, c === d.StreamVideoCreated)
          e.linkTrack("agent-video", P, d.StreamVideoCreated, ["start"]);
        else if (y.includes(c)) {
          const x = c.split("/")[1];
          A.includes(c) ? e.track("agent-video", {
            ...P,
            event: x
          }) : e.linkTrack("agent-video", {
            ...P,
            event: x
          }, c, ["done"]);
        }
        A.includes(c) && ((l = (s = n.callbacks).onError) == null || l.call(s, new Error(`Stream failed with event ${c}`), {
          data: a
        })), a.event === d.StreamDone && o();
      }
    }
  };
}
function nt(e, t, n, r) {
  const o = ae(e, `${t}/agents/${n}`, r);
  return {
    createStream(i) {
      return o.post("/streams", {
        output_resolution: i.output_resolution,
        compatibility_mode: i.compatibility_mode,
        stream_warmup: i.stream_warmup,
        session_timeout: i.session_timeout,
        fluent: i.fluent
      });
    },
    startConnection(i, c, a) {
      return o.post(`/streams/${i}/sdp`, {
        session_id: a,
        answer: c
      });
    },
    addIceCandidate(i, c, a) {
      return o.post(`/streams/${i}/ice`, {
        session_id: a,
        ...c
      });
    },
    sendStreamRequest(i, c, a) {
      return o.post(`/streams/${i}`, {
        session_id: c,
        ...a
      });
    },
    close(i, c) {
      return o.delete(`/streams/${i}`, {
        session_id: c
      });
    }
  };
}
function at(e, t, n, r) {
  const o = ae(e, `${t}/agents/${n}`, r);
  return {
    createStream(i, c) {
      return o.post("/streams", {
        driver_url: i.driver_url,
        face: i.face,
        config: i.config,
        output_resolution: i.output_resolution,
        compatibility_mode: i.compatibility_mode,
        stream_warmup: i.stream_warmup,
        session_timeout: i.session_timeout,
        fluent: i.fluent
      }, c);
    },
    startConnection(i, c, a, s) {
      return o.post(`/streams/${i}/sdp`, {
        session_id: a,
        answer: c
      }, s);
    },
    addIceCandidate(i, c, a, s) {
      return o.post(`/streams/${i}/ice`, {
        session_id: a,
        ...c
      }, s);
    },
    sendStreamRequest(i, c, a, s) {
      return o.post(`/streams/${i}`, {
        session_id: c,
        ...a
      }, s);
    },
    close(i, c, a) {
      return o.delete(`/streams/${i}`, {
        session_id: c
      }, a);
    }
  };
}
function it(e, t, n) {
  const r = (t.timestamp - e.timestamp) / 1e3;
  return {
    duration: r,
    bytesReceived: t.bytesReceived - e.bytesReceived,
    bitrate: Math.round((t.bytesReceived - e.bytesReceived) * 8 / r),
    packetsReceived: t.packetsReceived - e.packetsReceived,
    packetsLost: t.packetsLost - e.packetsLost,
    framesDropped: t.framesDropped - e.framesDropped,
    framesDecoded: t.framesDecoded - e.framesDecoded,
    jitter: t.jitter,
    avgJitterDelayInInterval: (t.jitterBufferDelay - e.jitterBufferDelay) / (t.jitterBufferEmittedCount - e.jitterBufferEmittedCount),
    jitterBufferEmittedCount: t.jitterBufferEmittedCount - e.jitterBufferEmittedCount,
    jitterBufferDelay: (t.jitterBufferDelay - e.jitterBufferDelay) / r,
    framesPerSecond: t.framesPerSecond,
    freezeCount: t.freezeCount - e.freezeCount,
    freezeDuration: t.freezeDuration - e.freezeDuration,
    lowFpsCount: n
  };
}
function st(e) {
  return e.filter((t) => t.freezeCount > 0 || t.framesPerSecond < 21 || t.framesDropped > 0 || t.packetsLost > 0).map((t) => {
    const {
      timestamp: n,
      ...r
    } = t, o = [];
    return t.freezeCount > 0 && o.push("freeze"), t.framesPerSecond < 21 && o.push("low fps"), t.framesDropped > 0 && o.push("frames dropped"), t.packetsLost > 0 && o.push("packet loss"), {
      ...r,
      causes: o
    };
  });
}
function ot(e) {
  let t = "", n = 0;
  for (const r of e.values())
    if (r && r.type === "codec" && r.mimeType.startsWith("video") && (t = r.mimeType.split("/")[1]), r && r.type === "candidate-pair" && (n = r.currentRoundTripTime), r && r.type === "inbound-rtp" && r.kind === "video")
      return {
        codec: t,
        rtt: n,
        timestamp: r.timestamp,
        bytesReceived: r.bytesReceived,
        packetsReceived: r.packetsReceived,
        packetsLost: r.packetsLost,
        framesDropped: r.framesDropped,
        framesDecoded: r.framesDecoded,
        jitter: r.jitter,
        jitterBufferDelay: r.jitterBufferDelay,
        jitterBufferEmittedCount: r.jitterBufferEmittedCount,
        avgJitterDelayInInterval: r.jitterBufferDelay / r.jitterBufferEmittedCount,
        frameWidth: r.frameWidth,
        frameHeight: r.frameHeight,
        framesPerSecond: r.framesPerSecond,
        freezeCount: r.freezeCount,
        freezeDuration: r.totalFreezesDuration
      };
  return {};
}
function ct(e, t, n) {
  const r = e.map((s, l) => l === 0 ? n ? {
    timestamp: s.timestamp,
    duration: 0,
    rtt: s.rtt,
    bytesReceived: s.bytesReceived - n.bytesReceived,
    bitrate: (s.bytesReceived - n.bytesReceived) * 8 / (t / 1e3),
    packetsReceived: s.packetsReceived - n.packetsReceived,
    packetsLost: s.packetsLost - n.packetsLost,
    framesDropped: s.framesDropped - n.framesDropped,
    framesDecoded: s.framesDecoded - n.framesDecoded,
    jitter: s.jitter,
    jitterBufferDelay: s.jitterBufferDelay - n.jitterBufferDelay,
    jitterBufferEmittedCount: s.jitterBufferEmittedCount - n.jitterBufferEmittedCount,
    avgJitterDelayInInterval: (s.jitterBufferDelay - n.jitterBufferDelay) / (s.jitterBufferEmittedCount - n.jitterBufferEmittedCount),
    framesPerSecond: s.framesPerSecond,
    freezeCount: s.freezeCount - n.freezeCount,
    freezeDuration: s.freezeDuration - n.freezeDuration
  } : {
    timestamp: s.timestamp,
    rtt: s.rtt,
    duration: 0,
    bytesReceived: s.bytesReceived,
    bitrate: s.bytesReceived * 8 / (t / 1e3),
    packetsReceived: s.packetsReceived,
    packetsLost: s.packetsLost,
    framesDropped: s.framesDropped,
    framesDecoded: s.framesDecoded,
    jitter: s.jitter,
    jitterBufferDelay: s.jitterBufferDelay,
    jitterBufferEmittedCount: s.jitterBufferEmittedCount,
    avgJitterDelayInInterval: s.jitterBufferDelay / s.jitterBufferEmittedCount,
    framesPerSecond: s.framesPerSecond,
    freezeCount: s.freezeCount,
    freezeDuration: s.freezeDuration
  } : {
    timestamp: s.timestamp,
    duration: t * l / 1e3,
    rtt: s.rtt,
    bytesReceived: s.bytesReceived - e[l - 1].bytesReceived,
    bitrate: (s.bytesReceived - e[l - 1].bytesReceived) * 8 / (t / 1e3),
    packetsReceived: s.packetsReceived - e[l - 1].packetsReceived,
    packetsLost: s.packetsLost - e[l - 1].packetsLost,
    framesDropped: s.framesDropped - e[l - 1].framesDropped,
    framesDecoded: s.framesDecoded - e[l - 1].framesDecoded,
    jitter: s.jitter,
    jitterBufferDelay: s.jitterBufferDelay - e[l - 1].jitterBufferDelay,
    jitterBufferEmittedCount: s.jitterBufferEmittedCount - e[l - 1].jitterBufferEmittedCount,
    avgJitterDelayInInterval: (s.jitterBufferDelay - e[l - 1].jitterBufferDelay) / (s.jitterBufferEmittedCount - e[l - 1].jitterBufferEmittedCount),
    framesPerSecond: s.framesPerSecond,
    freezeCount: s.freezeCount - e[l - 1].freezeCount,
    freezeDuration: s.freezeDuration - e[l - 1].freezeDuration
  }), o = st(r), i = o.reduce((s, l) => s + (l.causes.includes("low fps") ? 1 : 0), 0), c = r.filter((s) => !!s.avgJitterDelayInInterval).map((s) => s.avgJitterDelayInInterval), a = r.filter((s) => !!s.rtt).map((s) => s.rtt);
  return {
    webRTCStats: {
      anomalies: o,
      minRtt: Math.min(...a),
      avgRtt: ie(a),
      maxRtt: Math.max(...a),
      aggregateReport: it(e[0], e[e.length - 1], i),
      minJitterDelayInInterval: Math.min(...c),
      maxJitterDelayInInterval: Math.max(...c),
      avgJitterDelayInInterval: ie(c)
    },
    codec: e[0].codec,
    resolution: `${e[0].frameWidth}x${e[0].frameHeight}`
  };
}
const ne = 100, dt = Math.max(Math.ceil(400 / ne), 1), lt = 0.25, ut = 0.28;
function mt() {
  let e = 0, t, n, r = 0;
  return (o) => {
    for (const i of o.values())
      if (i && i.type === "inbound-rtp" && i.kind === "video") {
        const c = i.jitterBufferDelay, a = i.jitterBufferEmittedCount;
        if (n && a > n) {
          const d = c - t, y = a - n;
          r = d / y;
        }
        t = c, n = a;
        const s = i.framesDecoded, l = s - e > 0;
        return e = s, {
          isReceiving: l,
          avgJitterDelayInInterval: r,
          freezeCount: i.freezeCount
        };
      }
    return {
      isReceiving: !1,
      avgJitterDelayInInterval: r
    };
  };
}
function ft(e, t, n, r, o, i = !1) {
  let c = [], a, s = 0, l = !1, d = O.Unknown, y = O.Unknown, A = 0, P = 0;
  const x = mt();
  return setInterval(async () => {
    const F = await e.getStats(), {
      isReceiving: R,
      avgJitterDelayInInterval: U,
      freezeCount: K
    } = x(F), T = ot(F);
    if (R)
      s = 0, A = K - P, y = U < lt ? O.Strong : U > ut && A > 1 ? O.Weak : d, y !== d && (o == null || o(y), d = y, P += A, A = 0), l || (r == null || r(h.Start), a = c[c.length - 1], c = [], l = !0), c.push(T);
    else if (l && (s++, s >= dt)) {
      const u = ct(c, ne, a);
      r == null || r(h.Stop, u), t() || n(), P = K, l = !1;
    }
  }, ne);
}
let ye = !1;
const b = (e, t) => ye && console.log(e, t), gt = (window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection).bind(window);
function se(e) {
  switch (e) {
    case "connected":
      return I.Connected;
    case "checking":
      return I.Connecting;
    case "failed":
      return I.Fail;
    case "new":
      return I.New;
    case "closed":
      return I.Closed;
    case "disconnected":
      return I.Disconnected;
    case "completed":
      return I.Completed;
    default:
      return I.New;
  }
}
function ht(e) {
  const [t, n = ""] = e.split(/:(.+)/);
  try {
    const r = JSON.parse(n);
    return b("parsed data channel message", {
      subject: t,
      data: r
    }), {
      subject: t,
      data: r
    };
  } catch (r) {
    return b("Failed to parse data channel message, returning data as string", {
      subject: t,
      rawData: n,
      error: r
    }), {
      subject: t,
      data: n
    };
  }
}
function pt({
  statsSignal: e,
  dataChannelSignal: t,
  onVideoStateChange: n,
  report: r
}) {
  e === h.Start && t === h.Start ? n == null || n(h.Start) : e === h.Stop && t === h.Stop && (n == null || n(h.Stop, r));
}
function wt({
  statsSignal: e,
  dataChannelSignal: t,
  onVideoStateChange: n,
  onAgentActivityStateChange: r,
  report: o
}) {
  e === h.Start ? n == null || n(h.Start) : e === h.Stop && (n == null || n(h.Stop, o)), t === h.Start ? r == null || r(X.Talking) : t === h.Stop && (r == null || r(X.Idle));
}
function oe({
  statsSignal: e,
  dataChannelSignal: t,
  onVideoStateChange: n,
  onAgentActivityStateChange: r,
  streamType: o,
  report: i
}) {
  o === W.Legacy ? pt({
    statsSignal: e,
    dataChannelSignal: t,
    onVideoStateChange: n,
    report: i
  }) : o === W.Fluent && wt({
    statsSignal: e,
    dataChannelSignal: t,
    onVideoStateChange: n,
    onAgentActivityStateChange: r,
    report: i
  });
}
async function yt(e, t, {
  debug: n = !1,
  callbacks: r,
  auth: o,
  baseURL: i = Z,
  analytics: c
}) {
  var J;
  ye = n;
  let a = !1, s = !1, l = h.Stop, d = h.Stop;
  const {
    startConnection: y,
    sendStreamRequest: A,
    close: P,
    createStream: x,
    addIceCandidate: F
  } = t.videoType === ce.Clip ? nt(o, i, e, r.onError) : at(o, i, e, r.onError), {
    id: R,
    offer: U,
    ice_servers: K,
    session_id: T,
    fluent: u,
    interrupt_enabled: p
  } = await x(t);
  (J = r.onStreamCreated) == null || J.call(r, {
    stream_id: R,
    session_id: T,
    agent_id: e
  });
  const f = new gt({
    iceServers: K
  }), D = f.createDataChannel("JanusDataChannel");
  if (!T)
    throw new Error("Could not create session_id");
  const v = u ? W.Fluent : W.Legacy;
  c.enrich({
    "stream-type": v
  });
  const w = t.stream_warmup && !u, _ = () => a, $ = () => {
    var m;
    a = !0, s && ((m = r.onConnectionStateChange) == null || m.call(r, I.Connected));
  }, B = ft(f, _, $, (m, g) => oe({
    statsSignal: d = m,
    dataChannelSignal: v === W.Legacy ? l : void 0,
    onVideoStateChange: r.onVideoStateChange,
    onAgentActivityStateChange: r.onAgentActivityStateChange,
    report: g,
    streamType: v
  }), (m) => {
    var g;
    return (g = r.onConnectivityStateChange) == null ? void 0 : g.call(r, m);
  }, w);
  f.onicecandidate = (m) => {
    var g;
    b("peerConnection.onicecandidate", m);
    try {
      m.candidate && m.candidate.sdpMid && m.candidate.sdpMLineIndex !== null ? F(R, {
        candidate: m.candidate.candidate,
        sdpMid: m.candidate.sdpMid,
        sdpMLineIndex: m.candidate.sdpMLineIndex
      }, T) : F(R, {
        candidate: null
      }, T);
    } catch (S) {
      (g = r.onError) == null || g.call(r, S, {
        streamId: R
      });
    }
  }, D.onopen = () => {
    s = !0, (!w || a) && $();
  };
  const k = (m) => {
    var g;
    (g = r.onVideoIdChange) == null || g.call(r, m);
  };
  function E(m, g) {
    if (m === j.StreamStarted && typeof g == "object" && "metadata" in g) {
      const S = g.metadata;
      k(S.videoId);
    }
    m === j.StreamDone && k(null), l = m === j.StreamStarted ? h.Start : h.Stop, oe({
      statsSignal: v === W.Legacy ? d : void 0,
      dataChannelSignal: l,
      onVideoStateChange: r.onVideoStateChange,
      onAgentActivityStateChange: r.onAgentActivityStateChange,
      streamType: v
    });
  }
  function C(m, g) {
    const S = typeof g == "string" ? g : g == null ? void 0 : g.metadata;
    S && c.enrich({
      streamMetadata: S
    }), c.track("agent-chat", {
      event: "ready"
    });
  }
  const L = {
    [j.StreamStarted]: E,
    [j.StreamDone]: E,
    [j.StreamReady]: C
  };
  D.onmessage = (m) => {
    var Y;
    const {
      subject: g,
      data: S
    } = ht(m.data);
    (Y = L[g]) == null || Y.call(L, g, S);
  }, f.oniceconnectionstatechange = () => {
    var g;
    b("peerConnection.oniceconnectionstatechange => " + f.iceConnectionState);
    const m = se(f.iceConnectionState);
    m !== I.Connected && ((g = r.onConnectionStateChange) == null || g.call(r, m));
  }, f.ontrack = (m) => {
    var g;
    b("peerConnection.ontrack", m), (g = r.onSrcObjectReady) == null || g.call(r, m.streams[0]);
  }, await f.setRemoteDescription(U), b("set remote description OK");
  const z = await f.createAnswer();
  return b("create answer OK"), await f.setLocalDescription(z), b("set local description OK"), await y(R, z, T), b("start connection OK"), {
    /**
     * Method to send request to server to get clip or talk depend on you payload
     * @param payload
     */
    speak(m) {
      return A(R, T, m);
    },
    /**
     * Method to close RTC connection
     */
    async disconnect() {
      var m;
      if (R) {
        const g = se(f.iceConnectionState);
        if (f) {
          if (g === I.New) {
            clearInterval(B);
            return;
          }
          f.close(), f.oniceconnectionstatechange = null, f.onnegotiationneeded = null, f.onicecandidate = null, f.ontrack = null;
        }
        try {
          g === I.Connected && await P(R, T).catch((S) => {
          });
        } catch (S) {
          b("Error on close stream connection", S);
        }
        (m = r.onAgentActivityStateChange) == null || m.call(r, X.Idle), clearInterval(B);
      }
    },
    /**
     * Method to send data channel messages to the server
     */
    sendDataChannelMessage(m) {
      var g, S;
      if (!a || D.readyState !== "open") {
        b("Data channel is not ready for sending messages"), (g = r.onError) == null || g.call(r, new Error("Data channel is not ready for sending messages"), {
          streamId: R
        });
        return;
      }
      try {
        D.send(m);
      } catch (Y) {
        b("Error sending data channel message", Y), (S = r.onError) == null || S.call(r, Y, {
          streamId: R
        });
      }
    },
    /**
     * Session identifier information, should be returned in the body of all streaming requests
     */
    sessionId: T,
    /**
     * Id of current RTC stream
     */
    streamId: R,
    streamType: v,
    interruptAvailable: p
  };
}
function vt(e, t) {
  const {
    streamOptions: n
  } = t ?? {};
  return {
    videoType: be(e.presenter.type),
    output_resolution: n == null ? void 0 : n.outputResolution,
    session_timeout: n == null ? void 0 : n.sessionTimeout,
    stream_warmup: n == null ? void 0 : n.streamWarmup,
    compatibility_mode: n == null ? void 0 : n.compatibilityMode,
    fluent: n == null ? void 0 : n.fluent
  };
}
function kt(e, t, n, r, o) {
  o === W.Fluent ? Dt(e, t, n, r, o) : Rt(e, t, n, r, o);
}
function Dt(e, t, n, r, o) {
  e === h.Start ? r.track("stream-session", {
    event: "start",
    "stream-type": o
  }) : e === h.Stop && r.track("stream-session", {
    event: "stop",
    is_greenscreen: t.presenter.type === "clip" && t.presenter.is_greenscreen,
    background: t.presenter.type === "clip" && t.presenter.background,
    "stream-type": o,
    ...n
  });
}
function Ct(e, t, n, r) {
  N.get() <= 0 || (e === h.Start ? n.linkTrack("agent-video", {
    event: "start",
    latency: N.get(!0),
    "stream-type": r
  }, "start", [j.StreamVideoCreated]) : e === h.Stop && n.linkTrack("agent-video", {
    event: "stop",
    is_greenscreen: t.presenter.type === "clip" && t.presenter.is_greenscreen,
    background: t.presenter.type === "clip" && t.presenter.background,
    "stream-type": r
  }, "done", [j.StreamVideoDone]));
}
function Rt(e, t, n, r, o) {
  N.get() <= 0 || (e === h.Start ? r.linkTrack("agent-video", {
    event: "start",
    latency: N.get(!0),
    "stream-type": o
  }, "start", [j.StreamVideoCreated]) : e === h.Stop && r.linkTrack("agent-video", {
    event: "stop",
    is_greenscreen: t.presenter.type === "clip" && t.presenter.is_greenscreen,
    background: t.presenter.type === "clip" && t.presenter.background,
    "stream-type": o,
    ...n
  }, "done", [j.StreamVideoDone]));
}
function St(e, t, n) {
  return N.reset(), new Promise(async (r, o) => {
    try {
      const i = await yt(e.id, vt(e, t), {
        ...t,
        analytics: n,
        callbacks: {
          ...t.callbacks,
          onConnectionStateChange: (c) => {
            var a, s;
            (s = (a = t.callbacks).onConnectionStateChange) == null || s.call(a, c), c === I.Connected && r(i);
          },
          onVideoStateChange: (c, a) => {
            var s, l;
            (l = (s = t.callbacks).onVideoStateChange) == null || l.call(s, c), kt(c, e, a, n, i.streamType);
          },
          onAgentActivityStateChange: (c) => {
            var a, s;
            (s = (a = t.callbacks).onAgentActivityStateChange) == null || s.call(a, c), c === X.Talking ? re.update() : re.reset(), Ct(c === X.Talking ? h.Start : h.Stop, e, n, i.streamType);
          }
        }
      });
    } catch (i) {
      o(i);
    }
  });
}
async function It(e, t, n, r, o) {
  var s, l, d, y;
  const {
    chat: i,
    chatMode: c
  } = await we(e, n, r, t.mode, t.persistentChat, o);
  if (c && c !== t.mode && (t.mode = c, (l = (s = t.callbacks).onModeChange) == null || l.call(s, c), c === M.TextOnly))
    return (y = (d = t.callbacks).onError) == null || y.call(d, new Ce(c)), {
      chat: i
    };
  const a = await St(e, t, r);
  return {
    chat: i,
    streamingManager: a
  };
}
async function Et(e, t) {
  var U, K, T;
  let n = !0, r = null;
  const o = t.mixpanelKey || ze, i = t.wsURL || Le, c = t.baseURL || Z, a = {
    messages: [],
    chatMode: t.mode || M.Functional
  }, s = Ve({
    token: o,
    agentId: e,
    isEnabled: t.enableAnalitics,
    distinctId: t.distinctId
  });
  s.track("agent-sdk", {
    event: "init"
  });
  const l = fe(t.auth, c, t.callbacks.onError), d = await l.getById(e);
  s.enrich(Ue(d));
  const {
    onMessage: y,
    clearQueue: A
  } = rt(s, a, t, d, () => {
    var u;
    return (u = a.socketManager) == null ? void 0 : u.disconnect();
  });
  a.messages = Xe(t.initialMessages), (K = (U = t.callbacks).onNewMessage) == null || K.call(U, [...a.messages], "answer");
  const P = (u) => {
    r = u;
  };
  s.track("agent-sdk", {
    event: "loaded",
    ...We(d)
  });
  async function x(u) {
    var _, $, B, k, E, C, L;
    ($ = (_ = t.callbacks).onConnectionStateChange) == null || $.call(_, I.Connecting), N.reset(), u && !n && (delete a.chat, (k = (B = t.callbacks).onNewMessage) == null || k.call(B, [...a.messages], "answer"));
    const p = t.mode === M.DirectPlayback ? Promise.resolve(void 0) : Ge(t.auth, i, {
      onMessage: y,
      onError: t.callbacks.onError
    }), f = te(() => It(d, {
      ...t,
      callbacks: {
        ...t.callbacks,
        onVideoIdChange: P
      }
    }, l, s, a.chat), {
      limit: 3,
      timeout: $e,
      timeoutErrorMessage: "Timeout initializing the stream",
      // Retry on all errors except for connection errors and rate limit errors, these are already handled in client level.
      shouldRetryFn: (z) => (z == null ? void 0 : z.message) !== "Could not connect" && z.status !== 429,
      delayMs: 1e3
    }).catch((z) => {
      var J, m;
      throw R(M.Maintenance), (m = (J = t.callbacks).onConnectionStateChange) == null || m.call(J, I.Fail), z;
    }), [D, {
      streamingManager: v,
      chat: w
    }] = await Promise.all([p, f]);
    w && w.id !== ((E = a.chat) == null ? void 0 : E.id) && ((L = (C = t.callbacks).onNewChat) == null || L.call(C, w.id)), a.streamingManager = v, a.socketManager = D, a.chat = w, n = !1, R((w == null ? void 0 : w.chat_mode) ?? t.mode ?? M.Functional);
  }
  async function F() {
    var u, p, f, D;
    (u = a.socketManager) == null || u.disconnect(), await ((p = a.streamingManager) == null ? void 0 : p.disconnect()), delete a.streamingManager, delete a.socketManager, (D = (f = t.callbacks).onConnectionStateChange) == null || D.call(f, I.Disconnected);
  }
  async function R(u) {
    var p, f;
    u !== a.chatMode && (s.track("agent-mode-change", {
      mode: u
    }), a.chatMode = u, a.chatMode !== M.Functional && await F(), (f = (p = t.callbacks).onModeChange) == null || f.call(p, u));
  }
  return {
    agent: d,
    getStreamType: () => {
      var u;
      return (u = a.streamingManager) == null ? void 0 : u.streamType;
    },
    getIsInterruptAvailable: () => {
      var u;
      return ((u = a.streamingManager) == null ? void 0 : u.interruptAvailable) ?? !1;
    },
    starterMessages: ((T = d.knowledge) == null ? void 0 : T.starter_message) || [],
    getSTTToken: () => l.getSTTToken(d.id),
    changeMode: R,
    enrichAnalytics: s.enrich,
    async connect() {
      var u;
      await x(!0), s.track("agent-chat", {
        event: "connect",
        chatId: (u = a.chat) == null ? void 0 : u.id,
        agentId: d.id,
        mode: a.chatMode,
        access: d.access,
        name: d.preview_name,
        ...d.access === "public" ? {
          from: "agent-template"
        } : {}
      });
    },
    async reconnect() {
      var u;
      await F(), await x(!1), s.track("agent-chat", {
        event: "reconnect",
        chatId: (u = a.chat) == null ? void 0 : u.id,
        agentId: d.id,
        mode: a.chatMode,
        access: d.access,
        name: d.preview_name,
        ...d.access === "public" ? {
          from: "agent-template"
        } : {}
      });
    },
    async disconnect() {
      var u;
      await F(), s.track("agent-chat", {
        event: "disconnect",
        chatId: (u = a.chat) == null ? void 0 : u.id,
        agentId: d.id,
        mode: a.chatMode,
        access: d.access,
        name: d.preview_name,
        ...d.access === "public" ? {
          from: "agent-template"
        } : {}
      });
    },
    async chat(u) {
      var v, w, _, $, B;
      const p = () => {
        if (le(t.mode))
          throw new H(`${t.mode} is enabled, chat is disabled`);
        if (u.length >= 800)
          throw new H("Message cannot be more than 800 characters");
        if (u.length === 0)
          throw new H("Message cannot be empty");
        if (a.chatMode === M.Maintenance)
          throw new H("Chat is in maintenance mode");
        if (![M.TextOnly, M.Playground].includes(a.chatMode)) {
          if (!a.streamingManager)
            throw new H("Streaming manager is not initialized");
          if (!a.chat)
            throw new H("Chat is not initialized");
        }
      }, f = async () => {
        var k, E;
        if (!a.chat) {
          const C = await we(d, l, s, a.chatMode, t.persistentChat);
          if (!C.chat)
            throw new De(a.chatMode, !!t.persistentChat);
          a.chat = C.chat, (E = (k = t.callbacks).onNewChat) == null || E.call(k, a.chat.id);
        }
        return a.chat.id;
      }, D = async (k, E) => te(() => {
        var C, L;
        return l.chat(d.id, E, {
          chatMode: a.chatMode,
          streamId: (C = a.streamingManager) == null ? void 0 : C.streamId,
          sessionId: (L = a.streamingManager) == null ? void 0 : L.sessionId,
          messages: k.map(({
            matches: z,
            ...J
          }) => J)
        }, {
          ...pe(a.chatMode),
          skipErrorHandler: !0
        });
      }, {
        limit: 2,
        shouldRetryFn: (C) => {
          var J, m, g, S;
          const L = (J = C == null ? void 0 : C.message) == null ? void 0 : J.includes("missing or invalid session_id");
          return !((m = C == null ? void 0 : C.message) == null ? void 0 : m.includes("Stream Error")) && !L ? ((S = (g = t.callbacks).onError) == null || S.call(g, C), !1) : !0;
        },
        onRetry: async () => {
          await F(), await x(!1);
        }
      });
      try {
        A(), p(), a.messages.push({
          id: V(),
          role: "user",
          content: u,
          created_at: new Date(N.update()).toISOString()
        }), (w = (v = t.callbacks).onNewMessage) == null || w.call(v, [...a.messages], "user");
        const k = await f(), E = await D([...a.messages], k);
        return a.messages.push({
          id: V(),
          role: "assistant",
          content: E.result || "",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          context: E.context,
          matches: E.matches
        }), s.track("agent-message-send", {
          event: "success",
          mode: a.chatMode,
          messages: a.messages.length + 1
        }), E.result && (($ = (_ = t.callbacks).onNewMessage) == null || $.call(_, [...a.messages], "answer"), s.track("agent-message-received", {
          latency: N.get(!0),
          mode: a.chatMode,
          messages: a.messages.length
        })), E;
      } catch (k) {
        throw ((B = a.messages[a.messages.length - 1]) == null ? void 0 : B.role) === "assistant" && a.messages.pop(), s.track("agent-message-send", {
          event: "error",
          mode: a.chatMode,
          messages: a.messages.length
        }), k;
      }
    },
    rate(u, p, f) {
      var w, _, $, B;
      const D = a.messages.find((k) => k.id === u);
      if (a.chat) {
        if (!D)
          throw new Error("Message not found");
      } else
        throw new Error("Chat is not initialized");
      const v = ((w = D.matches) == null ? void 0 : w.map((k) => [k.document_id, k.id])) ?? [];
      return s.track("agent-rate", {
        event: f ? "update" : "create",
        thumb: p === 1 ? "up" : "down",
        knowledge_id: ((_ = d.knowledge) == null ? void 0 : _.id) ?? "",
        mode: a.chatMode,
        matches: v,
        score: p
      }), f ? l.updateRating(d.id, a.chat.id, f, {
        knowledge_id: (($ = d.knowledge) == null ? void 0 : $.id) ?? "",
        message_id: u,
        matches: v,
        score: p
      }) : l.createRating(d.id, a.chat.id, {
        knowledge_id: ((B = d.knowledge) == null ? void 0 : B.id) ?? "",
        message_id: u,
        matches: v,
        score: p
      });
    },
    deleteRate(u) {
      var p;
      if (!a.chat)
        throw new Error("Chat is not initialized");
      return s.track("agent-rate-delete", {
        type: "text",
        chat_id: (p = a.chat) == null ? void 0 : p.id,
        id: u,
        mode: a.chatMode
      }), l.deleteRating(d.id, a.chat.id, u);
    },
    async speak(u) {
      var v, w, _;
      function p() {
        if (typeof u == "string") {
          if (!d.presenter.voice)
            throw new Error("Presenter voice is not initialized");
          return {
            type: "text",
            provider: d.presenter.voice,
            input: u,
            ssml: !1
          };
        }
        if (u.type === "text" && !u.provider) {
          if (!d.presenter.voice)
            throw new Error("Presenter voice is not initialized");
          return {
            type: "text",
            provider: d.presenter.voice,
            input: u.input,
            ssml: u.ssml
          };
        }
        return u;
      }
      const f = p();
      if (s.track("agent-speak", f), N.update(), a.messages && f.type === "text" && (a.messages.push({
        id: V(),
        role: "assistant",
        content: f.input,
        created_at: new Date(N.get(!0)).toISOString()
      }), (w = (v = t.callbacks).onNewMessage) == null || w.call(v, [...a.messages], "answer")), Ne(a.chatMode))
        return {
          duration: 0,
          video_id: "",
          status: "success"
        };
      if (!a.streamingManager)
        throw new Error("Please connect to the agent first");
      return a.streamingManager.speak({
        script: f,
        metadata: {
          chat_id: (_ = a.chat) == null ? void 0 : _.id,
          agent_id: d.id
        }
      });
    },
    async interrupt({
      type: u
    }) {
      var f, D, v, w, _;
      Ye(a.streamingManager, (f = a.streamingManager) == null ? void 0 : f.streamType, r);
      const p = a.messages[a.messages.length - 1];
      s.track("agent-video-interrupt", {
        type: u || "click",
        stream_id: (D = a.streamingManager) == null ? void 0 : D.streamId,
        agent_id: d.id,
        owner_id: d.owner_id,
        video_duration_to_interrupt: re.get(!0),
        message_duration_to_interrupt: N.get(!0),
        chat_id: (v = a.chat) == null ? void 0 : v.id,
        mode: a.chatMode
      }), p.interrupted = !0, (_ = (w = t.callbacks).onNewMessage) == null || _.call(w, [...a.messages], "answer"), Qe(a.streamingManager, r);
    }
  };
}
function Mt(e, t, n) {
  const {
    getById: r
  } = fe(t, n || Z);
  return r(e);
}
export {
  X as AgentActivityState,
  _e as AgentStatus,
  De as ChatCreationFailed,
  M as ChatMode,
  Ce as ChatModeDowngraded,
  q as ChatProgress,
  I as ConnectionState,
  O as ConnectivityState,
  je as DocumentType,
  Te as KnowledgeType,
  Ie as PlanGroup,
  Ae as Providers,
  Ee as RateState,
  j as StreamEvents,
  W as StreamType,
  h as StreamingState,
  Me as Subject,
  Se as UserPlan,
  H as ValidationError,
  ce as VideoType,
  Pe as VoiceAccess,
  Re as WsError,
  Et as createAgentManager,
  Mt as getAgent,
  be as mapVideoType
};
