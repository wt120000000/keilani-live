export const CONFIG = {
  apiBase: import.meta.env.VITE_API_BASE,
  supabaseUrl: import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
  did: {
    clientKey: import.meta.env.VITE_DID_EMBED_CLIENT_KEY,
    agentId: import.meta.env.VITE_DID_EMBED_AGENT_ID
  }
};
