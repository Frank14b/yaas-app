import { ThemedView, ThemedInput, ThemedButton } from "@/components";
import { useAppForm } from "@/hooks";
import { AddViolenceSchema } from "@/validators";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export function ViolenceForm() {
  const { handleSubmit } = useAppForm({
    schema: AddViolenceSchema(),
    defaultValues: {
      nature: "",
      date_occured: "",
      details: "",
    },
  });

  const proceedSaveViolence = useCallback(() => {}, []);

  return (
    <>
      <ThemedView style={[styles.container]}>
        <ThemedInput name="date_occured" label="Incident Date" />
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
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
});
