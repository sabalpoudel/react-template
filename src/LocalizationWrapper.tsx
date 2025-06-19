import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router";

import {
  type Locale,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type TranslationMessages,
} from "./config/config";
import { localeSelector } from "./store/extraSlice/selectors";

import App from "./App";
import { ClientThemeProvider } from "./components/bits/MUI/ClientThemeProvider";
import { Toaster } from "sonner";

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
  const [messages, setMessages] = useState<TranslationMessages | null>(null);

  const locale = useSelector(localeSelector);

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
      <ClientThemeProvider locale={locale} className={"ClientThemeProvider"}>
        <BrowserRouter>
          <App />
          <Toaster
            closeButton
            position="top-right"
            toastOptions={{ className: "my-toast" }}
          />
        </BrowserRouter>
      </ClientThemeProvider>
    </IntlProvider>
  );
}

export default LocalizationWrapper;
