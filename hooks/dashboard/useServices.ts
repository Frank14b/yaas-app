import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateServiceDto, ResultServiceDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useServices() {
  //
  const getServices = useQuery({
    queryKey: [Keys.Queries.GET_SERVICES],
    queryFn: async () => {
      const result = await apiCall<{
        data: ResultServiceDto[];
        message: string;
      }>({
        ...apiUrls.dashboard.getServices,
      });

      return result;
    },
  });

  const addService = useMutation({
    mutationKey: [Keys.Mutations.ADD_SERVICE],
    mutationFn: async (data: CreateServiceDto) => {
      const result = await apiCall<{
        data: ResultServiceDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addService,
      });

      return result;
    },
  });

  return {
    getServices,
    addService,
  };
}
