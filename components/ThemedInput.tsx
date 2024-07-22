// import { useThemeColor } from "@/hooks/useThemeColor";
import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

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
  keyboardType,
  ...rest
}: ThemedInputProps) {
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const theme = useColorScheme() ?? "light";
  const [isPasswordField] = useState(keyboardType === "visible-password");
  const [text, setText] = useState(defaultValue);
  const [hasError, setHasError] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const showPlainValue = useMemo(() => {
    if (isPasswordField) {
      return !passwordVisible;
    }
    return false;
  }, [isPasswordField, passwordVisible]);

  const dynamicStyle = {
    label: {
      color: theme == "dark" ? "#fff" : theme,
    },
    input: {
      color: "#fff",
      borderColor: hasError ? "red" : "gray",
      paddingRight: isPasswordField ? 50 : 8,
    },
  };

  return (
    <>
      <Text style={[styles.label, { ...dynamicStyle.label }]}>{label}</Text>
      <ThemedView style={styles.viewWrapper}>
        <TextInput
          value={text}
          showSoftInputOnFocus={true}
          secureTextEntry={showPlainValue}
          onChangeText={(t: string) => setText(t)}
          style={[styles.input, { ...dynamicStyle.input }, style]}
          {...rest}
        />

        {isPasswordField && (
          <ThemedText
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.passwordEye}
          >
            EYE
          </ThemedText>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    padding: 1,
    paddingBottom: 6,
  },
  viewWrapper: {
    backgroundColor: "transparent",
  },
  input: {
    height: 35,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 15,
  },
  passwordEye: {
    position: "absolute",
    right: 15,
    top: 6,
  },
});
