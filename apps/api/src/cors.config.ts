const whitelist: string[] = [
  'http://localhost:3001',
  'https://f25-cisc474-individual-pj71t1c02-kevins-projects-3fcdc5db.vercel.app/', // Personal Link
  'https://f25-cisc474-individual-web-git-main-kevins-projects-3fcdc5db.vercel.app/', // Shared Link
];

export const cors = {
  origin: whitelist,
};
