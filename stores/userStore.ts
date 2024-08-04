// user store
import { ResultUserDto } from "@/types";
import { storage } from "@/utils/expo-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type StoreType = {
  user: ResultUserDto | null;
  loading: boolean;
  userConnected: boolean;
  onBoardingCompleted: boolean;
  isAdmin: boolean;
  setIsAdmin: (status: boolean) => void;
  setUser: (userData: ResultUserDto | null) => void;
  setLoading: (newLoading: boolean) => void;
  setUserConnected: (connectedStatus: boolean) => void;
  setOnBoardingCompleted: (status: boolean) => void;
};

export const useUserStore = create<StoreType>()(
  persist(
    (set, get) => ({
      user: get()?.user ?? null, // Initial state for user info
      loading: true, // Tracks if user data is loading
      userConnected: get()?.userConnected ?? false, // initial user auth status
      onBoardingCompleted: get()?.onBoardingCompleted ?? false,
      isAdmin: get()?.isAdmin ?? false,
      setIsAdmin: (status: boolean) => set({isAdmin: status}),
      setUser: (newUser: any) => set({ user: newUser }), // Action to update user info
      setLoading: (newLoading: any) => set({ loading: newLoading }), // Action to update loading state
      setUserConnected: (connectedStatus: boolean) =>
        set({ userConnected: connectedStatus }), // Action to update the user auth status
      setOnBoardingCompleted: (status: boolean) =>
        set({ onBoardingCompleted: status }),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => ({
        getItem: async <T>(name: string): Promise<string | null> => {
          const value = await storage.getItem<T>(name, true);
          return value as string;
        },
        setItem: async (name, value) => {
          const rs = await storage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await storage.deleteItem(name);
        },
      })),
    }
  )
);
