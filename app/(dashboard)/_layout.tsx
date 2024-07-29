import ThemedDrawer from "@/components/common/ThemedDrawer";
import { TabNavigationWrapper, AuthWrapper } from "@/contexts";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useCallback, useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SCREENS = [
  {
    name: "(tabs)",
    options: {
      label: "Home",
      showHeader: false,
      icon: "home",
      drawerItemStyle: {},
    },
  },
  {
    name: "countries",
    options: {
      label: "Countries",
      showHeader: true,
      icon: "globe",
      drawerItemStyle: {},
    },
  },
  {
    name: "users",
    options: {
      label: "Users",
      showHeader: true,
      icon: "people",
      drawerItemStyle: {},
    },
  },
  {
    name: "access",
    options: {
      label: "Role Access",
      showHeader: true,
      icon: "lock-open",
      drawerItemStyle: {},
    },
  },
  {
    name: "(forms)",
    options: {
      label: "Forms",
      showHeader: false,
      icon: "lock-open",
      drawerItemStyle: { display: "none" },
    },
  },
];

export default function DashBoardLayout() {
  //
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
      <AuthWrapper>
        <TabNavigationWrapper>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
              drawerContent={(props) => (
                <ThemedDrawer
                  isDark={isDark}
                  logout={proceedLogout}
                  {...props}
                />
              )}
            >
              {SCREENS.map((item, index) => (
                <Drawer.Screen
                  key={index}
                  name={item.name}
                  options={{
                    drawerItemStyle: item.options.drawerItemStyle as any,
                    drawerLabel: item.options.label,
                    title: item.options.label,
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
      </AuthWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: "#aaa",
  },
});
