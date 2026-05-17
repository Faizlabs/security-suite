import { useIpScanner } from '../../hooks/useIpScanner';
import { PageHeader } from '../ui/PageHeader';
import { IpScanResults } from './IpScanResults';
import { IpScannerForm } from './IpScannerForm';

export function IpScannerPage() {
  const { ip, setIp, scan, result, error, isScanning, phase } = useIpScanner();

  return (
    <div className="mx-auto max-w-3xl space-y-3 md:space-y-4">
      <PageHeader
        title="IP Reputation Scanner"
        description="Analyze abuse confidence, provider metadata, and risk classification for any IPv4 or IPv6 address."
      />

      <IpScannerForm
        ip={ip}
        onIpChange={setIp}
        onScan={scan}
        isScanning={isScanning}
        error={phase === 'error' ? error : null}
      />

      {result && phase === 'complete' && <IpScanResults result={result} />}
    </div>
  );
}
