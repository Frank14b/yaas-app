import { Modal, ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export type ThemedDialogProps = {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  handleClose: () => void;
};

export function ThemedDialog({
  open,
  title,
  children,
  handleClose,
}: ThemedDialogProps) {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          handleClose();
        }}
      >
        <ThemedView style={styles.centeredView}>
          <ThemedText type="subtitle" style={styles.modalTitle}>
            {title}
          </ThemedText>
          <ScrollView style={styles.modalScrollView}>
            <ThemedView style={styles.modalView}>{children}</ThemedView>
          </ScrollView>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 100,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalScrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalTitle: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: "left",
    paddingHorizontal: 25,
  },
  modalView: {
    flex: 1,
  },
});
