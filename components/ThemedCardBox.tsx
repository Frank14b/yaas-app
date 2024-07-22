import { ButtonProps, StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { ComponentProps } from "react";

export type ThemedCardBoxProps = IconProps<
  ComponentProps<typeof Ionicons>["name"]
> & {
  title: string;
  value: number;
  lightColor?: string;
  darkColor?: string;
  style?: any;
};

export function ThemedCardBox({
  title,
  lightColor,
  darkColor,
  style,
  name,
  value,
  ...rest
}: ThemedCardBoxProps) {
  const theme = useColorScheme() ?? "light";

  const dynamicStyle = {
    backgroundColor: theme == "dark" ? Colors.secondaryDark : lightColor,
  };

  return (
    <ThemedView style={[styles.wrapper, { ...dynamicStyle }, style]}>
      <ThemedText style={[styles.textIcon, styles.text]}>
        <Ionicons size={30} name={name} />
      </ThemedText>
      <ThemedText style={[styles.text, styles.boxValue]}>{value}</ThemedText>
      <ThemedText style={styles.text}>{title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: 5,
    padding: 10,
    paddingVertical: 15
  },
  textIcon: {
    paddingVertical: 5,
  },
  text: {
    textAlign: "center",
  },
  boxValue: {
    paddingVertical: 10,
  },
});
