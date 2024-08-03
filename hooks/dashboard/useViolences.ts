import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import {
  CreateViolenceDto,
  ResultPaginate,
  ResultViolenceDto,
  ViolenceOptions,
  ViolenceTypeDto,
  ViolencesFlagDto,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useViolences() {
  //
  const getViolences = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCES],
      queryFn: async () => {
        const result = await apiCall<ResultPaginate<ResultViolenceDto[]>>({
          ...apiUrls.dashboard.getViolences,
        });

        return result;
      },
    });
  };

  const useGetViolence = (id: number) => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE, id],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultViolenceDto;
          message: string;
        }>({
          ...apiUrls.dashboard.getViolence,
          url: apiUrls.dashboard.getViolence.url + `/${id}`
        });

        return result;
      },
    });
  };

  const addViolence = useMutation({
    mutationKey: [Keys.Mutations.ADD_VIOLENCE],
    mutationFn: async (data: CreateViolenceDto) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        data: {
          ...data,
          name: "-",
          area: "-",
          date_occured: new Date(data.date_occured).getTime()
        },
        ...apiUrls.dashboard.addViolence,
      });

      return result;
    },
  });

  const getViolenceOptions = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE_OPTIONS],
      queryFn: async () => {
        const result = await apiCall<{
          data: ViolenceOptions;
          message: string;
        }>({
          ...apiUrls.dashboard.getViolenceOptions,
        });

        return result;
      },
    });
  };

  const getViolenceTypes = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE_TYPES],
      queryFn: async () => {
        const result = await apiCall<{
          data: ViolenceTypeDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getViolenceTypes,
        });

        return result;
      },
    });
  };

  const getViolenceFlags = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VIOLENCE_FLAGS],
      queryFn: async () => {
        const result = await apiCall<{
          data: ViolencesFlagDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getViolenceFlags,
        });

        return result;
      },
    });
  };

  return {
    getViolences,
    useGetViolence,
    getViolenceOptions,
    getViolenceTypes,
    getViolenceFlags,
    addViolence,
  };
}
