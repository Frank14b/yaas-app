import { ThemedFormView } from "@/components";
import { NoteDetails } from "@/components/dashboard";
import { NoteCommentForm } from "@/components/dashboard/notes/NoteCommentForm";
import { NoteComments } from "@/components/dashboard/notes/NoteComments";
import { useNotes } from "@/hooks";
import { useUserStore } from "@/stores";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";

export default function NoteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useUserStore();
  const { useGetNote, useGetNoteComments, commentNote } = useNotes();
  const getNote = useGetNote(parseInt(id as string));
  const getComments = useGetNoteComments(parseInt(id as string));

  const note = useMemo(() => {
    return getNote.data?.data?.data;
  }, [getNote.data]);

  const comments = useMemo(() => {
    return getComments.data?.data?.data ?? [];
  }, [getComments.data]);

  const proceedComment = useCallback(
    async (data: { content: string }) => {
      const result = await commentNote.mutateAsync({
        ...data,
        note_id: parseInt(id as string),
      });
      if (result.status) {
        getComments.refetch();
      } else {
        Alert.alert(`Error`, `${result.data?.message}`);
      }
    },
    [id, getComments.refetch]
  );

  return (
    <>
      <ThemedFormView style={styles.container}>
        {getNote.isPending && <ActivityIndicator size={"large"} />}
        {note && (
          <>
            <NoteDetails user={user} item={note} />
            <NoteComments comments={comments} user={user} />
            <NoteCommentForm
              proceedSave={proceedComment}
              isSaving={commentNote.isPending}
            />
          </>
        )}
      </ThemedFormView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
