'use client';

import { useRouter } from 'next/navigation';

export default function ImageLink({
  pageTarget,
  src,
  alt,
}: {
  pageTarget: string;
  src: string;
  alt: string;
}) {
  const router = useRouter();
  function handleRoute(route: string) {
    router.push(route);
  }
  return (
    <img
      src={src}
      alt={alt}
      style={{ cursor: 'pointer' }}
      onClick={() => handleRoute(pageTarget)}
    />
  );
}
