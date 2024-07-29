import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedDropdown,
} from "@/components";
import { useAppForm } from "@/hooks";
import { useAppActionSheet } from "@/hooks";
import { AddViolenceSchema } from "@/validators";
import { useCallback, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";

export function ViolenceForm() {
  //
  const { openActionSheet } = useAppActionSheet({
    title: "Violence Nature",
  });

  const { handleSubmit, setValue } = useAppForm({
    schema: AddViolenceSchema(),
    defaultValues: {
      nature: "",
      date_occured: new Date(),
      details: "",
    },
  });

  const natures = useMemo(() => {
    return [
      {
        label: "text 1",
        value: "text 1",
      },
      {
        label: "text 2",
        value: "text 2",
      },
      {
        label: "text 3",
        value: "text 3",
      },
    ];
  }, []);

  const natures_s = useMemo(() => {
    return [
      {
        key: 0,
        title: "Select violence nature",
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          setValue("nature", "text 3");
        },
      },
      {
        key: 1,
        title: "text 1",
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          setValue("nature", "text 1");
        },
      },
      {
        key: 2,
        title: "text 2",
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {
          setValue("nature", "text 2");
        },
      },
      {
        key: 3,
        title: "cancel",
        destructiveBtn: false,
        cancelBtn: true,
        callBackFn: () => {
          setValue("nature", "text 3");
        },
      },
    ];
  }, [setValue]);

  const proceedSaveViolence = useCallback(() => {}, []);

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedFormDateTime
          datePickerProps={{ value: new Date(), mode: "datetime" }}
          name="date_occured"
          label="Incident Date"
        />
        <ThemedDropdown label="Nature" name="nature" data={natures as any} />
        <ThemedInput
          name="details"
          label="Details"
          placeholder="Describe what happen"
          multiline={true}
          numberOfLines={5}
        />

        <ThemedButton
          title="Save Violence"
          onPress={handleSubmit(proceedSaveViolence)}
        />
      </ThemedFormView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
});
