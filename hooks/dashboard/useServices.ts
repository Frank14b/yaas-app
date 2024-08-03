import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import {
  CreateServiceDto,
  ResultPaginate,
  ResultServiceDto,
  ResultServiceTypeDto,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useServices() {
  //
  const useGetServices = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_SERVICES],
      queryFn: async () => {
        const result = await apiCall<ResultPaginate<ResultServiceDto[]>>({
          ...apiUrls.dashboard.getServices,
        });

        return result;
      },
    });
  };
  
  const useGetService = (id: number) => {
    return useQuery({
      queryKey: [Keys.Queries.GET_SERVICE, id],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultServiceDto;
          message: string;
        }>({
          ...apiUrls.dashboard.getService,
          url: apiUrls.dashboard.getService.url + `/${id}`
        });

        return result;
      },
    });
  };

  const addService = useMutation({
    mutationKey: [Keys.Mutations.ADD_SERVICE],
    mutationFn: async (data: CreateServiceDto) => {
      const result = await apiCall<{
        data: ResultServiceDto;
        message: string;
      }>({
        data: {
          ...data,
          booking_date: new Date(data.booking_date).getTime(),
          maritalStatus: "-",
          orientation: "-",
          partnerOrientation: "-",
          area: "-",
          age: 0,
        },
        ...apiUrls.dashboard.addService,
      });

      return result;
    },
  });

  const assignService = useMutation({
    mutationKey: [Keys.Mutations.ADD_SERVICE],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultServiceDto;
        message: string;
      }>({
        data: {
          confirm_date: Date.now(),
          confirm_time: "00:00",
        },
        ...apiUrls.dashboard.addService,
        // url: apiUrls.dashboard. += `/${id}/confirm`
      });

      return result;
    },
  });

  const useGetServiceTypes = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_SERVICE_TYPES],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultServiceTypeDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getServiceTypes,
        });

        return result;
      },
    });
  };

  return {
    useGetServices,
    useGetService,
    useGetServiceTypes,
    addService,
    assignService
  };
}
