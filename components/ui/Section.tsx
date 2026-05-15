import type { ReactNode } from 'react';

type Tone = 'warm' | 'soft' | 'white';
const tones: Record<Tone, string> = {
  warm: 'bg-bg-warm',
  soft: 'bg-section-soft',
  white: 'bg-white',
};

export function Section({
  children,
  tone = 'warm',
  id,
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">{children}</div>
    </section>
  );
}
