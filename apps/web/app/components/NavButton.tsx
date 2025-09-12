'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import useOnScreen from './useOnScreen';
import styles from '../page.module.css';

export interface NavButtonProps {
  buttonName?: string;
  pageTarget: string;
  className?: string;
}

export default function NavButton({
  pageTarget,
  className,
  buttonName,
}: NavButtonProps) {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(
    null,
  ) as React.RefObject<HTMLButtonElement>;
  //^^ Creates a ref object which observer can use to find the button element
  const isVisible = useOnScreen(ref); // Uses the custom hook to determine if the button is visible

  if (isVisible) {
    router.prefetch(pageTarget); // Prefetch the page when the button is visible
  }

  function handleRoute(pageRoute: string) {
    router.push(pageRoute);
  }
  return (
    // Have to pass ref as attribute to the button element so React can populate ref with the actual DOM element
    <button
      ref={ref}
      className={className}
      onClick={() => handleRoute(pageTarget)}
    >
      {buttonName ? buttonName : 'Nav Button'}
    </button>
  );
}
