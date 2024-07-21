import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function SignInScreen({
  handleSession,
}: {
  handleSession: () => void;
}) {
  return (
    <>
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <ScrollView contentContainerStyle={{ ...styles.scrollViewContainer }}>
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
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  wrapper: {
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: "center",
    flexGrow: 1, // Optional to fill available space
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: 50,
  },
  submitBtn: {
    backgroundColor: "#999",
  },
  forgotPassword: {
    marginTop: 5
  }
});
