type Tone = 'warm' | 'white' | 'navy';
type Variant = 'wave' | 'arc' | 'tilt';

const fillForTone: Record<Tone, string> = {
  warm: 'var(--color-bg-warm)',
  white: '#ffffff',
  navy: 'var(--color-brand-navy)',
};

const paths: Record<Variant, string> = {
  wave:
    'M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z',
  arc: 'M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z',
  tilt: 'M0,80 L1440,0 L1440,80 L0,80 Z',
};

export function Divider({
  tone,
  variant = 'wave',
  flip = false,
  className = '',
}: {
  tone: Tone;
  variant?: Variant;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`block w-full leading-none ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path d={paths[variant]} fill={fillForTone[tone]} />
      </svg>
    </div>
  );
}
