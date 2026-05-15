import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'about', 'watch', 'give', 'contact'];
  const now = new Date();
  return pages.map((p) => ({
    url: `${site.url}/${p ? p + '/' : ''}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
}
