import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedDropdown,
} from "@/components";
import { useAppForm } from "@/hooks";
import { AddViolenceSchema } from "@/validators";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

export function ViolenceForm() {
  const { handleSubmit } = useAppForm({
    schema: AddViolenceSchema(),
    defaultValues: {
      nature: "",
      date_occured: new Date(),
      details: "",
    },
  });

  const natures = useMemo(() => {
    return [{
      label: "test 1",
      value: "text 1"
    },{
      label: "test 2",
      value: "text 2"
    },{
      label: "test 3",
      value: "text 3"
    }]
  }, [])

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
        {/* <ThemedIosContextMenu /> */}

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
