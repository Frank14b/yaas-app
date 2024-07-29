import { useActionSheet } from "@expo/react-native-action-sheet";

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

  const openActionSheet = (data: AppActionSheetOptions[]) => {
    //
    const formattedData = data.map((item) => {
      return item.title;
    });

    const cancelButtonIndex = data.findIndex((item) => item.cancelBtn == true);

    const destructiveButtonIndex = data.findIndex(
      (item) => item.destructiveBtn == true
    );

    const icons = data.map((item) => {
      return item.icon ?? "";
    });

    if (formattedData.length == 0) return;
    //
    showActionSheetWithOptions(
      {
        options: formattedData,
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
          data[selectedIndex].callBackFn();
        }
      }
    );
  };

  return { openActionSheet };
}
