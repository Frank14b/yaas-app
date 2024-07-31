import { ThemeFAB, ThemedText, ThemedView } from "@/components";
import { useAppActionSheet, useOrganizations } from "@/hooks";
import { ResultOrganizationDto } from "@/types";
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function OrganizationScreen() {
  //
  const getOrganizations = useOrganizations().getOrganizations();
  const { openActionSheet } = useAppActionSheet({});

  const handleOpenActionSheet = useCallback(
    (item: ResultOrganizationDto) => {
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
    (item: ResultOrganizationDto) => {
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
        {getOrganizations.isLoading && <ThemedText>Loading...</ThemedText>}
        <FlatList
          data={getOrganizations.data?.data?.data}
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
