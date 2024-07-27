import ThemedDrawer from "@/components/common/ThemedDrawer";
import { TabNavigationWrapper } from "@/contexts/TabNavigationContext";
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
    },
  },
  {
    name: "countries",
    options: {
      label: "Countries",
      showHeader: true,
      icon: "globe",
    },
  },
  {
    name: "users",
    options: {
      label: "Users",
      showHeader: true,
      icon: "people",
    },
  },
  {
    name: "access",
    options: {
      label: "Role Access",
      showHeader: true,
      icon: "lock-open",
    },
  },
];

export default function DashBoardLayout() {
  //
  const { setUserConnected, setOnBoardingCompleted } = useUserStore();
  const theme = useColorScheme();

  const proceedLogout = useCallback(() => {
    useUserStore.persist.clearStorage();
    setOnBoardingCompleted(false);
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
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: "#aaa",
  },
});
