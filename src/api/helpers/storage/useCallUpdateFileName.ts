import useSWRMutation from "swr/mutation";

import { PatchApi } from "@api/api";
import { StorageLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";
const link = (f?: number, g?: number) =>
  `${StorageLink}/${g ? `file-from-platform/${f}/${g}` : `file/${f}`}`;

type TCallUpdateFileName = {
  fileId?: number;
  platformId?: number;
  onSuccess: () => void;
};

export const useCallUpdateFileName = ({
  fileId,
  platformId,
  onSuccess,
}: TCallUpdateFileName) => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    fileId ? link(fileId, platformId) : null,
    PatchApi,
    { onSuccess, onError: handleDefaultError(errKey) }
  );

  return {
    data,
    error,
    loading: isMutating,
    callUpdateFileName: trigger,
  };
};
