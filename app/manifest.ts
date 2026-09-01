import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Indian Infotech',
    short_name: 'Indian Infotech',
    description: 'Biometric attendance, HRMS, payroll, access control, visitor management, and workplace automation solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f7f8',
    theme_color: '#071923',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
