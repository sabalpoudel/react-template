"use client";
import { jaJP, enUS } from "@mui/material/locale";
import { createTheme, type Direction } from "@mui/material/styles";

import { BREAKPOINTS } from "./constant";
import type { TLang } from "../../_config/config";
import { darkPalette, lightPalette } from "./palette";

export type customInitialProps = {
  lang?: TLang;
  rtl?: boolean;
  darkTheme?: boolean;
};

export type ThemeExtended = customInitialProps;

const cusTheme = {
  dir: "ltr",
  direction: "ltr",
  palette: lightPalette,
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "sans-serif"].join(","),
    button: {
      textTransform: "capitalize" as const,
    },
    h5: {
      fontWeight: "600",
    },
    h6: {
      fontWeight: "600",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: { height: "3px" },
      },
    },
    MuiButton: {
      styleOverrides: {},
    },
  },
};

const getTheme = ({
  rtl = false,
  darkTheme = false,
  lang = "jp",
}: ThemeExtended) => {
  const palette = darkTheme ? darkPalette : lightPalette;
  const styles = {
    ...cusTheme,
    palette,
    dir: rtl ? "rtl" : "ltr",
    direction: rtl ? "rtl" : ("ltr" as Direction),
  };
  return createTheme({ ...styles }, lang === "jp" ? jaJP : enUS); // TS_FIX_ME
};

export const breakpoint = (
  size: string,
  hw: "height" | "width" = "width",
  pos: "max" | "min" = "max"
) => `@media (${pos}-${hw}: ${BREAKPOINTS[hw][size]})`;

export { cusTheme, getTheme };
