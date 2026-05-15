export type ServiceTime = {
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  name: string;
  time: string;
};

export type Pastor = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export type BankAccount = {
  bank: string;
  accountName: string;
  accountNumber: string;
};

export type QrCode = {
  label: string;
  image: string;
};

export const site = {
  name: 'Candelaria Conservative Baptist Church',
  shortName: 'CCBC',
  established: 1970,
  tagline: 'A family of faith in Candelaria — since 1970.',
  url: 'https://candelbap.church',
  yearTheme: {
    year: 2026,
    title: 'Walk with Jesus',
    bannerImage: '/images/walk-with-jesus.png',
    bannerAspectRatio: '16/9' as const,
  },
  address: {
    line1: 'Bansalangin St',
    line2: 'Pahinga Norte',
    city: 'Candelaria',
    region: 'Quezon',
    country: 'Philippines',
    mapsUrl: 'https://maps.app.goo.gl/k5WYwexxcDbvZQ1e6',
    mapEmbedSrc:
      'https://www.google.com/maps?q=Candelaria+Conservative+Baptist+Church+Pahinga+Norte+Candelaria+Quezon&output=embed',
  },
  services: [
    { day: 'Sunday', name: 'Sunday Service', time: '7:30 AM' },
    { day: 'Friday', name: 'Prayer Meeting', time: '6:00 PM' },
  ] satisfies ReadonlyArray<ServiceTime>,
  contact: {
    email: 'hello@candelbap.church',
    facebook: 'https://fb.com/candelbap.church',
    youtube: 'https://www.youtube.com/@candelbap.church',
    youtubeChannelHandle: '@candelbap.church',
  },
  mission: 'To be provided.',
  vision: 'To be provided.',
  beliefs: 'A statement of faith will be added soon.',
  pastors: [] as ReadonlyArray<Pastor>,
  giving: {
    intro:
      'Your generosity supports our worship services, outreach, and community ministries. Thank you for partnering with us.',
    bankAccounts: [] as ReadonlyArray<BankAccount>,
    qrCodes: [] as ReadonlyArray<QrCode>,
  },
  latestSermonEmbed:
    'https://www.youtube.com/embed/videoseries?list=UU&channel=candelbap.church',
} as const;

export type Site = typeof site;
