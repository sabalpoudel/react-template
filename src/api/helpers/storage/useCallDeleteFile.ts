import useSWRMutation from "swr/mutation";

import { PatchApi } from "@api/api";
import { StorageLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";
const link = (v?: number) =>
  `${StorageLink}/${v ? `delete-from-platform/${v}` : "delete"}`;
type TCallDeleteFile = {
  platformId?: number;
  onSuccess: () => void;
};

export const useCallDeleteFile = ({
  platformId,
  onSuccess,
}: TCallDeleteFile) => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    link(platformId),
    PatchApi,
    { onSuccess, onError: handleDefaultError(errKey) }
  );

  return {
    data,
    error,
    loading: isMutating,
    callDeleteFile: trigger,
  };
};
