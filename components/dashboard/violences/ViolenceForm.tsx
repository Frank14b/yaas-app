import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
  ThemedDropdown,
} from "@/components";

import {
  useAppForm,
  useCities,
  useCountries,
  useUsers,
  useViolences,
} from "@/hooks";

import { CreateViolenceDto } from "@/types";
import { AddViolenceSchema } from "@/validators";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export function ViolenceForm() {
  //
  const { t } = useTranslation();
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

  const violenceHook = useViolences();
  const getViolenceFlags = violenceHook.getViolenceFlags();
  const getViolenceTypes = violenceHook.getViolenceTypes();
  const getViolenceOptions = violenceHook.getViolenceOptions();
  const addViolence = violenceHook.addViolence;

  const { useGetCountries } = useCountries();
  const getCountries = useGetCountries();
  const getVictims = useUsers().getVictims();
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

  const victims = useMemo(() => {
    return (
      getVictims.data?.data?.data.map((item) => {
        return {
          label: `${item.firstname} ${item.lastname} - ${item.email}`,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getVictims.data]);

  const proceedSaveViolence = useCallback(async (data: CreateViolenceDto) => {
    await addViolence.mutateAsync(data);
  }, []);

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedFormDateTime
          datePickerProps={{ value: new Date(), mode: "date" }}
          name="date_occured"
          label={t("violences.form.fields.incident_date")}
        />

        <ThemedDropdown
          search={true}
          label={t("violences.form.fields.victim")}
          name="user_id"
          data={victims}
        />

        <ThemedFormPickerSelect
          label={t("violences.form.fields.nature")}
          name="nature"
          items={natures}
        />

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("violences.form.fields.type")}
              name="type_id"
              items={types}
            />
          </ThemedView>

          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("violences.form.fields.flag")}
              name="flag_id"
              items={flags}
            />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("violences.form.fields.country")}
              name="country"
              items={countries}
            />
          </ThemedView>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("violences.form.fields.city")}
              name="city"
              items={cities}
            />
          </ThemedView>
        </ThemedView>

        <ThemedInput
          name="details"
          label={t("violences.form.fields.details")}
          placeholder={t("violences.form.fields.details_placeholder")}
          multiline={true}
          numberOfLines={5}
        />

        <ThemedButton
          title={t("violences.form.submit_btn")}
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
