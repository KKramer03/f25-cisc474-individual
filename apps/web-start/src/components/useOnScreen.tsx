import React, { useEffect, useRef } from 'react';
import { RefObject } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = React.useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  //Ref to hold the later created observer instance and ensure it's not recreated on every render

  useEffect(() => {
    // Observer has to be instantiated in useEffect to avoid server-side rendering issues with Next.js
    const element = ref.current; // Get the observed element from the ref
    observer.current = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) =>
        setIsVisible(entry ? entry.isIntersecting : false),
    ); // New observer instance with a callback to update visibility state

    // useEffect triggers on component mount and unmount, observing the ref element and cleaning up when done
    if (element) {
      observer.current.observe(element);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [ref]);

  return isVisible;
}

// Code from https://stackoverflow.com/questions/45514676/how-to-check-if-element-is-visible-in-dom
