import useSWR from "swr";

import { GetApi } from "@api/api";
import { StorageLink } from "@api/link";
// import { handleDefaultError } from "@api/utils";
import { type TFetchStorageInfo } from "@api/interface/TStorage";

const link = (g?: number) =>
  `${StorageLink}/info${g ? `-for-platform/${g}` : ""}`;
// const ERROR_KEY = "default_error_message";

type TParams = {
  platformId?: number;
};
export const useFetchStorageInfo = ({ platformId }: TParams) => {
  const { mutate, error, data, isLoading } = useSWR(
    `${link(platformId)}`,
    (url) => GetApi<TFetchStorageInfo>(url, { arg: { endpoint: "main" } }),
    {
      // onError: handleDefaultError(ERROR_KEY),
    }
  );

  return {
    error,
    mutate,
    data: data?.data,
    loading: isLoading,
  };
};
