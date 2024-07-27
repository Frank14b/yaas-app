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
import { useCallback } from "react";
import { router } from "expo-router";
import { useTabNavigationContext } from "@/contexts/TabNavigationContext";

const CARD_BOX = [
  {
    title: "Reports",
    icon: "warning-sharp",
    value: 30,
    path: "(tabs)/violences",
  },
  {
    title: "Users",
    icon: "people",
    value: 40,
    path: "users",
  },
  {
    title: "Countries",
    icon: "globe",
    value: 5,
    path: "countries",
  },
  {
    title: "Services",
    icon: "settings",
    value: 15,
    path: "(tabs)/services",
  },
];

export default function HomeScreen() {
  //
  const { slidePosition } = useTabNavigationContext();

  const goToPage = useCallback((path: string) => {
    router.push(path);
  }, []);

  return (
    <AnimateSlideInView duration={300} position={slidePosition}>
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
        <ThemedView style={styles.boxContainer}>
          {CARD_BOX.map((item, index) => (
            <ThemedView key={index} style={[styles.boxCard]}>
              <AnimateFadeInView>
                <ThemedCardBox
                  onPress={() => goToPage(item.path)}
                  name={item.icon as any}
                  title={item.title}
                  value={item.value}
                ></ThemedCardBox>
              </AnimateFadeInView>
            </ThemedView>
          ))}
        </ThemedView>
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
