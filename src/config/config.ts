const TabScreenSize = 768;

const LOCALES = ["ja", "en"];
type TLang = "ja" | "en";

type TranslationMessages = Record<string, string>;

const SUPPORTED_LOCALES = {
  ENGLISH: "en",
  JAPANESE: "ja",
} as const;

type Locale = (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];

const DEFAULT_LOCALE = SUPPORTED_LOCALES.ENGLISH;

const TableConfig = {
  defaultPerPage: 10,
  rowsPerPage: [10, 25, 50, 100],
};

const default_timezone = "Asia/Tokyo";
const TIMEZONES = [default_timezone, "Asia/Kathmandu"];
type TTimeZone = "Asia/Tokyo" | "Asia/Kathmandu";

export {
  LOCALES,
  TIMEZONES,
  TableConfig,
  TabScreenSize,
  DEFAULT_LOCALE,
  default_timezone,
  SUPPORTED_LOCALES,
};
export type { TTimeZone, TLang, TranslationMessages, Locale };
