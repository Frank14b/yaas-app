import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

export enum ThemeFABPosition {
  "center",
  "bottom-right",
  "bottom-left",
  "top-left",
  "top-right",
}

const ThemeFABPositionStyle = {
  center: {},
  "bottom-right": {
    right: 25,
    bottom: 30,
  },
  "bottom-left": {
    left: 25,
    bottom: 30,
  },
  "top-left": {
    left: 25,
    top: 60,
  },
  "top-right": {
    right: 25,
    top: 60,
  },
};

export type ThemeFABProps = TouchableOpacityProps & {
  position: keyof typeof ThemeFABPosition;
  style?: any;
};

export function ThemeFAB({ position, style, ...rest }: ThemeFABProps) {
  const dynamicStyle = {
    ...ThemeFABPositionStyle[position],
  };

  return (
    <>
      <TouchableOpacity
        {...rest}
        style={[styles.button, { ...dynamicStyle }, style]}
      >
        <ThemedText>
          <Ionicons name="add" size={24} color="white" />
        </ThemedText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    position: "absolute",
  },
});
