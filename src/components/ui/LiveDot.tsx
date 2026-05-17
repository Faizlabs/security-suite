export function LiveDot({ color = 'green' }: { color?: 'green' | 'cyan' | 'red' }) {
  const colors = {
    green: 'bg-cyber-green shadow-[0_0_8px_#00ff88]',
    cyan: 'bg-cyber-cyan shadow-[0_0_8px_#00f5d4]',
    red: 'bg-cyber-red shadow-[0_0_8px_#ff3366]',
  };

  return (
    <span className="relative flex h-2 w-2">
      <span className={`absolute h-full w-full animate-ping rounded-full opacity-60 ${colors[color]}`} />
      <span className={`relative h-2 w-2 rounded-full ${colors[color]}`} />
    </span>
  );
}
