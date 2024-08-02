import { ThemedView } from "@/components";
import { UserForm } from "@/components/dashboard";
import { StyleSheet } from "react-native";

export default function UserFormScreen() {
  return (
    <ThemedView style={styles.container}>
      <UserForm isVictim={false} />
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
