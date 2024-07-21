import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { storage } from "@/utils/expo-storage";
import OnBoardingLayout from "./(on-boarding)/_layout";
import { StorageKeys } from "@/constants/Storage";
import AuthLayout from "./(auth)/_layout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //
  const colorScheme = useColorScheme();
  //
  const [showOnBoarding, setShowOnBoarding] = useState<boolean>(true);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const checkOnBoardingState = useCallback(async () => {
    const onBoardingStatus = await storage.getItem<string>(
      StorageKeys.ON_BOARDING_PASS
    );

    if (onBoardingStatus) {
      setShowOnBoarding(false);
    }
  }, [setShowOnBoarding]);

  const checkSessionState = useCallback(async () => {
    const activeSession = await storage.getItem<boolean>(
      StorageKeys.USER_SESSION_ACTIVE
    );

    if (activeSession) {
      setIsSessionActive(true);
    }
  }, [setIsSessionActive]);

  useEffect(() => {
    // storage.deleteItem(StorageKeys.ON_BOARDING_PASS);
    checkOnBoardingState();
    checkSessionState();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, checkOnBoardingState]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {showOnBoarding ? (
        <OnBoardingLayout handleOnBoarding={checkOnBoardingState} />
      ) : !isSessionActive ? (
        <AuthLayout handleSession={checkSessionState} />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      )}
    </ThemeProvider>
  );
}
