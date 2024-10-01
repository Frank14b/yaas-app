import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
  ThemedDropdown,
} from "@/components";
import { Keys } from "@/constants";

import {
  useAppForm,
  useCities,
  useCountries,
  useUsers,
  useViolences,
} from "@/hooks";

import { CreateViolenceDto, ResultViolenceDto, UpdateViolenceDto } from "@/types";
import { AddViolenceSchema } from "@/validators";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Href, router } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";

export interface ViolenceFormProps {
  violence?: ResultViolenceDto;
}

export function ViolenceForm({ violence }: ViolenceFormProps) {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  //
  const { handleSubmit, setValue } = useAppForm({
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
      date_occured: `${new Date()}`,
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
  const editViolence = violenceHook.editViolence;

  const { useGetCountries } = useCountries();
  const getCountries = useGetCountries();
  const getVictims = useUsers().useGetVictims();
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

  const natureLocations = useMemo(() => {
    return (
      getViolenceOptions.data?.data?.data.locations.map((item) => {
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
      getCountries.data?.data?.data?.map((item) => {
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

  const proceedSaveViolence = useCallback(
    async (data: UpdateViolenceDto | CreateViolenceDto) => {
      const result = violence
        ? await editViolence.mutateAsync(data)
        : await addViolence.mutateAsync(data as CreateViolenceDto);
      if (result.status) {
        queryClient.invalidateQueries({
          queryKey: [Keys.Queries.GET_VIOLENCES],
        });
        router.back();
      } else {
        Alert.alert(`Error`, `${result.data?.message}`);
      }
    },
    [violence]
  );

  useEffect(() => {
    if (violence) {
      setValue("id", `${violence.id}`);
      setValue("date_occured", `${new Date(`${violence.date_occured}`)}`);
      setValue("country", `${violence.country}`);
      setValue("city", `${violence.city}`);
      setValue("details", `${violence.details}`);
      setValue("nature", `${violence.nature}`);
      setValue("flag_id", violence.flag_id);
      setValue("type_id", violence.type_id);
      setValue("natureLocation", violence.natureLocation);
      setValue("user_id", violence.user_id);
    }
  }, [violence]);

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedFormDateTime
          datePickerProps={{ value: new Date(), mode: "date" }}
          name="date_occured"
          label={t("violences.form.fields.incident_date")}
        />

        <ThemedView style={styles.userContainer}>
          <ThemedView style={styles.userDropdown}>
            <ThemedDropdown
              search={true}
              label={t("violences.form.fields.victim")}
              name="user_id"
              data={victims}
            />
          </ThemedView>
          <Ionicons
            style={styles.userAddIcon}
            color={"#aaa"}
            name="person-add"
            size={25}
            onPress={() => router.push<string>("(forms)/victim" as Href)}
          />
        </ThemedView>

        <ThemedFormPickerSelect
          label={t("violences.form.fields.nature")}
          name="nature"
          items={natures}
        />

        <ThemedFormPickerSelect
          label={t("violences.form.fields.location")}
          name="natureLocation"
          items={natureLocations}
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
      </ThemedFormView>

      <ThemedView style={styles.submitButtonWrapper}>
        <ThemedButton
          title={t("violences.form.submit_btn")}
          onPress={handleSubmit(proceedSaveViolence)}
          isLoading={addViolence.isPending}
          disabled={addViolence.isPending}
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
