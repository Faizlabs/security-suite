import { createThreatAlert, generateInitialFeed } from '../data/threatFeedMock';
import type { ThreatAlert, ThreatFeedResponse } from '../types/threat';

const API_BASE = import.meta.env.VITE_THREAT_FEED_API_URL ?? '';
const USE_MOCK = !API_BASE;

let mockCache: ThreatAlert[] = generateInitialFeed(28);

/**
 * Fetch current threat feed snapshot.
 * Replace mock branch with `fetch(`${API_BASE}/alerts`)` when backend is ready.
 */
export async function fetchThreatFeed(limit = 50): Promise<ThreatFeedResponse> {
  if (USE_MOCK) {
    await delay(120);
    return {
      alerts: mockCache.slice(0, limit),
      total: mockCache.length,
      lastUpdated: new Date().toISOString(),
    };
  }

  const res = await fetch(`${API_BASE}/alerts?limit=${limit}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Threat feed error: ${res.status}`);
  return res.json() as Promise<ThreatFeedResponse>;
}

/**
 * Poll for a single new alert (mock simulates inbound telemetry).
 */
export async function fetchLatestAlert(): Promise<ThreatAlert> {
  if (USE_MOCK) {
    await delay(80);
    const alert = createThreatAlert();
    mockCache = [alert, ...mockCache].slice(0, 80);
    return alert;
  }

  const res = await fetch(`${API_BASE}/alerts/latest`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Latest alert error: ${res.status}`);
  const json = (await res.json()) as { alert: ThreatAlert };
  return json.alert;
}

export function resetMockFeed(): void {
  mockCache = generateInitialFeed(28);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
