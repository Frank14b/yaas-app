import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  StyleSheetProperties,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  isLoading?: boolean;
  btnStyle?: any;
};

export function ThemedButton({
  title,
  lightColor,
  darkColor,
  isLoading,
  btnStyle,
  ...rest
}: ThemedButtonProps) {
  return (
    <Pressable {...rest}>
      <ThemedView style={[styles.wrapper]}>
        {isLoading ? (
          <ThemedView style={styles.indicatorWrapper}>
            <ActivityIndicator color={"#fff"} size={"small"} />
          </ThemedView>
        ) : (
          <ThemedText style={[styles.buttonText, btnStyle]}>{title}</ThemedText>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
  },
  indicatorWrapper: {
    backgroundColor: "transparent",
    padding: 12
  }
});
