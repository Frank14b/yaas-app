import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useFormStore } from "@/stores";
import { UseFormReturn } from "react-hook-form";
import { AnyObject } from "yup";

import RNDateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";

export type ThemedFormDateTimeProps = {
  label: string;
  name: string;
} & {
  datePickerProps?: AndroidNativeProps | WindowsNativeProps | IOSNativeProps;
};

export function ThemedFormDateTime({
  label,
  name,
  ...rest
}: ThemedFormDateTimeProps) {
  const [hasError, setHasError] = useState<AnyObject | null>(null);

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

  const handleDateSelected = useCallback((date?: Date) => {
    setValue?.(`${name}`, date, { shouldValidate: true });
  }, [setValue]);

  if (!reactHookUseForm) return <></>;

  register(name);

  return (
    <>
      <ThemedText lightColor="#222" darkColor="#fff">
        {label}
      </ThemedText>
      <ThemedView style={styles.viewWrapper}>
        <RNDateTimePicker
          onChange={(_, date) => handleDateSelected(date)}
          {...rest.datePickerProps}
          value={value ? new Date(value) : new Date()}
        />
      </ThemedView>
      {hasError && (
        <ThemedView>
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
});
