import { ThemedView } from "@/components";
import { NoteForm } from "@/components/dashboard";
import { StyleSheet } from "react-native";

export default function NoteFormScreen() {
  return (
    <ThemedView style={styles.container}>
      <NoteForm />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
