import React from "react";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import { Spinner } from "@components/bits/Spinner";
import { TStorageDetailRecord } from "@api/_interface";

type TProps = {
  loading: boolean;
  className?: string;
  data?: TStorageDetailRecord;
};
export const FileStorageInfo = (props: TProps) => {
  const { loading, data } = props;
  const t = useTranslations("Shared");

  if (loading)
    return (
      <Spinner style={{ position: "relative", inset: "unset", margin: 0 }} />
    );
  else if (data)
    return (
      <Typography variant="h6" color="primary">
        {t(data?.plan || "free")}
        &nbsp;
        {t("plan")}
        {data?.used_storage && data?.total_storage && (
          <Typography component="span" color="textPrimary">
            {` (${data?.used_storage} / ${data?.total_storage})  `}
          </Typography>
        )}
      </Typography>
    );
  else return null;
};
