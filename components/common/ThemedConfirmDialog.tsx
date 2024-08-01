import { ThemedView } from "./ThemedView";
import Dialog from "react-native-dialog";

export type ThemedConfirmDialogProps = {
  title?: string;
  message?: string;
  visible: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  cancelFn?: () => void;
  confirmFn: (...args: Array<any>) => void;
};

export function ThemedConfirmDialog({
  title,
  message,
  visible,
  confirmBtnText,
  cancelBtnText,
  cancelFn,
  confirmFn,
}: ThemedConfirmDialogProps) {
  //
  return (
    <>
      <ThemedView>
        <Dialog.Container visible={visible}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{message}</Dialog.Description>
          <Dialog.Button
            onPress={() => cancelFn?.()}
            color={"red"}
            label={cancelBtnText ?? "Cancel"}
          />
          <Dialog.Button onPress={confirmFn} label={confirmBtnText ?? "Ok"} />
        </Dialog.Container>
      </ThemedView>
    </>
  );
}
