import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { ComponentProps } from "react";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export type NavigationMenuItemProps = IconProps<
  ComponentProps<typeof Ionicons>["name"]
> &
  TouchableOpacityProps & {
    title: string;
  };

export function NavigationMenuItem({
  name,
  title,
  ...props
}: NavigationMenuItemProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <TouchableOpacity {...props} style={{ paddingVertical: 15 }}>
        <ThemedView style={[styles.viewWrapper]}>
          <Ionicons
            name={name}
            size={22}
            style={[{ color: theme == "dark" ? "#fff" : "#222" }]}
          />
          <ThemedText lightColor="#222" darkColor="#fff" style={[styles.title]}>
            {title}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    marginLeft: 5,
  },
});
