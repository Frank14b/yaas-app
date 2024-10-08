import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";

export type ThemedFormViewProps = {
  children: React.ReactNode;
  style?: any;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedFormView({ style, children }: ThemedFormViewProps) {
  //
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.wrapper}
    >
      <ScrollView
        contentContainerStyle={[
          { ...styles.scrollViewContainer },
          style,
          keyboardHeight > 0 && { paddingBottom: keyboardHeight },
        ]}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: "center",
    flexGrow: 1, // Optional to fill available space
  },
});
