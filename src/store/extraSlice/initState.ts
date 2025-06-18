import { getLocalStorage } from "@/_utils";
import {
  type Locale,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "@/config/config";

type TFileRelatedModalType = "delete";

type TFile = { id: number; name: string; platformId?: number };

type TExtraState = {
  locale: Locale;
  rightModalType: "BTM1" | "BTM2" | "invite" | "platform" | null;
  fileRelatedModal: (TFile & { mType: TFileRelatedModalType }) | null;
};

type TRightModalType = TExtraState["rightModalType"];
type TFileRelatedModal = TExtraState["fileRelatedModal"];

export type { TExtraState, TRightModalType, TFileRelatedModal };

function getInitialLocale(): Locale {
  const browserLocale =
    getLocalStorage("locale") || navigator.language.split("-")[0];

  return Object.values(SUPPORTED_LOCALES).includes(browserLocale as Locale)
    ? (browserLocale as Locale)
    : DEFAULT_LOCALE;
}

const initialState: TExtraState = {
  rightModalType: null,
  fileRelatedModal: null,
  locale: getInitialLocale(),
};

export default initialState;
