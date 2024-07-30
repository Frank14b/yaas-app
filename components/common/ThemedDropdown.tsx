import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useFormStore } from "@/stores";
import { UseFormReturn } from "react-hook-form";
import { AnyObject } from "yup";

import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { Colors } from "@/constants";

export type DataProps = {
  label: string;
  value: string;
};

export type ThemedDropdownProps = Omit<
  DropdownProps<DataProps>,
  "labelField" | "valueField" | "onChange"
> & {
  label: string;
  name: string;
  data: DataProps[];
};

export function ThemedDropdown({
  label,
  name,
  data,
  search,
  ...rest
}: ThemedDropdownProps) {
  //
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

  const handleValueSelected = useCallback(
    (item: DataProps) => {
      setValue?.(`${name}`, item.value, { shouldValidate: true });
      // setIsFocus(false);
    },
    [setValue]
  );

  if (!reactHookUseForm) return <></>;

  register(name);

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText lightColor="#222" darkColor="#fff">
          {label}
        </ThemedText>
        <ThemedView
          lightColor="#eee"
          darkColor="#222"
          style={styles.viewWrapper}
        >
          <Dropdown
            {...rest}
            data={data}
            value={value}
            labelField={"label"}
            valueField={"value"}
            onChange={handleValueSelected}
            maxHeight={300}
            search={search}
            searchPlaceholder="Search"
            inputSearchStyle={styles.dropDownInputSearchStyle}
            containerStyle={styles.dropDrownContainerStyle}
            itemTextStyle={styles.dropDownItemTextStyle}
            selectedTextStyle={styles.dropDownSelectedTextStyle}
            itemContainerStyle={styles.dropDownItemContainerStyle}
            placeholderStyle={{
              color: "gray",
            }}
            activeColor={Colors.primaryDark}
          />
        </ThemedView>
        {hasError && (
          <ThemedView>
            <ThemedText type="small" darkColor="red" lightColor="red">
              {hasError.message}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  label: {
    padding: 1,
    paddingBottom: 6,
  },
  viewWrapper: {
    padding: 12,
    borderRadius: 8,
  },
  dropDrownContainerStyle: {
    backgroundColor: Colors.tertiaryDark,
    borderWidth: 0,
    paddingVertical: 8,
    borderRadius: 10,
  },
  dropDownSelectedTextStyle: {
    backgroundColor: "transparent",
    color: "#bbb",
    fontSize: 14,
  },
  dropDownItemTextStyle: {
    color: "#fff",
    backgroundColor: "transparent",
  },
  dropDownItemContainerStyle: {},
  dropDownInputSearchStyle: {
    borderRadius: 8,
  },
});
