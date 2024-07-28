import {
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedText,
} from "@/components";
import { useAppForm, useSignIn } from "@/hooks";
import { useUserStore } from "@/stores";
import { AuthDto } from "@/types";
import { SignInSchema } from "@/validators";
import { useCallback } from "react";
import { Alert, StyleSheet } from "react-native";

export function SignInForm() {
  //
  const { user, setUserConnected, setUser } = useUserStore();

  const { handleSubmit } = useAppForm({
    schema: SignInSchema(),
    defaultValues: {
      email: user?.email ?? "",
      password: "",
    },
  });

  const { isLoading, mutateAsync } = useSignIn();

  const proceedSignIn = useCallback(
    async (data: AuthDto) => {
      const result = await mutateAsync(data);

      if (result.status) {
        setUserConnected(true);
        setUser(result.data?.data as any);
        return;
      }

      Alert.alert("Authentication failed", result.message);
      //
    },
    [setUserConnected]
  );

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
          autoCorrect={false}
          autoComplete={"off"}
        />

        <ThemedInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          keyboardType="visible-password"
        />

        <ThemedButton
          disabled={isLoading}
          title="Proceed"
          onPress={handleSubmit(proceedSignIn)}
        />

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
