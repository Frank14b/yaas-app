import {
  ThemedView,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
} from "@/components";
import { useAppForm } from "@/hooks";
import { AddViolenceSchema } from "@/validators";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { ThemedFormDateTime } from "@/components/common/ThemedFormDateTime";

export function ViolenceForm() {
  const { handleSubmit } = useAppForm({
    schema: AddViolenceSchema(),
    defaultValues: {
      nature: "",
      date_occured: new Date(),
      details: "",
    },
  });

  const proceedSaveViolence = useCallback(() => {}, []);

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedFormDateTime
          datePickerProps={{ value: new Date(), mode: "datetime" }}
          name="date_occured"
          label="Incident Date"
        />
        <ThemedInput name="nature" label="Nature" />
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
    flex: 1,
    paddingVertical: 10,
  },
});
