import RNPickerSelect, {
  Item,
  PickerSelectProps,
} from "react-native-picker-select";
import { ThemedText } from "./ThemedText";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export type ThemedPickerSelectProps = Omit<
  PickerSelectProps,
  "onValueChange"
> & {};

export function ThemedPickerSelect({
  items,
  ...rest
}: ThemedPickerSelectProps) {
  //
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleValueChange = useCallback((item: Item) => {
    if (item.value) {
      setSelectedItem(item);
    }
  }, []);

  return (
    <>
      <RNPickerSelect
        pickerProps={{
          accessibilityLabel: selectedItem?.label ?? "Choose an item",
        }}
        {...rest}
        items={items ?? []}
        onValueChange={(value) => handleValueChange(value)}
      >
        {selectedItem ? (
          <ThemedText>{selectedItem.label}</ThemedText>
        ) : (
          <ThemedView
            lightColor="#eee"
            darkColor="#111"
            style={styles.container}
          >
            <ThemedText>Choose an item</ThemedText>
          </ThemedView>
        )}
      </RNPickerSelect>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
});
