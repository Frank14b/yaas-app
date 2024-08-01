import { useCallback } from "react";
import { useAppActionSheet } from "./useAppActionSheet";
import { useTranslation } from "react-i18next";

export function useLanguages() {
  //
  const locale = useTranslation().i18n;
  const { openActionSheet } = useAppActionSheet({});

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
          locale.changeLanguage("en-US");
        },
      },
      {
        title: `SW - Swahili`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          locale.changeLanguage("sw-TZ");
        },
      },
      {
        title: `Cancel`,
        destructiveBtn: false,
        cancelBtn: true,
        callBackFn: () => {},
      },
    ]);
  }, [locale, openActionSheet]);

  return {
    openLanguageMenu: handleOpenActionSheet,
  };
}
