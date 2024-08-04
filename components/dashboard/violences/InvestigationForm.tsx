import {
  ThemedFormDateTime,
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
} from "@/components";

import { Keys } from "@/constants";

import { useAppForm, useOrganizations, useViolences } from "@/hooks";

import { CreateInvestigationDto } from "@/types";
import { AddInvestigationSchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";

export type InvestigationFormProps = {
  noticeId: number;
};

export function InvestigationForm({ noticeId }: InvestigationFormProps) {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  //
  const { handleSubmit } = useAppForm({
    schema: AddInvestigationSchema(),
    defaultValues: {
      id: 0,
      notice_id: noticeId,
      datepoll: `${new Date()}`,
      source: "",
      details: "",
      flag_id: 0,
      second_details: "",
      violenceAuthor: "",
      pollmethod_id: 0,
    },
  });

  const violenceHook = useViolences();
  const getViolenceFlags = violenceHook.getViolenceFlags();
  const getInvestigationTypes = violenceHook.getInvestigationTypes();
  const getViolenceOptions = violenceHook.getViolenceOptions();
  const addInvestigation = violenceHook.addInvestigation;

  const { useGetOrganizations } = useOrganizations();
  const getOrganisations = useGetOrganizations();

  const organisations = useMemo(() => {
    return (
      getOrganisations.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getOrganisations.data]);

  const sources = useMemo(() => {
    return (
      getViolenceOptions.data?.data?.data.sources.map((item) => {
        return {
          label: item,
          value: `${item}`,
        };
      }) ?? []
    );
  }, [getViolenceOptions.data]);

  const authors = useMemo(() => {
    return (
      getViolenceOptions.data?.data?.data.authors.map((item) => {
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
      getInvestigationTypes.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getInvestigationTypes.data]);

  const proceedSave = useCallback(async (data: CreateInvestigationDto) => {
    const result = await addInvestigation.mutateAsync(data);
    if (result.status) {
      queryClient.invalidateQueries({
        queryKey: [Keys.Queries.GET_VIOLENCE, noticeId],
      });
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
          name="datepoll"
          label={t("investigations.form.fields.document_date")}
        />

        <ThemedFormPickerSelect
          label={t("investigations.form.fields.source")}
          name="source"
          items={sources}
        />

        <ThemedFormPickerSelect
          label={t("investigations.form.fields.author")}
          name="violenceAuthor"
          items={authors}
        />

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("investigations.form.fields.method")}
              name="pollmethod_id"
              items={types}
            />
          </ThemedView>

          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("investigations.form.fields.flag")}
              name="flag_id"
              items={flags}
            />
          </ThemedView>
        </ThemedView>

        <ThemedFormPickerSelect
          label={t("investigations.form.fields.refer_organization")}
          name="recomand_ong_id"
          items={organisations}
        />
        <ThemedFormPickerSelect
          label={t("investigations.form.fields.referal_organization")}
          name="referal_ong_id"
          items={organisations}
        />

        <ThemedInput
          name="details"
          label={t("investigations.form.fields.details")}
          placeholder={t("investigations.form.fields.details_placeholder")}
          multiline={true}
          numberOfLines={5}
        />

        <ThemedInput
          name="second_details"
          label={t("investigations.form.fields.second_details")}
          placeholder={t(
            "investigations.form.fields.second_details_placeholder"
          )}
          multiline={true}
          numberOfLines={5}
        />
      </ThemedFormView>

      <ThemedView style={styles.submitButtonWrapper}>
        <ThemedButton
          title={t("investigations.form.submit_btn")}
          onPress={handleSubmit(proceedSave)}
          isLoading={addInvestigation.isPending}
          disabled={addInvestigation.isPending}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: "flex-start",
    paddingBottom: 100,
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
