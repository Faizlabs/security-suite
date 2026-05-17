export function CyberGridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-50" />
      <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-cyber-cyan/5 blur-[120px]" />
      <div className="absolute -right-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-cyber-green/5 blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-bg via-transparent to-cyber-bg" />
    </div>
  );
}
