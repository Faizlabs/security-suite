import type { IpReputationResult, IpRiskLevel } from '../types/ipReputation';

const ISPS = [
  'DigitalOcean LLC',
  'OVH SAS',
  'Amazon Technologies Inc.',
  'Hetzner Online GmbH',
  'Contabo GmbH',
  'Choopa / Vultr',
  'Microsoft Azure',
  'Google Cloud',
];

const COUNTRIES = ['RU', 'CN', 'US', 'NL', 'DE', 'BR', 'IN', 'RO', 'GB', 'FR', 'IR'];
const USAGE_TYPES = ['hosting', 'datacenter', 'residential', 'corporate', 'mobile', 'cdn'];

function scoreToRisk(score: number): IpRiskLevel {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  if (score >= 15) return 'low';
  return 'safe';
}

export function mockIpReputationLookup(ip: string): IpReputationResult {
  const hash = ip.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const score = (hash * 13) % 100;
  const hasDomain = hash % 3 !== 0;

  return {
    ip,
    abuseConfidenceScore: score,
    isp: ISPS[hash % ISPS.length],
    country: COUNTRIES[hash % COUNTRIES.length],
    domain: hasDomain ? `host-${hash}.suspicious-network.net` : null,
    usageType: USAGE_TYPES[hash % USAGE_TYPES.length],
    totalReports: (hash * 7) % 520,
    riskLevel: scoreToRisk(score),
    lastReportedAt: new Date(Date.now() - (hash % 72) * 3600000).toISOString(),
    isTor: hash % 11 === 0,
    isWhitelisted: score < 5,
  };
}
