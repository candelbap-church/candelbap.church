import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function Hero() {
  const theme = site.yearTheme;
  return (
    <section className="relative bg-bg-warm overflow-hidden">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute -top-10 -right-12 w-56 h-56 text-brand-gold/15 float-slow pointer-events-none"
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative w-full bg-brand-navy">
        <Image
          src={theme.bannerImage}
          alt={`${theme.year} theme: ${theme.title}`}
          width={1920}
          height={1026}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
        <Reveal>
          <p className="text-brand-gold font-semibold tracking-wide text-sm uppercase">
            <span className="inline-block w-6 h-px align-middle bg-brand-gold mr-2" />
            {theme.year} Theme · {theme.title}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl leading-tight">
            <span className="heading-accent">{site.name}</span>
          </h1>
          <p className="mt-5 text-xl font-semibold text-brand-navy">{site.tagline}</p>
          <p className="mt-2 text-lg text-ink/80 max-w-prose">{site.heritageLine}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.contact.messenger} variant="primary" size="lg" external>
              Message us on Facebook
            </ButtonLink>
            <ButtonLink href="/watch/" variant="secondary" size="lg">
              Watch Online
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-sm p-8 text-center transition-shadow duration-300 hover:shadow-lg">
            <p className="text-sm uppercase tracking-wider text-ink/80">Join us this week</p>
            <ul className="mt-4 space-y-3">
              {site.services.map((s) => (
                <li key={s.day} className="font-display text-2xl">
                  <span className="text-brand-navy">{s.day}</span>
                  <span className="text-ink/80 text-base"> — {s.name}</span>
                  <div className="text-brand-gold text-lg">{s.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
