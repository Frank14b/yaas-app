import { ThemedView } from "@/components";
import { StyleSheet } from "react-native";

export default function UsersScreen() {
  //
  return (
    <>
      <ThemedView style={styles.container}></ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
