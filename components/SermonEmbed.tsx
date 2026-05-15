type Props = {
  src: string;
  title?: string;
  className?: string;
};

export function SermonEmbed({ src, title = 'Latest Sermon', className = '' }: Props) {
  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm ${className}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
