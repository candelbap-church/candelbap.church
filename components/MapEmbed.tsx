import { site } from '@/content/site';

export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm ${className}`}>
      <iframe
        src={site.address.mapEmbedSrc}
        title={`Map to ${site.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
