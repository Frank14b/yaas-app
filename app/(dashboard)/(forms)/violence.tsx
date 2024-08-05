import { ThemedView } from "@/components";
import { UserViolenceForm, ViolenceForm } from "@/components/dashboard";
import { useUserStore } from "@/stores";
import { StyleSheet } from "react-native";

export default function ViolenceFormScreen() {
  //
  const { isAdmin } = useUserStore();
  return (
    <ThemedView style={styles.container}>
      {isAdmin && <ViolenceForm />}
      {!isAdmin && <UserViolenceForm />}
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
