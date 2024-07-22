import { Image, StyleSheet } from "react-native";

import {
  HelloWave,
  ParallaxScrollView,
  ThemedCardBox,
  ThemedText,
  ThemedView,
} from "@/components";

export default function HomeScreen() {
  return (
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
        <ThemedCardBox
          name="warning-sharp"
          title="Reports"
          value={30}
          style={styles.boxCard}
        ></ThemedCardBox>
        <ThemedCardBox
          name="people"
          title="Users"
          value={20}
          style={styles.boxCard}
        ></ThemedCardBox>
        <ThemedCardBox
          name="globe"
          title="Countries"
          value={5}
          style={styles.boxCard}
        ></ThemedCardBox>
        <ThemedCardBox
          name="settings"
          title="Services"
          value={15}
          style={styles.boxCard}
        ></ThemedCardBox>
      </ThemedView>
    </ParallaxScrollView>
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
