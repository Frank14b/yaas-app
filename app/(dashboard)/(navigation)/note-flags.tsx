import {
  ThemeFAB,
  ThemedConfirmDialog,
  ThemedText,
  ThemedView,
} from "@/components";

import { useAppActionSheet, useNotes } from "@/hooks";
import { ResultNoteFlagDto } from "@/types";
import { Href, router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NoteFlagsScreen() {
  //
  const { useGetNoteFlags, deleteNoteFlag } = useNotes();
  const getNoteFlags = useGetNoteFlags();
  const { openActionSheet } = useAppActionSheet({});
  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    item?: ResultNoteFlagDto;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });

  const handleDelete = useCallback(async () => {
    setShowConfirmation({ status: false });
    await deleteNoteFlag.mutateAsync(showConfirmation.item?.id ?? 0);
    getNoteFlags.refetch();
  }, [showConfirmation, setShowConfirmation]);

  const handleOpenActionSheet = useCallback(
    (item: ResultNoteFlagDto) => {
      openActionSheet([
        {
          title: `${item.name}`,
          destructiveBtn: false,
          cancelBtn: false,
          callBackFn: () => {},
        },
        {
          title: `Edit`,
          destructiveBtn: false,
          cancelBtn: false,
          callBackFn: () => {},
        },
        {
          title: `Delete`,
          destructiveBtn: false,
          cancelBtn: false,
          callBackFn: () => setShowConfirmation({ status: true, item }),
        },
        {
          title: `Cancel`,
          destructiveBtn: false,
          cancelBtn: true,
          callBackFn: () => {},
        },
      ]);
    },
    [openActionSheet]
  );

  const noteFlags = useCallback(
    (item: ResultNoteFlagDto) => {
      return (
        <TouchableOpacity onPress={() => handleOpenActionSheet(item)}>
          <ThemedView
            darkColor="#111"
            lightColor="#eee"
            style={styles.itemContainer}
          >
            <ThemedText>{item.name}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      );
    },
    [handleOpenActionSheet]
  );

  return (
    <>
      <ThemedView style={styles.container}>
        <FlatList
          data={getNoteFlags.data?.data?.data}
          renderItem={(item) => noteFlags(item.item)}
          refreshControl={
            <RefreshControl
              refreshing={getNoteFlags.isLoading}
              onRefresh={() => getNoteFlags.refetch()}
            />
          }
        />
      </ThemedView>

      <ThemeFAB
        onPress={() => router.push("(forms)/note-flag" as Href)}
        name="add"
        position="bottom-right"
      />

      {showConfirmation.status && (
        <ThemedConfirmDialog
          message={`Are you sure you want to delete ${showConfirmation.item?.name}?`}
          visible={showConfirmation.status}
          cancelFn={handleCloseConfirmation}
          confirmFn={handleDelete}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  itemContainer: {
    flex: 1,
    padding: 12,
    paddingVertical: 10,
    borderRadius: 2,
    marginVertical: 1,
  },
});
