import { useState, useEffect } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { ClientThemeProvider } from "./components/bits/MUI/ClientThemeProvider";
import { Provider } from "react-redux";
import { reduxStore } from "./store/store";

type TranslationMessages = Record<string, string>;

const SUPPORTED_LOCALES = {
  ENGLISH: "en",
  JAPANESE: "ja",
} as const;

type Locale = (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];

const DEFAULT_LOCALE = SUPPORTED_LOCALES.ENGLISH;

function getInitialLocale(): Locale {
  const browserLocale =
    localStorage.getItem("locale") || navigator.language.split("-")[0];

  return Object.values(SUPPORTED_LOCALES).includes(browserLocale as Locale)
    ? (browserLocale as Locale)
    : DEFAULT_LOCALE;
}

// Cache for loaded messages
const messageCache: Partial<Record<Locale, TranslationMessages>> = {};

async function loadMessages(locale: Locale): Promise<TranslationMessages> {
  // Return cached messages if available
  if (messageCache[locale]) {
    return messageCache[locale] as TranslationMessages;
  }

  try {
    let messages: TranslationMessages;
    switch (locale) {
      case SUPPORTED_LOCALES.ENGLISH:
        messages = (await import("./lang/en.json")).default;
        break;
      case SUPPORTED_LOCALES.JAPANESE:
        messages = (await import("./lang/jp.json")).default;
        break;
      default:
        messages = (await import(`./lang/${DEFAULT_LOCALE}.json`)).default;
    }

    // Cache the loaded messages
    messageCache[locale] = messages;
    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return (await import(`./lang/${DEFAULT_LOCALE}.json`)).default;
  }
}

function LocalizationWrapper() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [messages, setMessages] = useState<TranslationMessages | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    loadMessages(locale)
      .then((loadedMessages) => {
        setMessages(loadedMessages);
      })
      .catch((err) => {
        console.error("Localization loading error:", err);
        setError("Failed to load localization data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [locale]);

  const handleLocaleChange = (locale: Locale) => {
    document.documentElement.lang = locale;

    setLocale(locale);
    localStorage.setItem("locale", locale);
  };

  if (loading) {
    return <div>Loading translations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!messages) {
    return <div>No translation messages available</div>;
  }

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={(err) => {
        if (err.code !== "MISSING_TRANSLATION") {
          console.error("IntlProvider error:", err);
        }
      }}
    >
      <Provider store={reduxStore}>
        <ClientThemeProvider locale={locale} className={"ClientThemeProvider"}>
          <App locale={locale} onLocaleChange={handleLocaleChange} />
        </ClientThemeProvider>
      </Provider>
    </IntlProvider>
  );
}

export default LocalizationWrapper;

function App({ locale, onLocaleChange }) {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <select value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
          <option value="en">en</option>
          <option value="ja">jp</option>
        </select>
      </div>

      <FormattedMessage id="simple" />
      <br />
      <FormattedMessage id="argument" values={{ name: "John" }} />
    </div>
  );
}
