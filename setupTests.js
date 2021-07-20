import '@testing-library/jest-dom';

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ['image.tmdb.org'],
    path: '/_next/image',
    loader: 'default',
  },
};
