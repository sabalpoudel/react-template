import React from "react";
import { useIntl } from "react-intl";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import type { TLang } from "../../../config/config";
import { getTheme } from "../../../_style/mui/theme";
import { GlobalStyleWrapper } from "../../../_style/mui/globalStyle";

export const ClientThemeProvider = ({
  locale,
  children,
  className,
}: {
  locale: TLang;
  className: string;
  children: React.ReactNode;
}) => {
  const intl = useIntl();
  const l = intl.locale as TLang;

  const cusTheme = getTheme({ lang: l || locale });

  return (
    <ThemeProvider theme={cusTheme}>
      <CssBaseline />
      <GlobalStyleWrapper className={className}>{children}</GlobalStyleWrapper>
    </ThemeProvider>
  );
};
