import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { CreateCountryDto, ResultCountriesDto } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCountries() {
  //
  const getCountries = useQuery({
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
  });

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

  return {
    getCountries,
    addCountry,
  };
}
