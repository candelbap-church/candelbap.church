import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { MapEmbed } from '@/components/MapEmbed';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Visit or get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <Section tone="warm">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">Visit</p>
          <h1 className="mt-3 text-4xl md:text-5xl">We&apos;d love to meet you</h1>
          <p className="mt-6 text-lg text-ink/80">
            Drop in for a service, or send us a message — we&apos;ll get back to you.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl text-brand-navy">Address</h2>
              <p className="mt-3 text-ink/80">
                {site.address.line1}, {site.address.line2}
                <br />
                {site.address.city}, {site.address.region}
                <br />
                {site.address.country}
              </p>
              <div className="mt-4">
                <ButtonLink href={site.address.mapsUrl} variant="primary" external>
                  Get Directions
                </ButtonLink>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl text-brand-navy">Service Times</h2>
              <ul className="mt-3 space-y-1 text-ink/80">
                {site.services.map((s) => (
                  <li key={s.day}>
                    <span className="text-ink font-medium">{s.day}:</span> {s.name} — {s.time}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl text-brand-navy">Get in touch</h2>
              <p className="mt-3 text-ink/80 text-sm">The fastest way to reach us is on Messenger.</p>
              <div className="mt-4">
                <ButtonLink href={site.contact.messenger} variant="primary" external>
                  Message us on Facebook
                </ButtonLink>
              </div>
              <ul className="mt-5 space-y-2 text-ink/80 text-sm">
                <li>
                  Email:{' '}
                  <a className="underline" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  Phone:{' '}
                  <a className="underline" href={site.contact.phoneHref}>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  Facebook:{' '}
                  <a className="underline" href={site.contact.facebook} target="_blank" rel="noopener noreferrer">
                    fb.com/candelbap.church
                  </a>
                </li>
                <li>
                  Instagram:{' '}
                  <a className="underline" href={site.contact.instagram} target="_blank" rel="noopener noreferrer">
                    instagram.com/candelbap.church
                  </a>
                </li>
                <li>
                  YouTube:{' '}
                  <a className="underline" href={site.contact.youtube} target="_blank" rel="noopener noreferrer">
                    {site.contact.youtubeChannelHandle}
                  </a>
                </li>
              </ul>
            </Card>
          </div>
          <MapEmbed className="md:sticky md:top-24" />
        </div>
      </Section>
    </>
  );
}
