import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMemo, useState } from "react";

export type AppActionSheetOptions = {
  key?: number;
  title: string;
  destructiveBtn: boolean;
  cancelBtn: boolean;
  icon?: React.ReactNode;
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
  const { showActionSheetWithOptions } = useActionSheet();
  const [options, setOptions] = useState<AppActionSheetOptions[]>([]);

  const formattedOptions = useMemo(() => {
    return options.map((item) => {
      return item.title;
    });
  }, [options]);

  const cancelButtonIndex = useMemo(() => {
    return options.findIndex((item) => item.cancelBtn == true);
  }, [options]);

  const destructiveButtonIndex = useMemo(() => {
    return options.findIndex((item) => item.destructiveBtn == true);
  }, [options]);

  const icons = useMemo(() => {
    return options.map((item) => {
      return item.icon ?? "";
    });
  }, [options]);

  const openActionSheet = () => {
    //
    if (formattedOptions.length == 0) return;
    //
    showActionSheetWithOptions(
      {
        options: formattedOptions,
        cancelButtonIndex,
        destructiveButtonIndex,
        icons,
        cancelButtonTintColor: "red",
        showSeparators: true,
        // title,
        // message,
        disabledButtonIndices: [0]
      },
      (selectedIndex: number | undefined) => {
        if (selectedIndex) {
          console.log("🚀 ~ openActionSheet ~ selectedIndex:", selectedIndex)
          options[selectedIndex].callBackFn();
        }
      }
    );
  };

  return { openActionSheet, setOptions };
}
