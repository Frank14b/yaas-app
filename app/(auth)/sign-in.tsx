import {
  ThemedButton,
  ThemedView,
  ThemedFormView,
  ThemedInput,
  ThemedText,
} from "@/components";
import { ImageBackground, StyleSheet } from "react-native";

export default function SignInScreen({
  handleSession,
}: {
  handleSession: () => void;
}) {
  return (
    <>
      <ThemedView style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.bgImage}
          source={{
            uri: "https://relationshipsproject.org/content/uploads/2021/11/Screen-Shot-2021-11-19-at-15.50.37.png",
          }}
        >
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

              <ThemedButton title="Proceed" />

              <ThemedText style={styles.forgotPassword}>
                Forgot your password?
                <ThemedText type="link"> Reset Here</ThemedText>
              </ThemedText>
            </ThemedFormView>
          </ThemedView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
});
