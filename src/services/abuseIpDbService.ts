import { mockIpReputationLookup } from '../data/ipReputationMock';
import type { IpReputationResult, IpRiskLevel } from '../types/ipReputation';

const API_KEY = import.meta.env.VITE_ABUSEIPDB_API_KEY ?? '';
const API_BASE = 'https://api.abuseipdb.com/api/v2';
const USE_MOCK = !API_KEY;

function scoreToRisk(score: number): IpRiskLevel {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  if (score >= 15) return 'low';
  return 'safe';
}

/**
 * Lookup IP reputation via AbuseIPDB (or mock when no API key).
 * @see https://docs.abuseipdb.com/
 */
export async function lookupIpReputation(ip: string): Promise<IpReputationResult> {
  const trimmed = ip.trim();
  if (!trimmed) {
    throw new Error('Enter an IP address to scan.');
  }

  if (USE_MOCK) {
    await delay(900 + Math.random() * 400);
    return mockIpReputationLookup(trimmed);
  }

  const url = `http://localhost:3001/api/check-ip?ip=${trimmed}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Key: API_KEY,
      Accept: 'application/json',
    },
  });

  if (res.status === 429) {
    throw new Error('Rate limit exceeded. Try again shortly.');
  }
  if (!res.ok) {
    console.log(await res.text());
    const body = await res.json().catch(() => ({}));
    const msg = (body as { errors?: { detail?: string }[] })?.errors?.[0]?.detail;
    throw new Error(msg ?? `AbuseIPDB request failed (${res.status})`);
  }

  const json = await res.json();
  const data = json.data ?? {};
  const score = Number(data.abuseConfidenceScore ?? 0);

  return {
    ip: data.ipAddress ?? trimmed,
    abuseConfidenceScore: score,
    isp: data.isp ?? 'Unknown',
    country: data.countryCode ?? '—',
    domain: data.domain ?? null,
    usageType: data.usageType ?? 'unknown',
    totalReports: Number(data.totalReports ?? 0),
    riskLevel: scoreToRisk(score),
    lastReportedAt: data.lastReportedAt ?? null,
    isTor: Boolean(data.isTor),
    isWhitelisted: Boolean(data.isWhitelisted),
  };
}

export function isAbuseIpDbMockMode(): boolean {
  return USE_MOCK;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
