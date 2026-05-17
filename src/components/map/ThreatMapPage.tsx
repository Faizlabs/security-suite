import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Line,
  } from 'react-simple-maps';
  
  
  const geoUrl ='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  
  const attacks = [
    {
      name: 'Russia',
      coordinates: [37.6173, 55.7558],
      severity: 'critical',
    },
    {
      name: 'China',
      coordinates: [116.4074, 39.9042],
      severity: 'high',
    },
    {
      name: 'United States',
      coordinates: [-74.006, 40.7128],
      severity: 'medium',
    },
    {
      name: 'Germany',
      coordinates: [13.405, 52.52],
      severity: 'low',
    },
    {
      name: 'India',
      coordinates: [72.8777, 19.076],
      severity: 'high',
    },
  ];
  const attackPaths = [
    {
      from: [37.6173, 55.7558],
      to: [-74.006, 40.7128],
      severity: 'critical',
    },
  
    {
      from: [116.4074, 39.9042],
      to: [72.8777, 19.076],
      severity: 'high',
    },
  
    {
      from: [13.405, 52.52],
      to: [-0.1276, 51.5072],
      severity: 'medium',
    },
  ];
  
  function getColor(severity: string) {
    switch (severity) {
      case 'critical':
        return '#ff0055';
  
      case 'high':
        return '#ff7b00';
  
      case 'medium':
        return '#ffd000';
  
      default:
        return '#00ffae';
    }
  }
  
  export function ThreatMapPage() {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-cyber-border bg-cyber-panel p-4">
          <h2 className="text-2xl font-bold text-cyber-cyan">
            Global Threat Map
          </h2>
  
          <p className="mt-2 text-sm text-cyber-muted">
            Live visualization of global cyber attack origins.
          </p>
        </div>
  
        <div className="rounded-xl border border-cyber-border bg-[#050816] p-4">
          <ComposableMap
            projectionConfig={{
              scale: 140,
            }}
            className="w-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#0b1120"
                    stroke="#00ffee22"
                    style={{
                      default: {
                        outline: 'none',
                      },
                      hover: {
                        fill: '#111827',
                        outline: 'none',
                      },
                      pressed: {
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
  {attackPaths.map((path, index) => (
  <Line
    key={index}
    from={path.from as [number, number]}
    to={path.to as [number, number]}
    stroke={getColor(path.severity)}
    strokeWidth={2}
    strokeLinecap="round"
    className="animate-pulse"
  />
))}
            {attacks.map((attack) => (
              <Marker
                key={attack.name}
                coordinates={attack.coordinates as [number, number]}
              >
                <circle
                  r={8}
                  fill={getColor(attack.severity)}
                  stroke="#fff"
                  strokeWidth={2}
                  className="animate-pulse"
                />
  
                <text
                  textAnchor="middle"
                  y={-15}
                  className="fill-white text-[10px]"
                >
                  {attack.name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    );
  }
