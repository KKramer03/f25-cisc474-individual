import { createRouter, useNavigate, useRouter } from '@tanstack/react-router';

export interface NavButtonProps {
  buttonName?: string;
  pageTarget: string;
  search?: { [key: string]: string | number | boolean } | undefined;
  params?: { [key: string]: string | number | boolean } | undefined;
  className?: string;
}

export default function NavButton({
  pageTarget,
  className,
  search,
  params,
  buttonName,
}: NavButtonProps) {
  const navigate = useNavigate();

  function handleRoute(pageRoute: string) {
    navigate({ to: pageRoute, search: search, params: params });
  }

  return (
    <button className={className} onClick={() => handleRoute(pageTarget)}>
      {buttonName ? buttonName : 'Nav Button'}
    </button>
  );
}
