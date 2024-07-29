import { Keys } from "@/constants";
import { apiCall, apiUrls } from "@/services";
import { useUserStore } from "@/stores";
import { ResultUserDto } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext<any>({});

export function AuthWrapper({ children }: { children: any }) {
  //
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const { setUserConnected, setUser } = useUserStore();

  const { data, refetch } = useQuery({
    queryKey: [Keys.Queries.VALIDATE_SESSION],
    queryFn: async () => {
      const result = await apiCall<{
        data: ResultUserDto;
        token: string;
      }>({
        ...apiUrls.auth.validateSession,
      });

      return result;
    },
  });

  useEffect(() => {
    if (data?.statusCode == 401) {
      queryClient.clear();
      setUserConnected(false);
      return;
    }

    if (data) {
      if (!data.data) {
        queryClient.clear();
        setUserConnected(false);
        return;
      }
    }

    if(data?.data?.data?.id) {
      setUser(data.data.data as any);
    }
    
  }, [data, setUser, setUserConnected]);

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
