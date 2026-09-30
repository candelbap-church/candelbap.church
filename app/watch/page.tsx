import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SermonEmbed } from '@/components/SermonEmbed';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Watch',
  description: `Watch ${site.name} sermons and live services online.`,
};

export default function WatchPage() {
  return (
    <>
      <Section tone="warm">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">Watch</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Sermons & Live Services</h1>
          <p className="mt-6 text-lg text-ink/80">
            Worship with us online. Our Sunday services are streamed on Facebook and uploaded to YouTube.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={site.contact.facebook} variant="primary" external>
              Watch on Facebook
            </ButtonLink>
            <ButtonLink href={site.contact.youtube} variant="secondary" external>
              YouTube Channel
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="text-3xl text-center">Latest from YouTube</h2>
        <div className="mt-10 max-w-4xl mx-auto">
          <SermonEmbed src={site.latestSermonEmbed} title="Latest sermon" />
        </div>
        <p className="mt-6 text-center text-ink/80 text-sm">
          Subscribe at <a className="underline" href={site.contact.youtube} target="_blank" rel="noopener noreferrer">{site.contact.youtubeChannelHandle}</a> for the latest uploads.
        </p>
      </Section>
    </>
  );
}
