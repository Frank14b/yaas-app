import ThemedDrawer from "@/components/common/ThemedDrawer";
import { TabNavigationWrapper } from "@/contexts";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SCREENS = [
  {
    name: "(tabs)",
    options: {
      label: "navigation.home",
      showHeader: false,
      icon: "home",
      drawerItemStyle: {},
    },
  },
  {
    name: "countries",
    options: {
      label: "navigation.countries",
      showHeader: true,
      icon: "globe",
      drawerItemStyle: {},
    },
  },
  {
    name: "users",
    options: {
      label: "navigation.users",
      showHeader: true,
      icon: "people",
      drawerItemStyle: {},
    },
  },
  {
    name: "access",
    options: {
      label: "navigation.role_access",
      showHeader: true,
      icon: "lock-open",
      drawerItemStyle: {},
    },
  },
  {
    name: "victims",
    options: {
      label: "navigation.victims",
      showHeader: true,
      icon: "person-add",
      drawerItemStyle: {},
    },
  },
  {
    name: "organizations",
    options: {
      label: "navigation.organizations",
      showHeader: true,
      icon: "home-outline",
      drawerItemStyle: {},
    },
  },
  {
    name: "settings",
    options: {
      label: "navigation.settings",
      showHeader: true,
      icon: "settings",
      drawerItemStyle: {},
    },
  },
];

export default function NavigationLayout() {
  //
  const { t } = useTranslation();
  const { setUserConnected, setOnBoardingCompleted } = useUserStore();
  const theme = useColorScheme();

  const proceedLogout = useCallback(() => {
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
