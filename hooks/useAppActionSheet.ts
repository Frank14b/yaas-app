import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTranslation } from "react-i18next";

export type AppActionSheetOptions = {
  key?: number;
  title: string;
  destructiveBtn: boolean;
  cancelBtn: boolean;
  icon?: React.ReactNode;
  isHidden?: boolean;
  callBackFn: () => void;
};

export function useAppActionSheet({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  //
  const { t } = useTranslation();

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = (data: AppActionSheetOptions[]) => {
    //
    const activeData: any[] = [];

    let index = 0;
    for (let item of data) {
      if (item.isHidden != true) {
        if (index == 0) {
          activeData.push(item);
        } else {
          activeData.push({
            ...item,
            title: t(
              `actionSheetMenu.${item.title.replaceAll(" ", "-").toLowerCase()}`
            ),
          });
        }
        index++;
      }
    }

    try {
      const formattedData = activeData.map((item) => {
        return item.title;
      });

      const cancelButtonIndex = activeData.findIndex(
        (item) => item.cancelBtn == true
      );

      const destructiveButtonIndex = activeData.findIndex(
        (item) => item.destructiveBtn == true
      );

      const icons = activeData.map((item) => {
        return item.icon ?? "";
      });

      if (formattedData.length == 0) return;
      //
      showActionSheetWithOptions(
        {
          options: formattedData as string[],
          cancelButtonIndex,
          destructiveButtonIndex,
          icons,
          cancelButtonTintColor: "red",
          showSeparators: true,
          // title,
          // message,
          disabledButtonIndices: [0],
        },
        (selectedIndex: number | undefined) => {
          if (selectedIndex) {
            activeData[selectedIndex].callBackFn();
          }
        }
      );
    } catch (error) {}
  };

  return { openActionSheet };
}
