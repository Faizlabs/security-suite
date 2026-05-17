import type { InputHTMLAttributes, ReactNode } from 'react';

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function CyberInput({
  label,
  icon,
  error,
  className = '',
  id,
  ...props
}: CyberInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-cyber-muted md:text-xs"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-cyber-bg/80 py-2.5 font-mono text-sm text-gray-100 placeholder:text-gray-600 outline-none transition focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 disabled:opacity-50 ${
            error ? 'border-cyber-red/50' : 'border-cyber-border'
          } ${icon ? 'pl-10 pr-3' : 'px-3'} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 font-mono text-[10px] text-cyber-red">{error}</p>}
    </div>
  );
}
