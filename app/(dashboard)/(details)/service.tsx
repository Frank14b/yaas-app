import { ThemedView } from "@/components";
import { ServiceDetails } from "@/components/dashboard";
import { useServices } from "@/hooks";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function ServiceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { useGetService } = useServices();
  const getService = useGetService(parseInt(id as string));

  const service = useMemo(() => {
    return getService.data?.data?.data;
  }, [getService.data]);

  return (
    <ThemedView style={styles.container}>
      {getService.isPending && <ActivityIndicator size={"large"} />}
      {service && <ServiceDetails item={service} />}
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
