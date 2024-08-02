import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateRoleDto, ResultRolesDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useRoleAccess() {
  //
  const useGetRoles = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_ROLES],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultRolesDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getRoles,
        });
  
        return result;
      },
    })
  };

  const addRole = useMutation({
    mutationKey: [Keys.Mutations.ADD_ROLE],
    mutationFn: async (data: CreateRoleDto) => {
      const result = await apiCall<{
        data: ResultRolesDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addRole,
      });

      return result;
    },
  });

  const deleteRole = useMutation({
    mutationKey: [Keys.Mutations.DELETE_COUNTRY],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultRolesDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteRole,
        url: apiUrls.dashboard.deleteRole.url += `/${id}`
      });

      return result.data;
    },
  });

  return {
    useGetRoles,
    addRole,
    deleteRole
  };
}
