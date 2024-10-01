import { ThemedInput, ThemedButton, ThemedView } from "@/components";

import { useAppForm } from "@/hooks";
import { AddNoteCommentSchema } from "@/validators";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export type NoteCommentFormProps = {
  proceedSave: (data: { content: string }) => Promise<void>;
  isSaving: boolean;
};

export function NoteCommentForm({
  proceedSave,
  isSaving,
}: NoteCommentFormProps) {
  //
  const { t } = useTranslation();
  //
  const { handleSubmit } = useAppForm({
    schema: AddNoteCommentSchema(),
    defaultValues: {
      content: "",
    },
  });

  return (
    <>
      <ThemedView style={styles.submitButtonWrapper}>
        <ThemedInput
          name="content"
          label={t("notes.form.fields.comment")}
          placeholder={t("notes.form.fields.comment")}
          multiline={true}
          numberOfLines={3}
          style={[{ height: 60 }]}
        />
        <ThemedButton
          title={t("notes.form.submit_btn")}
          onPress={handleSubmit(proceedSave)}
          isLoading={isSaving}
          disabled={isSaving}
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
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    paddingBottom: 30
  },
});
