import { ThemedButton, ThemedInput, ThemedView } from "@/components";

import { Keys } from "@/constants";
import { useAppForm, useNotes } from "@/hooks";
import { CreateNoteFlagDto } from "@/types";
import { AddNoteFlagSchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function NoteFlagFormScreen() {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addNoteFlag } = useNotes();

  const { handleSubmit } = useAppForm({
    schema: AddNoteFlagSchema(),
    defaultValues: {
      name: "",
      details: "",
    },
  });

  const proceedSave = useCallback(async (data: CreateNoteFlagDto) => {
    await addNoteFlag.mutateAsync(data);
    queryClient.invalidateQueries({
      queryKey: [Keys.Queries.GET_NOTE_FLAGS],
    });
    router.back();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedInput
        name="name"
        label={t("noteFlags.form.fields.name")}
        placeholder={t("noteFlags.form.fields.name_placeholder")}
      />
      <ThemedInput
        name="details"
        label={t("noteFlags.form.fields.details")}
        placeholder={t("noteFlags.form.fields.details_placeholder")}
      />
      <ThemedButton
        title={t("noteFlags.form.submit_btn")}
        onPress={handleSubmit(proceedSave)}
        isLoading={addNoteFlag.isPending}
        disabled={addNoteFlag.isPending}
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
