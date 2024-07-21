import {
  KeyboardAvoidingView,
  Platform,
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
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 0}
      style={styles.wrapper}
    >
      <ScrollView
        contentContainerStyle={[{ ...styles.scrollViewContainer }, style]}
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
