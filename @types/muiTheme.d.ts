import {
  Palette,
  PaletteMode,
  PaletteColor,
  PaletteOptions,
} from "@mui/material/styles/createPalette";

// Extend the PaletteColor interface to include custom colors
declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    dark2?: string; // Custom color property
  }
  // Extend the TypeBackground interface to include the `light` property
  interface TypeBackground {
    light?: string; // Custom color property
  }
  interface TypeText {
    text2?: string; // Custom color property
  }

  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    // Extend other palettes if needed
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    background?: Partial<TypeBackground>;
    text?: Partial<TypeText>;
    // Extend other palettes if needed
  }
}

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    palette: Palette;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}
