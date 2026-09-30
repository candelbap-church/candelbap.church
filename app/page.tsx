import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { SermonEmbed } from '@/components/SermonEmbed';
import { MapEmbed } from '@/components/MapEmbed';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Divider } from '@/components/ui/Divider';
import { site } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <Hero />

      <Divider tone="warm" variant="wave" />
      <Section tone="warm">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl">
                <span className="heading-accent">A church family in Candelaria</span>
              </h2>
              <p className="mt-4 text-ink/80 leading-relaxed">
                Since {site.established}, {site.name} has been a place to worship, grow, and serve together.
                Whether you&apos;re exploring faith for the first time or looking for a church home, you&apos;re welcome here.
              </p>
              <div className="mt-6">
                <ButtonLink href="/about/" variant="ghost">Learn more about us →</ButtonLink>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-2 ring-1 ring-black/5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] rounded-2xl bg-bg-warm flex items-center justify-center text-ink/80">
                Photo coming soon
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Divider tone="warm" variant="arc" flip />
      <Section tone="white">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl">
              <span className="heading-accent">Latest Sermon</span>
            </h2>
            <p className="mt-3 text-ink/80">Catch up or worship with us online.</p>
          </div>
          <div className="mt-10 max-w-3xl mx-auto">
            <SermonEmbed src={site.latestSermonEmbed} />
            <div className="mt-6 text-center">
              <ButtonLink href="/watch/" variant="primary">More sermons</ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      <Divider tone="warm" variant="wave" />
      <Section tone="warm">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl">
                <span className="heading-accent">Visit Us</span>
              </h2>
              <p className="mt-4 text-ink/80">
                {site.address.line1}, {site.address.line2}
                <br />
                {site.address.city}, {site.address.region}, {site.address.country}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={site.address.mapsUrl} variant="primary" external>
                  Get Directions
                </ButtonLink>
                <ButtonLink href={site.contact.messenger} variant="ghost" external>Message us</ButtonLink>
              </div>
            </div>
            <MapEmbed />
          </div>
        </Reveal>
      </Section>

      <Divider tone="white" variant="tilt" />
      <Section tone="white">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-navy text-white px-8 py-16 text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="absolute -bottom-32 -right-24 w-96 h-96 text-brand-gold/15 pointer-events-none"
            >
              <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="300" cy="300" r="170" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="300" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h2 className="text-3xl md:text-4xl text-white relative">Partner with us in giving</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto relative">
              Your generosity helps us serve our community and share the gospel.
            </p>
            <div className="mt-6 relative">
              <Link
                href="/give/"
                className="inline-flex rounded-full bg-brand-gold px-7 py-3.5 text-ink font-semibold transition-all duration-300 hover:bg-brand-gold/85 hover:scale-[1.03] motion-reduce:hover:scale-100"
              >
                Give now
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
