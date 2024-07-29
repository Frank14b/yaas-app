import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  isLoading?: boolean;
};

export function ThemedButton({
  title,
  lightColor,
  darkColor,
  isLoading,
  ...rest
}: ThemedButtonProps) {
  return (
    <Pressable {...rest}>
      <ThemedView style={[styles.wrapper]}>
        {isLoading ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <ThemedText style={styles.buttonText}>{title}</ThemedText>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    marginVertical: 15,
  },

  buttonText: {
    textAlign: "center",
    padding: 5,
  },
});
