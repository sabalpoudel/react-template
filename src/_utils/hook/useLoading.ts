"use client";
import { useState, useCallback } from "react";

type UseLoadingReturn = {
  isLoading: boolean;
  startLoading: (duration?: number, callback?: () => void) => void;
};

export const useLoading = (
  defaultDuration: number = 2000
): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = useCallback(
    (duration: number = defaultDuration, callback: () => void = () => {}) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        callback(); // Execute the callback after loading finishes
      }, duration);
    },
    [defaultDuration]
  );

  return { isLoading, startLoading };
};
