import { ThemeFAB, ThemedText, ThemedView } from "@/components";
import { useAppActionSheet, useRoleAccess } from "@/hooks";
import { ResultRolesDto } from "@/types";
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RoleAccessScreen() {
  //
  const { getRoles } = useRoleAccess();
  const { openActionSheet } = useAppActionSheet({});

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
          callBackFn: () => {},
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
        {getRoles.isLoading && <ThemedText>Loading...</ThemedText>}
        <FlatList
          data={getRoles.data?.data?.data}
          renderItem={(item) => roles(item.item)}
        />
      </ThemedView>

      <ThemeFAB name="add" position="bottom-right"/>
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
