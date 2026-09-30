import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${site.name} — our story, mission, and beliefs.`,
};

export default function AboutPage() {
  return (
    <>
      <Section tone="warm">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">About Us</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Our Story</h1>
          <p className="mt-6 text-lg text-ink/80 leading-relaxed">
            {site.name} has served the community of Candelaria since {site.established}.
            We are a Conservative Baptist congregation committed to faithful worship, biblical teaching,
            and loving our neighbors.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl text-brand-navy">Our Mission</h2>
            <p className="mt-3 text-ink/80">{site.mission}</p>
          </Card>
          <Card>
            <h2 className="text-2xl text-brand-navy">Our Vision</h2>
            <p className="mt-3 text-ink/80">{site.vision}</p>
          </Card>
        </div>
      </Section>

      <Section tone="warm">
        <div className="max-w-3xl">
          <h2 className="text-3xl">What We Believe</h2>
          <p className="mt-4 text-ink/80 leading-relaxed">{site.beliefs}</p>
        </div>
      </Section>

      {site.pastors.length > 0 && (
        <Section tone="white">
          <h2 className="text-3xl text-center">Our Pastors</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {site.pastors.map((p) => (
              <Card key={p.name}>
                <p className="font-display text-2xl text-brand-navy">{p.name}</p>
                <p className="text-brand-gold text-sm font-semibold">{p.role}</p>
                <p className="mt-3 text-ink/80">{p.bio}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
