import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTabNavigationContext } from "@/contexts/TabNavigationContext";

export default function TabLayout() {
  //
  const colorScheme = useColorScheme();
  const { TAB_SCREENS, handleTabPress } = useTabNavigationContext();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
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
              title: item.title,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={
                    focused ? (item.icon.default as any) : item.icon.focused
                  }
                  color={color}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
