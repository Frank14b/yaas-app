import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
} from "@/components";
import { Keys } from "@/constants";

import { useAppForm, useCities, useCountries, useServices } from "@/hooks";

import { CreateServiceDto } from "@/types";
import { AddServiceSchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";

export function ServiceForm() {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  //
  const { handleSubmit } = useAppForm({
    schema: AddServiceSchema(),
    defaultValues: {
      id: "",
      country: "",
      city: "",
      type_id: 0,
      booking_date: `${new Date()}`,
      details: "",
    },
  });

  const { addService, useGetServiceTypes } = useServices();
  const { useGetCountries } = useCountries();
  const getCountries = useGetCountries();
  const getTypes = useGetServiceTypes();
  const { cities } = useCities({ countryKeyName: "country" });

  const types = useMemo(() => {
    return (
      getTypes.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getTypes.data]);

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

  const proceedSave = useCallback(async (data: CreateServiceDto) => {
    const result = await addService.mutateAsync(data);
    if (result.status) {
      queryClient.invalidateQueries({ queryKey: [Keys.Queries.GET_SERVICES] });
      router.back();
    } else {
      Alert.alert(`Error`, `${result.data?.message}`);
    }
  }, []);

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedFormDateTime
          datePickerProps={{ value: new Date(), mode: "date" }}
          name="booking_date"
          label={t("services.form.fields.booking_date")}
        />

        <ThemedFormPickerSelect
          label={t("services.form.fields.type")}
          name="type_id"
          items={types}
        />

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("services.form.fields.country")}
              name="country"
              items={countries}
            />
          </ThemedView>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("services.form.fields.city")}
              name="city"
              items={cities}
            />
          </ThemedView>
        </ThemedView>

        <ThemedInput
          name="details"
          label={t("services.form.fields.details")}
          placeholder={t("services.form.fields.details_placeholder")}
          multiline={true}
          numberOfLines={5}
        />
      </ThemedFormView>

      <ThemedView style={styles.submitButtonWrapper}>
        <ThemedButton
          title={t("services.form.submit_btn")}
          onPress={handleSubmit(proceedSave)}
          isLoading={addService.isPending}
          disabled={addService.isPending}
        />
      </ThemedView>
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
  userContainer: {
    flexDirection: "row",
  },
  userDropdown: {
    flex: 1,
    paddingRight: 15,
  },
  userAddIcon: {
    marginTop: 45,
  },
  submitButtonWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
});
