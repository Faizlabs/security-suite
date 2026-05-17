/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABUSEIPDB_API_KEY?: string;
  readonly VITE_THREAT_FEED_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
