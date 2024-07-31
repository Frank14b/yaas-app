import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en-US/translation.json";
import translationFr from "./locales/fr-FR/translation.json";
import translationSw from "./locales/sw-TZ/translation.json";
import { storage } from "@/utils/expo-storage";

const resources = {
  "en-US": { translation: translationEn },
  "fr-FR": { translation: translationFr },
  "sw-TZ": { translation: translationSw },
};

const initI18n = async () => {
  let fallbackLng =
    (await storage.getItem<string>("language")) ??
    Localization.getLocales()[0]?.languageTag;

  if (!resources[`${fallbackLng as keyof typeof resources}`]) {
    fallbackLng = "sw-TZ";
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: fallbackLng,
    fallbackLng: fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  });

  i18n.changeLanguage(fallbackLng);
};

initI18n();

export default i18n;
