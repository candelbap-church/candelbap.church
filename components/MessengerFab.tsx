import { site } from '@/content/site';

export function MessengerFab() {
  return (
    <a
      href={site.contact.messenger}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on Facebook Messenger"
      className="group fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 flex items-center gap-2 rounded-full bg-[#0084ff] text-white shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:bg-[#006fdb] hover:shadow-xl hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 pl-3 pr-4 py-3 print:hidden"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-60 animate-ping motion-reduce:hidden" />
        <svg
          aria-hidden="true"
          viewBox="0 0 36 36"
          className="h-6 w-6 relative"
          fill="currentColor"
        >
          <path d="M18 2C9.163 2 2 8.59 2 16.728c0 4.605 2.34 8.7 6 11.39V34l5.484-3.012c1.46.404 3.012.624 4.516.624 8.837 0 16-6.59 16-14.884C34 8.59 26.837 2 18 2zm1.59 19.985-4.07-4.343-7.94 4.343 8.738-9.27 4.17 4.343 7.84-4.343-8.738 9.27z" />
        </svg>
      </span>
      <span className="hidden sm:inline text-sm font-semibold">Message us</span>
    </a>
  );
}
