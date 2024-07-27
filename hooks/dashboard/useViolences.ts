import { Keys } from "@/constants/ReactQuery";
import { apiCall, apiUrls } from "@/services";
import { CreateViolenceDto, ResultViolenceDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useViolences() {
  //
  const getViolences = useQuery({
    queryKey: [Keys.Queries.GET_VIOLENCES],
    queryFn: async () => {
      const result = await apiCall<{
        data: ResultViolenceDto[];
        message: string;
      }>({
        ...apiUrls.dashboard.getViolences,
      });

      return result;
    },
  });

  const addViolence = useMutation({
    mutationKey: [Keys.Mutations.ADD_VIOLENCE],
    mutationFn: async (data: CreateViolenceDto) => {
      const result = await apiCall<{
        data: ResultViolenceDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addViolence,
      });

      return result;
    },
  });

  return {
    getViolences,
    addViolence,
  };
}
