import { useNavigate } from '@tanstack/react-router';

export default function ImageLink({
  pageTarget,
  src,
  alt,
}: {
  pageTarget: string;
  src: string;
  alt: string;
}) {
  const navigate = useNavigate();
  function handleRoute(route: string) {
    navigate({ to: route, reloadDocument: true });
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
