import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export function Hero() {
  return (
    <section className="relative bg-section-soft">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-brand-gold font-semibold tracking-wide text-sm">
            Welcome to {site.shortName}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl leading-tight">
            {site.name}
          </h1>
          <p className="mt-5 text-lg text-muted max-w-prose">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact/" variant="primary" size="lg">
              Plan Your Visit
            </ButtonLink>
            <ButtonLink href="/watch/" variant="secondary" size="lg">
              Watch Online
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-sm p-8 text-center">
          <p className="text-sm uppercase tracking-wider text-muted">Join us this week</p>
          <ul className="mt-4 space-y-3">
            {site.services.map((s) => (
              <li key={s.day} className="font-display text-2xl">
                <span className="text-brand-navy">{s.day}</span>
                <span className="text-muted text-base"> — {s.name}</span>
                <div className="text-brand-gold text-lg">{s.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
