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
import { Href, router } from "expo-router";
import { useTabNavigationContext } from "@/contexts";
import { useDashboardStats } from "@/hooks";
import { DashboardStatsDto } from "@/types";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useLanguages } from "@/hooks/useLanguages";
import { useUserStore } from "@/stores";

export type CardBox = {
  title: string;
  icon: string;
  value: number;
  path: string;
  valueKey: keyof DashboardStatsDto;
}[];

const CARD_BOX: CardBox = [
  {
    title: "homeScreen.reports",
    icon: "warning-sharp",
    value: 0,
    path: "(tabs)/violences",
    valueKey: "incidents_count",
  },
  {
    title: "homeScreen.users",
    icon: "people",
    value: 0,
    path: "users",
    valueKey: "users_count",
  },
  {
    title: "homeScreen.countries",
    icon: "globe",
    value: 0,
    path: "countries",
    valueKey: "countries_count",
  },
  {
    title: "homeScreen.services",
    icon: "settings",
    value: 0,
    path: "(tabs)/services",
    valueKey: "consultations_count",
  },
  {
    title: "homeScreen.organizations",
    icon: "bookmarks",
    value: 0,
    path: "organizations",
    valueKey: "ong_count",
  },
  {
    title: "homeScreen.victims",
    icon: "person-add",
    value: 0,
    path: "victims",
    valueKey: "victims_count",
  },
];

export default function HomeScreen() {
  //
  const { t, i18n } = useTranslation();
  const { slidePosition } = useTabNavigationContext();
  const { stats } = useDashboardStats();
  const { openLanguageMenu } = useLanguages();

  const { isAdmin } = useUserStore();

  const goToPage = useCallback((path: string) => {
    router.push(path as Href);
  }, []);

  const statsComponent = useMemo(() => {
    return CARD_BOX.map((item, index) => (
      <ThemedView key={index} style={[styles.boxCard]}>
        <AnimateFadeInView>
          <ThemedCardBox
            onPress={() => goToPage(item.path)}
            name={item.icon as any}
            title={t(item.title)}
            value={stats?.[item.valueKey] ?? 0}
          ></ThemedCardBox>
        </AnimateFadeInView>
      </ThemedView>
    ));
  }, [stats, t, goToPage]);

  return (
    <AnimateSlideInView duration={200} position={slidePosition}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={
              isAdmin
                ? require("@/assets/images/on-boarding/Team-spirit-bro.png")
                : require("@/assets/images/holding-hands-with-olive-leaves.png")
            }
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t("homeScreen.welcome")}</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.boxContainer}>
          {isAdmin && statsComponent}
          {!isAdmin && (
            <>
              <ThemedCardBox
                onPress={() => goToPage("")}
                name={"warning-sharp"}
                title={""}
                value={0}
              ></ThemedCardBox>
            </>
          )}
        </ThemedView>
      </ParallaxScrollView>

      <ThemedView style={styles.localeContainer}>
        <TouchableOpacity onPress={openLanguageMenu}>
          <ThemedView style={styles.localeWrapper}>
            <ThemedText>
              <Ionicons name="flag" size={13} />
            </ThemedText>
            <ThemedText type="medium" style={styles.localeText}>
              {i18n.language.split("-")[0]}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
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

  localeContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "transparent",
  },
  localeText: {
    textTransform: "uppercase",
    gap: 4,
  },
  localeWrapper: {
    gap: 5,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
