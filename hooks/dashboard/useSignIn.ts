import { StorageKeys } from "@/constants";
import { Keys } from "@/constants/ReactQuery";
import { apiCall, apiUrls } from "@/services";
import { AuthDto, ResultLoginDto } from "@/types";
import { storage } from "@/utils/expo-storage";
import { useMutation } from "@tanstack/react-query";

export function useSignIn() {
  //
  const { isPending, mutateAsync } = useMutation({
    mutationKey: [Keys.Mutations.SIGNIN],
    mutationFn: async (data: AuthDto) => {
      const result = await apiCall<{ data: ResultLoginDto; token: string }>({
        data,
        ...apiUrls.auth.login,
      });

      if (result.status) {
        await storage.setItem(StorageKeys.AUTH_TOKEN, `${result.data?.token}`);
      }

      return result;
    },
  });

  return {
    isLoading: isPending,
    mutateAsync,
  };
}
