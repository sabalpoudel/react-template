"use client";
import { useState } from "react";

type TUseTab = {
  val: string;
};

type RTUseTab = {
  activeTab: string;
  onTabChange: (i: string) => void;
};
export const useTabState = ({ val }: TUseTab): RTUseTab => {
  const [accTab, setAccTab] = useState(val);

  const onTabChange = (t: string) => {
    setAccTab(t);
  };

  return {
    onTabChange,
    activeTab: accTab || val,
  };
};
