import { ThemedView } from "@/components";
import { ViolenceDetails } from "@/components/dashboard";
import { useViolences } from "@/hooks";
import { useUserStore } from "@/stores";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function ViolenceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { useGetViolence } = useViolences();
  const getViolence = useGetViolence(parseInt(id as string));
  const { isAdmin } = useUserStore();

  const violence = useMemo(() => {
    return getViolence.data?.data?.data;
  }, [getViolence.data]);

  return (
    <ThemedView style={styles.container}>
      {getViolence.isPending && <ActivityIndicator size={"large"} />}
      {violence && <ViolenceDetails item={violence} isAdmin={isAdmin} />}
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
    justifyContent: "center",
  },
});
