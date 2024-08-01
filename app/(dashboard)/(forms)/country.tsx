import { ThemedButton, ThemedFormPickerSelect, ThemedView } from "@/components";
import { Keys } from "@/constants";
import { useAppForm, useCountries } from "@/hooks";
import { CreateCountryDto } from "@/types";
import { appCountries } from "@/utils";
import { CountrySchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function CountryFormScreen() {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addCountry } = useCountries();

  const { handleSubmit, watch, setValue } = useAppForm({
    schema: CountrySchema(),
    defaultValues: {
      name: "",
      ccid: "",
    },
  });

  const name = watch(`name`);

  useEffect(() => {
    if (name.length > 0) {
      const ccid = appCountries.find((item) => item.name.common == name)?.cca2;
      if (ccid) {
        setValue(`ccid`, ccid);
      }
    }
  }, [name, setValue]);

  const countries = useMemo(() => {
    return appCountries.map((item) => {
      return {
        label: item.name.common,
        value: item.name.common,
      };
    });
  }, []);

  const proceedSaveCountry = useCallback(async (data: CreateCountryDto) => {
    await addCountry.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: [Keys.Queries.GET_COUNTRIES] });
    router.back()
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedFormPickerSelect
        label={t("countries.form.fields.choose_country")}
        name="name"
        items={countries}
      ></ThemedFormPickerSelect>
      <ThemedButton
        title={t("countries.form.submit_btn")}
        onPress={handleSubmit(proceedSaveCountry)}
        isLoading={addCountry.isPending}
        disabled={addCountry.isPending}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
