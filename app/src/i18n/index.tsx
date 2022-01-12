import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationResources } from "./resources";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGES = ["en", "pt"];

i18n.use(initReactI18next).init({
  resources: translationResources,
  lng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export const useTranslate = () => {
  const { t } = useTranslation();
  return { t };
};

export const useLanguageChange = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    let isSubscribed = true;
    i18n.on("languageChanged", (lng) => {
      if (isSubscribed) {
        setLanguage(lng);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  return { language };
};

export const setLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export default i18n;
