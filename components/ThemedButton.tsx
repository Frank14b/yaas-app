import {
  Button,
  ButtonProps,
  StyleSheet
} from "react-native";
import { ThemedView } from "./ThemedView";

export type ThemedButtonProps = ButtonProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  title,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {

  return (
    <ThemedView style={[styles.wrapper]}>
      <Button title={title} color={"#fff"}/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#FFA600",
    borderRadius: 5,
    marginVertical: 15
  },
});
