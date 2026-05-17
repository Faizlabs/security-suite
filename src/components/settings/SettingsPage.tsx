import { useState } from 'react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-cyber-border bg-cyber-panel p-6">
        <h2 className="text-3xl font-bold text-cyber-cyan">
          System Settings
        </h2>

        <p className="mt-2 text-cyber-muted">
          Configure CyberFlow XDR monitoring environment.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-cyber-border bg-cyber-panel p-5">
          <h3 className="text-xl font-semibold text-white">
            Detection Settings
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-cyber-muted">
                Real-time notifications
              </span>

              <button
                onClick={() => setNotifications(!notifications)}
                className={`h-6 w-12 rounded-full transition ${
                  notifications
                    ? 'bg-cyan-400'
                    : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full bg-white transition ${
                    notifications
                      ? 'translate-x-6'
                      : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyber-muted">
                Auto-refresh threat feed
              </span>

              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`h-6 w-12 rounded-full transition ${
                  autoRefresh
                    ? 'bg-cyan-400'
                    : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full bg-white transition ${
                    autoRefresh
                      ? 'translate-x-6'
                      : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyber-muted">
                Dark mode
              </span>

              <button
  onClick={() => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);

    if (nextMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }}
  className={`h-6 w-12 rounded-full transition ${
    darkMode ? 'bg-cyan-400' : 'bg-zinc-700'
  }`}
>
  <div
    className={`h-6 w-6 rounded-full bg-white transition ${
      darkMode ? 'translate-x-6' : 'translate-x-0'
    }`}
  />
</button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-cyber-border bg-cyber-panel p-5">
          <h3 className="text-xl font-semibold text-white">
            API Status
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-cyber-border p-3">
              <span className="text-cyber-muted">
                AlienVault OTX
              </span>

              <span className="text-green-400">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-cyber-border p-3">
              <span className="text-cyber-muted">
                AbuseIPDB
              </span>

              <span className="text-green-400">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-cyber-border p-3">
              <span className="text-cyber-muted">
                Threat Engine
              </span>

              <span className="text-cyan-400">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}