import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { site } from '@/content/site';

export function ServiceTimes() {
  return (
    <Section tone="warm">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl">When We Gather</h2>
        <p className="mt-3 text-muted">We'd love to worship with you.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        {site.services.map((s) => (
          <Card key={s.day} className="text-center">
            <p className="font-display text-2xl text-brand-navy">{s.day}</p>
            <p className="text-muted mt-1">{s.name}</p>
            <p className="mt-4 text-3xl text-brand-gold font-display">{s.time}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
