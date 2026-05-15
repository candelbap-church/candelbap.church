import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-brand-gold/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
}
