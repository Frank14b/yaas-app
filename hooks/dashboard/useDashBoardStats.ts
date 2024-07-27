import { Keys } from "@/constants";
import { apiUrls, apiCall } from "@/services";
import { DashboardStatsDto } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useDashboardStats() {
  //
  const { isLoading, data } = useQuery({
    queryKey: [Keys.Queries.DASHBOARD_STATS],
    queryFn: async () => {
      const result = await apiCall<{
        data: DashboardStatsDto;
        message: string;
      }>({
        ...apiUrls.dashboard.getStats,
      });

      return result;
    },
  });

  const stats = useMemo(() => {
    if (!data?.status) return {} as DashboardStatsDto;
    return data.data?.data;
  }, [data]);

  return {
    isLoading,
    stats,
  };
}
