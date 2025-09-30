'use client';

import { usePathname } from 'next/navigation';
import custom from '../custom.module.css';

export default function PageHeader() {
  const pathname: string = usePathname();
  const pageName: string =
    pathname === '/'
      ? 'Home'
      : pathname?.slice(pathname.lastIndexOf('/') + 1) || 'Home';

  return (
    <h1 className={custom.pageHeader}>
      {(pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace(
        /-/g,
        ' ',
      )}
      {/* Convert dashes back to spaces   */}
    </h1>
  );
}
