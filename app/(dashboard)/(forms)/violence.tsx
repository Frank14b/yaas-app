import { ThemedView } from "@/components";
import { ViolenceForm } from "@/components/dashboard";
import { StyleSheet } from "react-native";

export default function ViolenceFormScreen() {
  return (
    <ThemedView style={styles.container}>
      <ViolenceForm />
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
