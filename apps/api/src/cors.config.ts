const whitelist: string[] = [
  'http://localhost:3001',
  'https://cisc474-lms-project.kevinjkramer168.workers.dev', // Cloudflare deployment URL
];

export const cors = {
  origin: whitelist,
};
