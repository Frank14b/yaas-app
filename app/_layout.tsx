import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import OnBoardingLayout from "./(on-boarding)/_layout";
import AuthLayout from "./(auth)/_layout";
import { Stack } from "expo-router";
import { useUserStore } from "@/stores";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //
  const colorScheme = useColorScheme();
  //
  const { userConnected, onBoardingCompleted } = useUserStore();
  //
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ActionSheetProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {!onBoardingCompleted ? (
            <OnBoardingLayout />
          ) : !userConnected ? (
            <AuthLayout />
          ) : (
            <>
              <Stack>
                <Stack.Screen
                  name="(dashboard)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </>
          )}
        </ThemeProvider>
      </ActionSheetProvider>
    </QueryClientProvider>
  );
}
