// Gestione traduzioni
// https://vue-i18n.intlify.dev/

import { createI18n } from 'vue-i18n';

export const SUPPORT_LOCALES = ["en", "it"];

const loadLocaleMessages = async (locale: string) => {
  try {
    const messages = await import(`./locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
    return {};
  }
};

const formatsCache: Record<string, any> = {};

const loadFormats = async (locale: string) => {
  if (formatsCache[locale]) {
    return formatsCache[locale];
  }

  try {
    let formats;
    switch (locale) {
      case 'en':
        formats = await import(`./formats/en`);
        break;
      default:
        formats = await import(`./formats/it`);
    }

    formatsCache[locale] = formats.default;
    return formats.default;
  } catch (error) {
    console.error(`Failed to load formats for ${locale}:`, error);
    return { numberFormats: {}, datetimeFormats: {} };
  }
};

const itMessages = await loadLocaleMessages("it");
// precarico i messaggi in inglese
const messages = { it: itMessages } as {
  [key: typeof SUPPORT_LOCALES[number]]: any;
};

const i18n = createI18n({
  legacy: false,
  locale: 'it',
  fallbackLocale: 'it',
  messages,
  numberFormats: {},
  datetimeFormats: {},
});

const loadAndSetLocale = async (locale: string) => {
  const messages = await loadLocaleMessages(locale);
  const formats = await loadFormats(locale);
  i18n.global.setLocaleMessage(locale, messages);
  i18n.global.setNumberFormat(locale, formats.numberFormats);
  i18n.global.setDateTimeFormat(locale, formats.datetimeFormats);
  i18n.global.locale.value = locale;
};

export { i18n, loadAndSetLocale };