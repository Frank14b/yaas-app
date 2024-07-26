import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

import { useCallback, useRef } from "react";
import { Colors } from "@/constants";

export function ThemedBottomSheet({ children }: { children: React.ReactNode }) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <>
      <ThemedView style={styles.container}>
        <BottomSheet snapPoints={['100%']} ref={bottomSheetRef} onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <ThemedText>Awesome 🎉</ThemedText>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryDark,
    padding: 50
  },
});
