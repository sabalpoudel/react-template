"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const getGuideType = (searchParam: URLSearchParams) => {
  if (searchParam.has("ban_guide")) return "ban_guide";
  if (searchParam.has("sky_sales_exhibitor_toc"))
    return "sky_sales_exhibitor_toc";
  if (searchParam.has("sky_sales_my_platform_too"))
    return "sky_sales_my_platform_too";
  if (searchParam.has("privacy_policy")) return "privacy_policy";
  if (searchParam.has("usage_guide")) return "usage_guide";
  if (searchParam.has("faq")) return "faq";
  return "terms_conditions";
};

export const useGetUserGuideType = (): string => {
  const searchParam = useSearchParams();
  const [guideType, setGuideType] = useState(() => getGuideType(searchParam));

  useEffect(() => {
    setGuideType(getGuideType(searchParam));
  }, [searchParam.toString()]);

  return guideType;
};
