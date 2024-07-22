import {
  ThemedButton,
  ThemedView,
  ThemedFormView,
  ThemedInput,
  ThemedText,
} from "@/components";
import { ImageBackground, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useCallback } from "react";
import { storage } from "@/utils/expo-storage";
import { StorageKeys } from "@/constants";

export default function SignInScreen({
  handleSession,
}: {
  handleSession: () => void;
}) {
  const proceedSignIn = useCallback(async () => {
    await storage.setItem(StorageKeys.USER_SESSION_ACTIVE, "1");
    handleSession();
  }, []);

  return (
    <>
      <ThemedView style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.bgImage}
          source={require("@/assets/images/hand-solidarity.png")}
        >
          <BlurView intensity={40} style={styles.blurContainer}>
            <ThemedView style={styles.wrapperView}>
              <ThemedFormView>
                <ThemedText style={styles.title} type="title">
                  Sign In
                </ThemedText>

                <ThemedInput
                  label="Email"
                  name="email"
                  placeholder="Enter email address"
                  keyboardType="email-address"
                />

                <ThemedInput
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  keyboardType="visible-password"
                />

                <ThemedButton title="Proceed" onPress={() => proceedSignIn()} />

                <ThemedText style={styles.forgotPassword}>
                  Forgot your password?
                  <ThemedText type="link"> Reset Here</ThemedText>
                </ThemedText>
              </ThemedFormView>
            </ThemedView>
          </BlurView>
        </ImageBackground>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: 50,
  },
  forgotPassword: {
    marginTop: 5,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  wrapperView: {
    flex: 1,
    padding: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  blurContainer: {
    flex: 1,
    overflow: "hidden",
  },
});
