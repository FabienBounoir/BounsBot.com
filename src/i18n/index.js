import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsInEng from '../locales/en/translation.json';
import translationsInFrench from '../locales/fr/translation.json';
import translationsInEspanol from '../locales/es/translation.json';
import translationsInItalian from '../locales/it/translation.json';
import translationsInArabian from '../locales/ar/translation.json';
import translationsInRussian from '../locales/ru/translation.json';
import translationsInChinese from '../locales/zh/translation.json';

// the translations
const resources = {
  en: {
    translation: translationsInEng
  },
  fr: {
    translation: translationsInFrench
  },
  es: {
    translation: translationsInEspanol
  },
  it: {
    translation: translationsInItalian
  },
  ar: {
    translation: translationsInArabian
  },
  ru: {
    translation: translationsInRussian
  },
  zh: {
    translation: translationsInChinese
  }
};

console.log("i18n", navigator.language);

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, // resources are important to load translations for the languages.
    lng: navigator.language, //"fr", // It acts as default language. When the site loads, content is shown in this language.  
    debug: true,
    fallbackLng: "en", // use de if selected language is not available
    interpolation: {
      escapeValue: false
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation"
  });

export default i18n;