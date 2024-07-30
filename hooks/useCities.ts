import { useFormStore } from "@/stores";
import { appCities } from "@/utils/cities";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

export function useCities({ countryKeyName }: { countryKeyName?: string }) {
  //
  const { reactHookUseForm } = useFormStore();
  const { watch } = (reactHookUseForm as UseFormReturn<any>) ?? {};

  const countryValue = countryKeyName ? watch?.(countryKeyName) : null;

  const cities = useMemo(() => {
    const filteredCities = countryValue
      ? appCities.find(
          (item) => item.country.toLowerCase() == countryValue.toLowerCase()
        )
      : appCities[0];

    return (
      filteredCities?.cities.map((item) => {
        return {
          label: item,
          value: item,
        };
      }) ?? []
    );
  }, [countryValue]);

  return {
    cities,
  };
}
