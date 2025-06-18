import useSWR from "swr";

import { GetApi } from "@api/api";
import { StorageLink } from "@api/link";
import { handleDefaultError } from "@api/utils";
import { objectToParams } from "@utils/parseObjToParams";
import type {
  TFetchFilesFilter,
  TFetchFilesReq,
} from "@api/interface/TStorage";

const link = (g?: number) =>
  `${StorageLink}/${g ? `platform-files/${g}` : "files"}`;
const ERROR_KEY = "default_error_message";

type TParams = {
  platformId?: number;
  files?: TFetchFilesReq;
  filter: Partial<TFetchFilesFilter>;
};
export const useFetchFiles = ({ filter, platformId, files }: TParams) => {
  const { mutate, error, data, isLoading } = useSWR(
    `${link(platformId)}?${objectToParams(filter)}`,
    (url) => GetApi<TFetchFilesReq>(url, { arg: { endpoint: "main" } }),
    {
      fallbackData: files,
      onError: handleDefaultError(ERROR_KEY),
    }
  );

  return {
    error,
    mutate,
    loading: isLoading,
    list: data?.data?.rows,
    count: data?.data?.count,
  };
};
