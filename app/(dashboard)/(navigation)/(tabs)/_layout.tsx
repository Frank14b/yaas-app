import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTabNavigationContext } from "@/contexts/TabNavigationContext";
import { ThemedText, ThemedView } from "@/components";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  //
  const colorScheme = useColorScheme();
  const { TAB_SCREENS, handleTabPress } = useTabNavigationContext();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          unmountOnBlur: true,
        }}
        screenListeners={{
          tabPress: (e) => handleTabPress(e.target as string),
        }}
      >
        {TAB_SCREENS.map((item, index) => (
          <Tabs.Screen
            key={index}
            name={item.name}
            options={{
              href: item.excluded ? null : undefined,
              title: item.title,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={
                    focused ? (item.icon.default as any) : item.icon.focused
                  }
                  color={color}
                />
              ),
              headerShown: item.headerShown,
              header: () => (
                <ThemedView style={styles.tabScreenHeader}>
                  <ThemedText
                    lightColor="#333"
                    darkColor="#fff"
                    type="subtitle"
                  >
                    {item.title}
                  </ThemedText>
                </ThemedView>
              ),
              tabBarShowLabel: true,
            }}
          />
        ))}
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabScreenHeader: {
    padding: 10,
    paddingTop: 60,
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
  },
});
