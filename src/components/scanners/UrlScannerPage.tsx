import { useState } from 'react';
import { scanUrl, type UrlScanResult } from '../../services/urlScanService';

export function UrlScannerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UrlScanResult | null>(null);
  const [error, setError] = useState('');

  async function handleScan() {
    try {
      setLoading(true);
      setError('');

      const data = await scanUrl(url);

      setResult(data);
    } catch (err) {
      setError('Failed to scan URL');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-cyber-border bg-cyber-panel p-4">
        <h2 className="text-xl font-bold text-cyber-cyan">
          URL Reputation Scanner
        </h2>

        <p className="mt-2 text-sm text-cyber-muted">
          Detect phishing, suspicious domains, and malicious URLs.
        </p>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-lg border border-cyber-border bg-black px-4 py-3 text-white outline-none"
          />

          <button
            onClick={handleScan}
            className="rounded-lg bg-cyber-cyan px-4 py-2 font-semibold text-black"
          >
            {loading ? 'Scanning...' : 'Scan URL'}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      {result && (
        <div className="rounded-xl border border-cyber-border bg-cyber-panel p-4">
          <h3 className="text-lg font-bold text-white">
            Scan Results
          </h3>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-cyber-border p-3">
              <p className="text-cyber-muted text-sm">Verdict</p>

              <p className="mt-1 text-xl font-bold text-cyber-cyan uppercase">
                {result.verdict}
              </p>
            </div>

            <div className="rounded-lg border border-cyber-border p-3">
              <p className="text-cyber-muted text-sm">Risk Score</p>

              <p className="mt-1 text-xl font-bold text-white">
                {result.riskScore}%
              </p>
            </div>

            <div className="rounded-lg border border-cyber-border p-3 md:col-span-2">
              <p className="text-cyber-muted text-sm">
                Matched Keywords
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {result.matchedKeywords.length > 0 ? (
                  result.matchedKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-cyber-cyan px-2 py-1 text-xs text-cyber-cyan"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-cyber-muted">
                    No suspicious indicators
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}