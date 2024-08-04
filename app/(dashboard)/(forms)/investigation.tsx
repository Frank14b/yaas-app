import { ThemedView } from "@/components";
import { InvestigationForm } from "@/components/dashboard";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function InvestigationFormScreen() {
  //
  const { noticeId } = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      {noticeId && (
        <InvestigationForm noticeId={parseInt(noticeId as string)} />
      )}
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
