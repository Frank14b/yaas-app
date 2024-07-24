import {
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedText,
} from "@/components";
import { useAppForm } from "@/hooks";
import { useUserStore } from "@/stores";
import { SignInSchema } from "@/validators";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export function SignInForm() {
  //
  const { setUserConnected } = useUserStore();

  const { handleSubmit } = useAppForm({
    schema: SignInSchema(),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const proceedSignIn = useCallback(async () => {
    setUserConnected(true);
  }, [setUserConnected]);

  return (
    <>
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

        <ThemedButton title="Proceed" onPress={handleSubmit(proceedSignIn)} />

        <ThemedText style={styles.forgotPassword}>
          Forgot your password?
          <ThemedText type="link"> Reset Here</ThemedText>
        </ThemedText>
      </ThemedFormView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
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
