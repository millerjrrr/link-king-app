import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./en";
import pt from "./pt";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: RNLocalize.getLocales()[0].languageTag,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
