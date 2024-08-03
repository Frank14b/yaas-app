import { ThemedView } from "@/components";
import { ServiceForm } from "@/components/dashboard";
import { StyleSheet } from "react-native";

export default function ServiceFormScreen() {
  return (
    <ThemedView style={styles.container}>
      <ServiceForm />
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
