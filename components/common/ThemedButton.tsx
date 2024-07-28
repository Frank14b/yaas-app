import {
  ActivityIndicator,
  Button,
  ButtonProps,
  StyleSheet,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants";

export type ThemedButtonProps = ButtonProps & {
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
    <ThemedView style={[styles.wrapper]}>
      {isLoading ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <Button title={title} color={"#fff"} {...rest} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    marginVertical: 15,
  },
});
