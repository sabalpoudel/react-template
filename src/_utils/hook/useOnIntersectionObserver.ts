"use client";
import { useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverProps {
  enabled?: boolean; // Optional flag to control if the observer should be active
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  onIntersect: () => void;
}

export const useOnIntersectionObserver = ({
  onIntersect,
  root = null,
  enabled = true,
  threshold = 0.1,
  rootMargin = "200px",
}: UseIntersectionObserverProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(handleObserver, {
      root,
      rootMargin,
      threshold,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver, root, rootMargin, threshold, enabled]);

  return observerRef;
};
