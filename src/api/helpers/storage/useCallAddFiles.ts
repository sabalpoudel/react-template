import useSWRMutation from "swr/mutation";

import { StorageLink } from "@api/link";
import { PostApi } from "@api/api";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";
const link = (v?: number) =>
  `${StorageLink}/${v ? `add-to-platform/${v}` : "add"}`;
type TCallAddFiles = {
  platformId?: number;
  onSuccess: () => void;
};

export const useCallAddFiles = ({ platformId, onSuccess }: TCallAddFiles) => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    link(platformId),
    PostApi,
    { onSuccess, onError: handleDefaultError(errKey) }
  );

  return {
    data,
    error,
    loading: isMutating,
    callAddFiles: trigger,
  };
};
