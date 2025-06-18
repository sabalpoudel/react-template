import { extractFromCookies } from "../../_utils";
import { DEFAULT_LOCALE, type TLang } from "@/config/config";

const getLang = (): TLang =>
  extractFromCookies("NEXT_LOCALE") || DEFAULT_LOCALE;

export { getLang };
