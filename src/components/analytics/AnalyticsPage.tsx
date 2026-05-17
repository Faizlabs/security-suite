import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
  } from 'recharts';
  
  const severityData = [
    { name: 'Critical', value: 12 },
    { name: 'High', value: 24 },
    { name: 'Medium', value: 38 },
    { name: 'Low', value: 19 },
  ];
  
  const countryData = [
    { country: 'US', attacks: 44 },
    { country: 'RU', attacks: 31 },
    { country: 'CN', attacks: 28 },
    { country: 'IN', attacks: 21 },
    { country: 'DE', attacks: 16 },
  ];
  
  const COLORS = ['#ff0055', '#ff7b00', '#ffd000', '#00ffae'];
  
  export function AnalyticsPage() {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-cyber-border bg-cyber-panel p-5">
          <h2 className="text-3xl font-bold text-cyber-cyan">
            Threat Analytics
          </h2>
  
          <p className="mt-2 text-sm text-cyber-muted">
            Real-time cybersecurity intelligence and attack distribution metrics.
          </p>
        </div>
  
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-cyber-border bg-cyber-panel p-4">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Threat Severity Distribution
            </h3>
  
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                    label
                  >
                    {severityData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
  
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          <div className="rounded-xl border border-cyber-border bg-cyber-panel p-4">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Most Targeted Countries
            </h3>
  
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
  
                  <XAxis dataKey="country" stroke="#94a3b8" />
  
                  <YAxis stroke="#94a3b8" />
  
                  <Tooltip />
  
                  <Bar
                    dataKey="attacks"
                    fill="#00ffee"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }