export interface UrlScanResult {
    url: string;
    verdict: 'safe' | 'suspicious' | 'malicious';
    riskScore: number;
    matchedKeywords: string[];
    scannedAt: string;
  }
  
  export async function scanUrl(url: string): Promise<UrlScanResult> {
    const response = await fetch('http://localhost:3001/api/scan-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to scan URL');
    }
  
    return response.json();
  }