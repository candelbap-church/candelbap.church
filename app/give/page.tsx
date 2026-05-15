import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Give',
  description: `Support the ministry of ${site.name} through your generous giving.`,
};

export default function GivePage() {
  return (
    <>
      <Section tone="soft">
        <div className="max-w-3xl">
          <p className="text-brand-gold font-semibold tracking-wide text-sm">Give</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Partner with us</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{site.giving.intro}</p>
        </div>
      </Section>

      <Section tone="warm">
        <h2 className="text-3xl">Bank Transfer</h2>
        {site.giving.bankAccounts.length === 0 ? (
          <Card className="mt-6 max-w-xl">
            <p className="text-muted">
              Bank account details will be posted here soon. For now, please reach out at{' '}
              <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{' '}
              for giving instructions.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-4xl">
            {site.giving.bankAccounts.map((a) => (
              <Card key={a.accountNumber}>
                <p className="font-display text-xl text-brand-navy">{a.bank}</p>
                <dl className="mt-3 text-sm space-y-1">
                  <div>
                    <dt className="inline text-muted">Account name: </dt>
                    <dd className="inline font-medium">{a.accountName}</dd>
                  </div>
                  <div>
                    <dt className="inline text-muted">Account number: </dt>
                    <dd className="inline font-mono">{a.accountNumber}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {site.giving.qrCodes.length > 0 && (
        <Section tone="soft">
          <h2 className="text-3xl">Scan to Give</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3 max-w-4xl">
            {site.giving.qrCodes.map((q) => (
              <Card key={q.label} className="text-center">
                <p className="font-semibold">{q.label}</p>
                <div className="mt-4 mx-auto w-48 h-48 relative">
                  <Image src={q.image} alt={`${q.label} QR code`} fill className="object-contain" />
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section tone="warm">
        <Card className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-brand-navy">A note on giving</h2>
          <p className="mt-3 text-muted">
            &quot;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
            for God loves a cheerful giver.&quot; — 2 Corinthians 9:7
          </p>
        </Card>
      </Section>
    </>
  );
}
