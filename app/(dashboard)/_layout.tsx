import ThemedDrawer from "@/components/ThemedDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DashBoardLayout() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={(props) => <ThemedDrawer {...props} />}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: "Home",
              title: `Home`,
              headerShown: false,
              drawerIcon: ({ focused, size }) => <Ionicons name="home" size={17} color="#007bff" />,
            }}
          />
          <Drawer.Screen
            name="countries"
            options={{
              drawerLabel: "Countries",
              title: `Countries`,
              headerShown: true,
              drawerIcon: ({ focused, size }) => <Ionicons name="globe" size={17} color="#007bff" />,
            }}
          />
          <Drawer.Screen
            name="users"
            options={{
              drawerLabel: "Users",
              title: `Users`,
              headerShown: true,
              drawerIcon: ({ focused, size }) => <Ionicons name="people" size={17} color="#007bff" />,
            }}
          />
          <Drawer.Screen
            name="access"
            options={{
              drawerLabel: "Role Access",
              title: `Role Access`,
              headerShown: true,
              drawerIcon: ({ focused, size }) => <Ionicons name="lock-open" size={17} color="#007bff" />,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
