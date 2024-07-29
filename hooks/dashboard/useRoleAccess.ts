import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateRoleDto, ResultRolesDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useRoleAccess() {
  //
  const getRoles = useQuery({
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
  });

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

  return {
    getRoles,
    addRole,
  };
}
