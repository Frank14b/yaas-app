import {
  ThemeFAB,
  ThemedConfirmDialog,
  ThemedText,
  ThemedView,
} from "@/components";
import { useAppActionSheet, useRoleAccess } from "@/hooks";
import { ResultRolesDto } from "@/types";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RoleAccessScreen() {
  //
  const { useGetRoles, deleteRole } = useRoleAccess();
  const getRoles = useGetRoles();
  const { openActionSheet } = useAppActionSheet({});
  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    item?: ResultRolesDto;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });

  const handleDelete = useCallback(async () => {
    setShowConfirmation({ status: false });
    await deleteRole.mutateAsync(showConfirmation.item?.id ?? 0);
    getRoles.refetch();
  }, [showConfirmation, setShowConfirmation]);

  const handleOpenActionSheet = useCallback(
    (item: ResultRolesDto) => {
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

  const roles = useCallback(
    (item: ResultRolesDto) => {
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
          data={getRoles.data?.data?.data}
          renderItem={(item) => roles(item.item)}
          refreshControl={
            <RefreshControl
              refreshing={getRoles.isLoading}
              onRefresh={() => getRoles.refetch()}
            />
          }
        />
      </ThemedView>

      <ThemeFAB
        onPress={() => router.push("(forms)/role")}
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
