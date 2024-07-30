import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
} from "@/components";

import { useAppForm, useCities, useCountries, useViolences } from "@/hooks";
import { CreateViolenceDto } from "@/types";
import { AddViolenceSchema } from "@/validators";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

export function ViolenceForm() {
  //
  const { handleSubmit } = useAppForm({
    schema: AddViolenceSchema(),
    defaultValues: {
      id: "",
      user_id: 0,
      user: {
        firstname: "",
        lastname: "",
        phone: 1,
        email: "",
        gender: "",
        profession: "",
        age: 0,
        address: "",
      },
      date_occured: "",
      country: "",
      city: "",
      details: "",
      type_id: 0,
      flag_id: 0,
      nature: "",
      natureLocation: "",
    },
  });

  const {
    addViolence,
    getViolenceFlags,
    getViolenceTypes,
    getViolenceOptions,
  } = useViolences();

  const { getCountries } = useCountries();

  const { cities } = useCities({ countryKeyName: "country" });

  const natures = useMemo(() => {
    return (
      getViolenceOptions.data?.data?.data.natures.map((item) => {
        return {
          label: item,
          value: `${item}`,
        };
      }) ?? []
    );
  }, [getViolenceOptions.data]);

  const flags = useMemo(() => {
    return (
      getViolenceFlags.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getViolenceFlags.data]);

  const types = useMemo(() => {
    return (
      getViolenceTypes.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getViolenceTypes.data]);

  const countries = useMemo(() => {
    return (
      getCountries.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.name}`,
        };
      }) ?? []
    );
  }, [getCountries.data]);

  const proceedSaveViolence = useCallback(async (data: CreateViolenceDto) => {
    await addViolence.mutateAsync(data);
  }, []);

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedFormDateTime
          datePickerProps={{ value: new Date(), mode: "date" }}
          name="date_occured"
          label="Incident Date"
        />

        <ThemedFormPickerSelect label="Nature" name="nature" items={natures} />

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect label="Type" name="type_id" items={types} />
          </ThemedView>

          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect label="Flag" name="flag_id" items={flags} />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label="Country"
              name="country"
              items={countries}
            />
          </ThemedView>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect label="City" name="city" items={cities} />
          </ThemedView>
        </ThemedView>

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
  rowDivider: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  rowDividerItem: {
    flex: 0.5,
  },
});
