import { ThemedView } from "@/components";
import { UserViolenceForm, ViolenceForm } from "@/components/dashboard";
import { useViolences } from "@/hooks";
import { useUserStore } from "@/stores";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function ViolenceFormScreen() {
  //
  const { isAdmin } = useUserStore();

  const { id } = useLocalSearchParams();
  const { useGetViolence } = useViolences();
  const getViolence = useGetViolence(id ? parseInt(id as string) : undefined);

  const violence = useMemo(() => {
    if (getViolence) {
      return getViolence.data?.data?.data;
    }
  }, [getViolence?.data]);

  return (
    <ThemedView style={styles.container}>
      {isAdmin && <ViolenceForm violence={violence} />}
      {!isAdmin && <UserViolenceForm violence={violence} />}
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
