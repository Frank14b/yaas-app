import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateCountryDto, ResultCountriesDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCountries() {
  //
  const useGetCountries = () => {
    return useQuery({
      queryKey: [Keys.Queries.GET_COUNTRIES],
      queryFn: async () => {
        const result = await apiCall<{
          data: ResultCountriesDto[];
          message: string;
        }>({
          ...apiUrls.dashboard.getCountries,
        });
  
        return result;
      },
    })
  };

  const addCountry = useMutation({
    mutationKey: [Keys.Mutations.ADD_COUNTRY],
    mutationFn: async (data: CreateCountryDto) => {
      const result = await apiCall<{
        data: ResultCountriesDto;
        message: string;
      }>({
        data,
        ...apiUrls.dashboard.addCountry,
      });

      return result.data;
    },
  });

  const deleteCountry = useMutation({
    mutationKey: [Keys.Mutations.DELETE_COUNTRY],
    mutationFn: async (id: number) => {
      const result = await apiCall<{
        data: ResultCountriesDto;
        message: string;
      }>({
        ...apiUrls.dashboard.deleteCountry,
        url: apiUrls.dashboard.deleteCountry.url += `/${id}`
      });

      return result.data;
    },
  });

  return {
    useGetCountries,
    addCountry,
    deleteCountry
  };
}
