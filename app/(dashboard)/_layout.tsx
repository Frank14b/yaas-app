import ThemedDrawer from "@/components/common/ThemedDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
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
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={(props) => <ThemedDrawer {...props} />}>
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
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: "#aaa",
  },
});
