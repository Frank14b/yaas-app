import { useCallback } from "react";
import { useAppActionSheet } from "./useAppActionSheet";
import { useTranslation } from "react-i18next";
import { storage } from "@/utils/expo-storage";

export function useLanguages() {
  //
  const locale = useTranslation().i18n;
  const { openActionSheet } = useAppActionSheet({});

  const handleChangeLanguage = useCallback((lang: string) => {
    storage.setItem("language", lang);
    locale.changeLanguage(lang);
  }, []);

  const handleOpenActionSheet = useCallback(() => {
    openActionSheet([
      {
        title: `${locale.language}`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {},
      },
      {
        title: `EN - English`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          handleChangeLanguage("en-US");
        },
      },
      {
        title: `SW - Swahili`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          handleChangeLanguage("sw-TZ");
        },
      },
      {
        title: `FR - French`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          handleChangeLanguage("fr-FR");
        },
      },
      {
        title: `Cancel`,
        destructiveBtn: false,
        cancelBtn: true,
        callBackFn: () => {},
      },
    ]);
  }, [locale, openActionSheet, handleChangeLanguage]);

  return {
    openLanguageMenu: handleOpenActionSheet,
  };
}
