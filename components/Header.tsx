'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/watch/', label: 'Watch' },
  { href: '/give/', label: 'Give' },
  { href: '/contact/', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-bg-warm/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.shortName} home`}>
          <Image src="/logo.png" alt="" width={140} height={32} priority />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink hover:text-brand-navy">
              {l.label}
            </Link>
          ))}
          <ButtonLink href={site.contact.facebook} variant="primary" size="md" external>
            Watch Live
          </ButtonLink>
        </nav>
        <button
          type="button"
          className="md:hidden p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-black/5 bg-bg-warm">
          <ul className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ButtonLink href={site.contact.facebook} variant="primary" size="md" external>
                Watch Live
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
