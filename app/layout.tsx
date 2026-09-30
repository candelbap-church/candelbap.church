import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MessengerFab } from '@/components/MessengerFab';
import { PostHogProvider } from '@/components/PostHogProvider';
import { site } from '@/content/site';
import '@/styles/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.shortName}` },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  icons: { icon: '/icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <PostHogProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MessengerFab />
        </PostHogProvider>
      </body>
    </html>
  );
}
