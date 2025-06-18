import { useIntl } from "react-intl";
import type { ReactNode } from "react";
import { type SelectChangeEvent, Typography } from "@mui/material";

import { TableConfig } from "@/config/config";
import { SelectField } from "../SelectField";
import { PaginationPerPageWrapper } from "./PaginationWrapper";

const OPT = TableConfig.rowsPerPage;

interface PaginationPerPageCompProps {
  perPage: number;
  className?: string;
  setPage: (v: number) => void;
  setPerPage?: (v: number) => void;
}

const PaginationPerPageComp = ({
  setPage,
  className,
  setPerPage,
  perPage = 10,
}: PaginationPerPageCompProps) => {
  const intl = useIntl();
  const handleOnChange = (event: SelectChangeEvent<unknown>, _: ReactNode) => {
    setPage(1);
    setPerPage?.(event.target.value as number);
  };

  return (
    <PaginationPerPageWrapper className={`pp_pw ${className}`}>
      <SelectField
        size="small"
        value={`${perPage}`}
        onChange={handleOnChange}
        className="pp_pw-select"
        options={OPT.map((i) => ({ label: `${i}`, value: `${i}` }))}
      />

      <Typography className="pp_pw-label">
        {intl.formatMessage({ id: "per_page" })}
      </Typography>
    </PaginationPerPageWrapper>
  );
};

export { PaginationPerPageComp };
