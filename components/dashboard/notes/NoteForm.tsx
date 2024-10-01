import {
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
} from "@/components";
import { Keys } from "@/constants";

import { useAppForm, useNotes } from "@/hooks";

import { CreateNoteDto } from "@/types";
import { AddNoteSchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";

export function NoteForm() {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  //
  const { handleSubmit } = useAppForm({
    schema: AddNoteSchema(),
    defaultValues: {
      id: "",
      name: "",
      enableComments: true,
      restricted: false,
      flag_id: 0,
      type_id: 0,
      details: "",
    },
  });

  const { addNote, useGetNoteTypes, useGetNoteFlags } = useNotes();
  const getTypes = useGetNoteTypes();
  const getFlags = useGetNoteFlags();

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

  const flags = useMemo(() => {
    return (
      getFlags.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getFlags.data]);

  const proceedSave = useCallback(async (data: CreateNoteDto) => {
    const result = await addNote.mutateAsync(data);
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
        <ThemedInput
          name="name"
          label={t("notes.form.fields.name")}
          placeholder={t("notes.form.fields.name")}
          multiline={false}
        />

        <ThemedFormPickerSelect
          label={t("notes.form.fields.type")}
          name="type_id"
          items={types}
        />

        <ThemedFormPickerSelect
          label={t("notes.form.fields.flag")}
          name="flag_id"
          items={flags}
        />

        <ThemedInput
          name="details"
          label={t("notes.form.fields.details")}
          placeholder={t("notes.form.fields.details_placeholder")}
          multiline={true}
          numberOfLines={5}
        />
      </ThemedFormView>

      <ThemedView style={styles.submitButtonWrapper}>
        <ThemedButton
          title={t("notes.form.submit_btn")}
          onPress={handleSubmit(proceedSave)}
          isLoading={addNote.isPending}
          disabled={addNote.isPending}
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
