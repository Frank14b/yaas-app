import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useFormStore } from "@/stores";
import { UseFormReturn } from "react-hook-form";
import { AnyObject } from "yup";

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
  lightColor,
  darkColor,
  keyboardType,
  multiline = false,
  ...rest
}: ThemedInputProps) {
  const theme = useColorScheme() ?? "light";
  const [isPasswordField] = useState(keyboardType === "visible-password");
  const [hasError, setHasError] = useState<AnyObject | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const { reactHookUseForm } = useFormStore();
  const { formState, register, setValue, watch } =
    (reactHookUseForm as UseFormReturn<any>) ?? {};

  const { errors } = formState ?? {};

  const value = watch?.(name);

  useEffect(() => {
    if (!errors) return setHasError(null);
    if (errors[name]) {
      setHasError(errors[name] as AnyObject);
    } else if (name.includes(".")) {
    }
  }, [name, errors, setHasError]);

  const showPlainValue = useMemo(() => {
    if (isPasswordField) {
      return !passwordVisible;
    }
    return false;
  }, [isPasswordField, passwordVisible]);

  const dynamicStyle: StyleSheet.NamedStyles<any> = {
    input: {
      color: theme == "dark" ? "#fff" : "#444",
      borderColor: hasError ? "red" : "gray",
      paddingRight: isPasswordField ? 50 : 8,
    },
  };

  if (multiline) {
    dynamicStyle.input["height"] = 130;
  }

  if (!reactHookUseForm) return <></>;

  return (
    <>
      <ThemedText lightColor="#222" darkColor="#fff">
        {label}
      </ThemedText>
      <ThemedView style={styles.viewWrapper}>
        <TextInput
          value={value}
          showSoftInputOnFocus={true}
          secureTextEntry={showPlainValue}
          onChangeText={(t: string) => setValue(name, t)}
          style={[styles.input, { ...dynamicStyle.input }, style]}
          multiline={multiline}
          placeholderTextColor={"#aaa"}
          keyboardType={keyboardType}
          {...rest}
          {...register(name)}
        />

        {isPasswordField && (
          <ThemedText
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.passwordEye}
            lightColor="#222"
            darkColor="#fff"
          >
            {passwordVisible ? (
              <Ionicons size={22} name="eye-off" />
            ) : (
              <Ionicons size={22} name="eye" />
            )}
          </ThemedText>
        )}
      </ThemedView>
      {hasError && (
        <ThemedView style={{ marginTop: -15, backgroundColor: "transparent" }}>
          <ThemedText type="small" darkColor="red" lightColor="red">
            {hasError.message}
          </ThemedText>
        </ThemedView>
      )}
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
    textAlignVertical: "top",
  },
  passwordEye: {
    position: "absolute",
    right: 15,
    top: 5,
  },
});
