export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-brand/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand ${className}`}
    >
      {children}
    </span>
  );
}
