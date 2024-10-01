import { ThemedConfirmDialog, ThemedView } from "@/components";
import { ServiceDetails } from "@/components/dashboard";
import { useServices } from "@/hooks";
import { useUserStore } from "@/stores";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";

export default function ServiceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useUserStore();
  const { confirmService, useGetService } = useServices();
  const getService = useGetService(parseInt(id as string));

  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    id?: number;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });
  const proceedCancelRequest = (id: number) =>
    setShowConfirmation({ status: true, id });

  const service = useMemo(() => {
    return getService.data?.data?.data;
  }, [getService.data]);

  const proceedConfirm = useCallback(
    async (id: number) => {
      const result = await confirmService.mutateAsync(id);
      if (result.status) {
        getService.refetch();
      } else {
        Alert.alert(`Error`, `${result.data?.message}`);
      }
    },
    [getService.refetch]
  );

  const proceedCancel = useCallback(
    async (id: number) => {
      const result = await confirmService.mutateAsync(id);
      if (result.status) {
        getService.refetch();
      } else {
        Alert.alert(`Error`, `${result.data?.message}`);
      }
    },
    [getService.refetch]
  );

  return (
    <>
      <ThemedView style={styles.container}>
        {getService.isPending && <ActivityIndicator size={"large"} />}
        {service && (
          <ServiceDetails
            user={user}
            item={service}
            proceedConfirm={() => proceedConfirm(service.id)}
            proceedCancel={() => proceedCancelRequest(service.id)}
          />
        )}
      </ThemedView>

      {showConfirmation.status && (
        <ThemedConfirmDialog
          message={`Are you sure you want to cancel this request ?`}
          visible={showConfirmation.status}
          cancelFn={handleCloseConfirmation}
          confirmFn={() => proceedCancel(showConfirmation.id as number)}
        />
      )}
    </>
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
