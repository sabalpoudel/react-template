"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@translations/routing";

export const useHandleGoBack = () => {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  const handleGoBack = () => {
    if (hasHistory) {
      router.back();
    } else {
      router.push("/app");
    }
  };

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);

  return { hasHistory, handleGoBack };
};
