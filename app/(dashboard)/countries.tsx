import {
  ThemeFAB,
  ThemedPickerSelect,
  ThemedText,
  ThemedView,
} from "@/components";
import { useAppActionSheet, useCountries } from "@/hooks";
import { ResultCountriesDto } from "@/types";
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CountriesScreen() {
  //
  const { getCountries } = useCountries();
  const { openActionSheet } = useAppActionSheet({});

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
        {getCountries.isLoading && <ThemedText>Loading...</ThemedText>}

        <ThemedPickerSelect items={[]} />

        <FlatList
          data={getCountries.data?.data?.data}
          renderItem={(item) => countries(item.item)}
        />
      </ThemedView>

      <ThemeFAB name="add" position="bottom-right" />
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
