import {
  ThemeFAB,
  ThemedConfirmDialog,
  ThemedText,
  ThemedView,
} from "@/components";

import { useAppActionSheet, useCountries } from "@/hooks";
import { ResultCountriesDto } from "@/types";
import { Href, router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CountriesScreen() {
  //
  const { useGetCountries, deleteCountry } = useCountries();
  const getCountries = useGetCountries();
  const { openActionSheet } = useAppActionSheet({});
  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    item?: ResultCountriesDto;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });

  const handleDelete = useCallback(async () => {
    setShowConfirmation({ status: false });
    await deleteCountry.mutateAsync(showConfirmation.item?.id ?? 0);
    getCountries.refetch();
  }, [showConfirmation, setShowConfirmation]);

  const handleOpenActionSheet = useCallback(
    (item: ResultCountriesDto) => {
      openActionSheet([
        {
          title: `${item.name} - ${item.ccid}`,
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

  const countries = useCallback(
    (item: ResultCountriesDto) => {
      return (
        <TouchableOpacity onPress={() => handleOpenActionSheet(item)}>
          <ThemedView
            darkColor="#111"
            lightColor="#eee"
            style={styles.itemContainer}
          >
            <ThemedText>
              {item.name} - {item.ccid}
            </ThemedText>
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
          data={getCountries.data?.data?.data}
          renderItem={(item) => countries(item.item)}
          refreshControl={
            <RefreshControl
              refreshing={getCountries.isLoading}
              onRefresh={() => getCountries.refetch()}
            />
          }
        />
      </ThemedView>

      <ThemeFAB
        onPress={() => router.push("(forms)/country" as Href)}
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
