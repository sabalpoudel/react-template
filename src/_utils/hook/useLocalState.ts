"use client";
import { useEffect, useState } from "react";
import { getLocalStorage, updateLocalStorage } from "..";

type RTUseLocal = [string, (i: string) => void];
export const useLocalState = (name: string, val: string): RTUseLocal => {
  const [local, setLocal] = useState(getLocalStorage(name) || val);

  useEffect(() => {
    const val = getLocalStorage(name);
    setLocal(val);
  }, []);

  const onLocalChange = (val: string) => {
    setLocal(val);
    updateLocalStorage(name, val);
  };

  return [local || val, onLocalChange];
};
