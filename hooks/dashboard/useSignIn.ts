import { StorageKeys } from "@/constants";
import { Keys } from "@/constants/ReactQuery";
import { apiCall, apiUrls, userApiUrls } from "@/services";
import { AuthDto, ResultLoginDto } from "@/types";
import { storage } from "@/utils/expo-storage";
import { useMutation } from "@tanstack/react-query";

export function useSignIn() {
  //
  const adminSignIn = useMutation({
    mutationKey: [Keys.Mutations.ADMIN_SIGNIN],
    mutationFn: async (data: AuthDto) => {
      const result = await apiCall<{ data: ResultLoginDto; token: string }>({
        data,
        ...apiUrls.auth.login,
      });

      if (result.status) {
        await storage.setItem(StorageKeys.AUTH_TOKEN, `${result.data?.token}`);
        await storage.setItem(StorageKeys.IS_ADMIN_USER, `${1}`);
      }

      return result;
    },
  });

  const userSignIn = useMutation({
    mutationKey: [Keys.Mutations.SIGNIN],
    mutationFn: async (data: AuthDto) => {
      const result = await apiCall<{ data: ResultLoginDto; token: string }>({
        data,
        ...userApiUrls.auth.login,
      });

      if (result.status) {
        await storage.setItem(StorageKeys.AUTH_TOKEN, `${result.data?.token}`);
        await storage.setItem(StorageKeys.IS_ADMIN_USER, `${0}`);
      }

      return result;
    },
  });

  return {
    adminSignIn,
    userSignIn
  };
}
