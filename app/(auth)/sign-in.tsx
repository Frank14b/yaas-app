import { AnimateFadeInView, ThemedView } from "@/components";
import { ImageBackground, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { SignInForm } from "@/components/dashboard";

export default function SignInScreen() {
  const theme = useColorScheme();

  const dynamicStyle = {
    wrapperView: {
      backgroundColor:
        theme == "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.7)",
    },
  };

  return (
    <>
    <AnimateFadeInView>
      <ThemedView style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.bgImage}
          source={require("@/assets/images/hand-solidarity.png")}
        >
          <BlurView intensity={40} style={styles.blurContainer}>
            <ThemedView style={[styles.wrapperView, dynamicStyle.wrapperView]}>
              <SignInForm />
            </ThemedView>
          </BlurView>
        </ImageBackground>
      </ThemedView>
      </AnimateFadeInView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  wrapperView: {
    flex: 1,
    padding: "5%",
  },
  blurContainer: {
    flex: 1,
    overflow: "hidden",
  },
});
