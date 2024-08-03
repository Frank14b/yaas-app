import {
  Animated,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";

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
  //
  const modalRef = useRef(new Animated.Value(0));
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dy }) => {
        Animated.event([{ dy: modalRef.current }], { useNativeDriver: false })({
          dy,
        });
      },
      onPanResponderRelease: (_, { vy }) => {
        if (vy > 1.5) {
          handleClose();
        }

        if (vy > 0.5) {
          Animated.timing(modalRef.current, {
            toValue: -modalHeight,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(modalRef.current, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const [modalHeight, setModalHeight] = useState(0);

  const handleLayout = useCallback(
    (event: any) => {
      setModalHeight(event.nativeEvent.layout.height);
    },
    [setModalHeight]
  );

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
        <Animated.View
          style={{
            top: modalRef.current,
            bottom: 0,
            backgroundColor: "transparent",
            flex: 1,
          }}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          <ThemedView
            lightColor="#f5f5f5"
            darkColor="#111"
            style={styles.centeredView}
          >
            <ThemedText style={styles.ellipsis}>
              <Ionicons name="ellipsis-horizontal" size={15} />
            </ThemedText>
            <ThemedText
              lightColor="#222"
              darkColor="#f5f5f5"
              type="subtitle"
              style={styles.modalTitle}
            >
              {title}
            </ThemedText>
            <ScrollView style={styles.modalScrollView}>
              <ThemedView style={styles.modalView}>{children}</ThemedView>
            </ScrollView>
          </ThemedView>
        </Animated.View>
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
    textAlign: "left",
    paddingHorizontal: 25,
  },
  modalView: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  ellipsis: {
    textAlign: "center",
  },
});
