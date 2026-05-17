export type IpRiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export interface IpReputationResult {
  ip: string;
  abuseConfidenceScore: number;
  isp: string;
  country: string;
  domain: string | null;
  usageType: string;
  totalReports: number;
  riskLevel: IpRiskLevel;
  lastReportedAt: string | null;
  isTor?: boolean;
  isWhitelisted?: boolean;
}
