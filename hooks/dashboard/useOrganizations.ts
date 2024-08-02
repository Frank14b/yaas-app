import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateOrganizationDto, ResultOrganizationDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useOrganizations() {
  //
  const useGetOrganizations = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_ORGANIZATIONS],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultOrganizationDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getOrganizations,
        });

        return result;
      },
    });
  };

  const addOrganization = useMutation({
    mutationKey: [Keys.Mutations.ADD_ORGANIZATION],
    mutationFn: async (data: CreateOrganizationDto) => {
      const result = await apiCall<{
        data: ResultOrganizationDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addOrganization,
      });

      return result.data;
    },
  });

  const deleteOrganization = useMutation({
    mutationKey: [Keys.Mutations.DELETE_ORGANIZATION],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultOrganizationDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteOrganization,
        url: (apiUrls.dashboard.deleteOrganization.url += `/${id}`),
      });

      return result.data;
    },
  });

  return {
    useGetOrganizations,
    addOrganization,
    deleteOrganization,
  };
}
