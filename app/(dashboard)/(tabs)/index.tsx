import { Image, StyleSheet } from "react-native";

import {
  AnimateFadeInView,
  AnimateSlideInView,
  HelloWave,
  ParallaxScrollView,
  ThemedCardBox,
  ThemedText,
  ThemedView,
} from "@/components";
import { useCallback, useMemo } from "react";
import { router } from "expo-router";
import { useTabNavigationContext } from "@/contexts/TabNavigationContext";
import { useDashboardStats } from "@/hooks";
import { DashboardStatsDto } from "@/types";

export type CardBox = {
  title: string;
  icon: string;
  value: number;
  path: string;
  valueKey: keyof DashboardStatsDto;
}[];

const CARD_BOX: CardBox = [
  {
    title: "Reports",
    icon: "warning-sharp",
    value: 0,
    path: "(tabs)/violences",
    valueKey: "incidents_count",
  },
  {
    title: "Users",
    icon: "people",
    value: 0,
    path: "users",
    valueKey: "users_count",
  },
  {
    title: "Countries",
    icon: "globe",
    value: 0,
    path: "countries",
    valueKey: "countries_count",
  },
  {
    title: "Services",
    icon: "settings",
    value: 0,
    path: "(tabs)/services",
    valueKey: "consultations_count",
  },
  {
    title: "Organizations",
    icon: "bookmarks",
    value: 0,
    path: "(tabs)/organizations",
    valueKey: "ong_count",
  },
  {
    title: "Victims",
    icon: "person-add",
    value: 0,
    path: "(tabs)/victims",
    valueKey: "victims_count",
  },
];

export default function HomeScreen() {
  //
  const { slidePosition } = useTabNavigationContext();
  const { stats } = useDashboardStats();

  const goToPage = useCallback((path: string) => {
    router.push(path);
  }, []);

  const statsComponent = useMemo(() => {
    return CARD_BOX.map((item, index) => (
      <ThemedView key={index} style={[styles.boxCard]}>
        <AnimateFadeInView>
          <ThemedCardBox
            onPress={() => goToPage(item.path)}
            name={item.icon as any}
            title={item.title}
            value={stats?.[item.valueKey] ?? 0}
          ></ThemedCardBox>
        </AnimateFadeInView>
      </ThemedView>
    ));
  }, [stats, goToPage]);

  return (
    <AnimateSlideInView duration={200} position={slidePosition}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/on-boarding/Team-spirit-bro.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.boxContainer}>{statsComponent}</ThemedView>
      </ParallaxScrollView>
    </AnimateSlideInView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    paddingTop: 30,
  },
  boxContainer: {
    gap: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  reactLogo: {
    height: 250,
    width: 350,
    bottom: -50,
    left: -80,
    position: "absolute",
  },
  boxCard: {
    width: "48.5%",
  },
});
