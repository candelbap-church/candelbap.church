import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { SermonEmbed } from '@/components/SermonEmbed';
import { MapEmbed } from '@/components/MapEmbed';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section tone="soft">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">A church family in Candelaria</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Since {site.established}, {site.name} has been a place to worship, grow, and serve together.
              Whether you&apos;re exploring faith for the first time or looking for a church home, you&apos;re welcome here.
            </p>
            <div className="mt-6">
              <ButtonLink href="/about/" variant="ghost">Learn more about us →</ButtonLink>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-2 ring-1 ring-black/5 shadow-sm">
            <div className="aspect-[4/3] rounded-2xl bg-bg-warm flex items-center justify-center text-muted">
              Photo coming soon
            </div>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Latest Sermon</h2>
          <p className="mt-3 text-muted">Catch up or worship with us online.</p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <SermonEmbed src={site.latestSermonEmbed} />
          <div className="mt-6 text-center">
            <ButtonLink href="/watch/" variant="primary">More sermons</ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Visit Us</h2>
            <p className="mt-4 text-muted">
              {site.address.line1}, {site.address.line2}
              <br />
              {site.address.city}, {site.address.region}, {site.address.country}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.address.mapsUrl} variant="primary" external>
                Get Directions
              </ButtonLink>
              <ButtonLink href="/contact/" variant="ghost">Contact us</ButtonLink>
            </div>
          </div>
          <MapEmbed />
        </div>
      </Section>

      <Section tone="warm">
        <div className="rounded-3xl bg-brand-navy text-white px-8 py-14 text-center">
          <h2 className="text-3xl md:text-4xl text-white">Partner with us in giving</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Your generosity helps us serve our community and share the gospel.
          </p>
          <div className="mt-6">
            <Link href="/give/" className="inline-flex rounded-full bg-brand-gold px-7 py-3.5 text-ink font-semibold hover:bg-brand-gold-soft">
              Give now
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
