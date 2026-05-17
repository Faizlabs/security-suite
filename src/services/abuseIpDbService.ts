const API_KEY = import.meta.env.VITE_ABUSEIPDB_API_KEY;

export async function scanIp(ip: string) {
  return {
    ipAddress: ip,
    abuseConfidenceScore: Math.floor(Math.random() * 100),
    countryCode: 'US',
    isp: 'CyberFlow Network',
    domain: 'example.com',
    totalReports: Math.floor(Math.random() * 50),
    lastReportedAt: new Date().toISOString(),
  };
}