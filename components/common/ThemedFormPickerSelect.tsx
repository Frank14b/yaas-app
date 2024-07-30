import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { ThemedText } from "./ThemedText";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { AnyObject } from "yup";
import { UseFormReturn } from "react-hook-form";
import { useFormStore } from "@/stores";

export type ThemedFormPickerSelectProps = Omit<
  PickerSelectProps,
  "onValueChange"
> & {
  label: string;
  name: string;
};

export function ThemedFormPickerSelect({
  label,
  name,
  items,
  ...rest
}: ThemedFormPickerSelectProps) {
  //
  const [hasError, setHasError] = useState<AnyObject | null>(null);

  const { reactHookUseForm } = useFormStore();
  const { formState, setValue, watch } =
    (reactHookUseForm as UseFormReturn<any>) ?? {};

  const { errors } = formState ?? {};
  const value = watch?.(name);

  useEffect(() => {
    if (!errors) return setHasError(null);
    if (errors[name]) {
      setHasError(errors[name] as AnyObject);
    } else if (name.includes(".")) {
      //
    } else {
      setHasError(null);
    }
  }, [name, errors, setHasError]);

  const handleValueChange = useCallback(
    (value: string) => {
      setValue(`${name}`, value ?? "");
    },
    [setValue]
  );

  if (!reactHookUseForm) return <></>;

  return (
    <>
      <RNPickerSelect
        {...rest}
        items={items ?? []}
        value={value ?? ""}
        onValueChange={(value) => handleValueChange(value)}
      >
        <ThemedText lightColor="#222" darkColor="#fff">
          {label}
        </ThemedText>
        <ThemedView lightColor="#eee" darkColor="#222" style={styles.container}>
          {value ? (
            <ThemedText>
              {items.find((i) => i.value == value)?.label}
            </ThemedText>
          ) : (
            <ThemedText>Choose an item</ThemedText>
          )}
        </ThemedView>

        {hasError && (
          <ThemedView style={{ marginTop: -10, backgroundColor: "transparent" }}>
            <ThemedText type="small" darkColor="red" lightColor="red">
              {hasError.message}
            </ThemedText>
          </ThemedView>
        )}
      </RNPickerSelect>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
});
