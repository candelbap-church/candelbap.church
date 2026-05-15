import Link from 'next/link';
import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="mt-2 text-white/70 text-sm">Since {site.established}</p>
          <p className="mt-4 text-sm text-white/80">
            {site.address.line1}, {site.address.line2}
            <br />
            {site.address.city}, {site.address.region}
            <br />
            {site.address.country}
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">Service Times</p>
          <ul className="text-sm text-white/80 space-y-1">
            {site.services.map((s) => (
              <li key={s.day}>
                <span className="font-medium text-white">{s.day}:</span> {s.name} — {s.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Connect</p>
          <ul className="text-sm text-white/80 space-y-2">
            <li>
              <a href={`mailto:${site.contact.email}`} className="text-white hover:underline">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.facebook} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={site.contact.youtube} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/60 flex justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Link href="/contact/" className="text-white/80 hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
