import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";

export type ThemedInputProps = TextInputProps & {
  label: string;
  name: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({
  label,
  name,
  style,
  defaultValue,
  lightColor,
  darkColor,
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const theme = useColorScheme() ?? "light";

  const [text, setText] = useState(defaultValue);
  const [hasError, setHasError] = useState<boolean>(false);

  const dynamicStyle = {
    // backgroundColor: theme == "dark" ? "dark" : "gray",
    label: {
      color: theme == "dark" ? "#fff" : theme,
    },
    input: {
      color: "#fff",
      borderColor: hasError ? "red" : "gray",
    },
  };

  return (
    <>
      <Text style={[styles.label, { ...dynamicStyle.label }]}>{label}</Text>
      <TextInput
        value={text}
        showSoftInputOnFocus={true}
        onChangeText={(t: string) => setText(t)}
        style={[styles.input, { ...dynamicStyle.input }, style]}
        {...rest}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    padding: 1,
    paddingBottom: 6
  },
  input: {
    height: 35,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 15
  },
});
