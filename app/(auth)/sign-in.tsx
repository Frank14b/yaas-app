import {
  ThemedButton,
  ThemedView,
  ThemedFormView,
  ThemedInput,
  ThemedText,
} from "@/components";
import { StyleSheet } from "react-native";

export default function SignInScreen({
  handleSession,
}: {
  handleSession: () => void;
}) {
  return (
    <>
      <ThemedView style={styles.container}>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: 50,
  },
  forgotPassword: {
    marginTop: 5,
  },
});
