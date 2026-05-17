interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-3 md:mb-4">
      <h2 className="text-base font-semibold text-white md:text-lg">{title}</h2>
      {description && <p className="mt-0.5 text-xs text-cyber-muted md:text-sm">{description}</p>}
    </header>
  );
}
