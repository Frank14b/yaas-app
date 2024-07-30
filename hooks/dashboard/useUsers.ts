import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateUserDto, ResultPaginate, ResultUserDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUsers() {
  //
  const getUsers = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_USERS],
      queryFn: async () => {
        const result = await apiCall<ResultPaginate<ResultUserDto[]>>({
          ...apiUrls.dashboard.getUsers,
        });
  
        return result;
      },
    })
  };

  const addUser = useMutation({
    mutationKey: [Keys.Mutations.ADD_USER],
    mutationFn: async (data: CreateUserDto) => {
      const result = await apiCall<{
        data: ResultUserDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addUser,
      });

      return result;
    },
  });

  const getVictims = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_VICTIMS],
      queryFn: async () => {
        const result = await apiCall<ResultPaginate<ResultUserDto[]>>({
          ...apiUrls.dashboard.getVictims,
        });

        return result;
      },
    });
  };

  return {
    getUsers,
    getVictims,
    addUser,
  };
}
