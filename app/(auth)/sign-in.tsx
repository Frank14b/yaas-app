import { AnimateFadeInView, ThemedText, ThemedView } from "@/components";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { BlurView } from "expo-blur";
import { SignInForm } from "@/components/dashboard";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useLanguages } from "@/hooks/useLanguages";

export default function SignInScreen() {
  //
  const locale = useTranslation().i18n;
  const theme = useColorScheme();
  const { openLanguageMenu } = useLanguages();

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
              <ThemedView
                style={[styles.wrapperView, dynamicStyle.wrapperView]}
              >
                <SignInForm />
              </ThemedView>
              <ThemedView style={styles.localeContainer}>
                <TouchableOpacity onPress={openLanguageMenu}>
                  <ThemedView style={styles.localeWrapper}>
                    <ThemedText>
                      <Ionicons name="flag" size={13} />
                    </ThemedText>
                    <ThemedText type="medium" style={styles.localeText}>
                      {locale.language.split("-")[0]}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
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
