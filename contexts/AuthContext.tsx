import { Keys, StorageKeys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { useUserStore } from "@/stores";
import { ResultUserDto } from "@/types";
import { storage } from "@/utils/expo-storage";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext<any>({});

export function AuthWrapper({ children }: { children: any }) {
  //
  const pathName = usePathname();

  const { setUserConnected, setUser, setIsAdmin } = useUserStore();

  const { refetch } = useQuery({
    queryKey: [Keys.Queries.VALIDATE_SESSION],
    queryFn: async () => {
      const result = await apiCall<{
        data: ResultUserDto;
        token: string;
      }>({
        ...apiUrls.auth.validateSession,
      });

      if (result?.statusCode == 401) {
        //
        setUserConnected(false);
        await storage.deleteItem(StorageKeys.AUTH_TOKEN);
      } else if (result) {
        //
        if (!result.data) {
          setUserConnected(false);
          await storage.deleteItem(StorageKeys.AUTH_TOKEN);
        } else if (result?.data?.data?.id) {
          //
          setUserConnected(true);
          setUser(result.data.data as any);

          if(result.data.data.is_admin == false) {
            setIsAdmin(false)
          }else{
            setIsAdmin(true)
          }
        }
      }

      return result;
    },
  });

  useEffect(() => {
    refetch();
  }, [pathName, refetch]);

  const AuthData: AuthContextDto = {};

  return (
    <AuthContext.Provider value={AuthData}>
      <>{children}</>
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextDto => useContext(AuthContext);

export type AuthContextDto = {};
