const TabScreenSize = 768;

const LOCALES = ["ja", "en"];
const DEFAULT_LOCALE = "ja";
type TLang = "ja" | "en";

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
};
export type { TTimeZone, TLang };
