import ThemedDrawer from "@/components/common/ThemedDrawer";
import { StorageKeys } from "@/constants";
import { TabNavigationWrapper } from "@/contexts";
import { useUserStore } from "@/stores";
import { storage } from "@/utils/expo-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const getScreens = (isAdmin: boolean) => {
  return [
    {
      name: "(tabs)",
      options: {
        label: "navigation.home",
        showHeader: false,
        icon: "home",
        drawerItemStyle: isAdmin ? {} : {},
      },
    },
    {
      name: "countries",
      options: {
        label: "navigation.countries",
        showHeader: true,
        icon: "globe",
        drawerItemStyle: isAdmin ? {} : { display: "none" },
      },
    },
    {
      name: "users",
      options: {
        label: "navigation.users",
        showHeader: true,
        icon: "people",
        drawerItemStyle: isAdmin ? {} : { display: "none" },
      },
    },
    {
      name: "access",
      options: {
        label: "navigation.role_access",
        showHeader: true,
        icon: "lock-open",
        drawerItemStyle: isAdmin ? {} : { display: "none" },
      },
    },
    {
      name: "victims",
      options: {
        label: "navigation.victims",
        showHeader: true,
        icon: "person-add",
        drawerItemStyle: isAdmin ? {} : { display: "none" },
      },
    },
    {
      name: "organizations",
      options: {
        label: "navigation.organizations",
        showHeader: true,
        icon: "home-outline",
        drawerItemStyle: isAdmin ? {} : { display: "none" },
      },
    },
    {
      name: "settings",
      options: {
        label: "navigation.settings",
        showHeader: true,
        icon: "settings",
        drawerItemStyle: isAdmin ? {} : { display: "none" },
      },
    },
  ];
};

export default function NavigationLayout() {
  //
  const { t } = useTranslation();
  const { isAdmin, setUserConnected, setOnBoardingCompleted } = useUserStore();
  const theme = useColorScheme();

  const SCREENS = getScreens(isAdmin);

  const proceedLogout = useCallback(async () => {
    //
    await storage.deleteItem(StorageKeys.AUTH_TOKEN);
    await storage.deleteItem(StorageKeys.IS_ADMIN_USER);

    setOnBoardingCompleted(true);
    setUserConnected(false);
    router.push("/");
  }, [setUserConnected, setOnBoardingCompleted]);

  const isDark = useMemo(() => {
    return theme === "dark";
  }, [theme]);

  return (
    <>
      <TabNavigationWrapper>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => (
              <ThemedDrawer isDark={isDark} logout={proceedLogout} {...props} />
            )}
          >
            {SCREENS.map((item, index) => (
              <Drawer.Screen
                key={index}
                name={item.name}
                options={{
                  drawerItemStyle: item.options.drawerItemStyle as any,
                  drawerLabel: t(item.options.label),
                  title: t(item.options.label),
                  headerShown: item.options.showHeader,
                  drawerIcon: ({ focused }) => (
                    <Ionicons
                      style={styles.icon}
                      name={item.options.icon as any}
                      size={17}
                      focused={focused}
                    />
                  ),
                }}
              />
            ))}
          </Drawer>
        </GestureHandlerRootView>
      </TabNavigationWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: "#aaa",
  },
});
