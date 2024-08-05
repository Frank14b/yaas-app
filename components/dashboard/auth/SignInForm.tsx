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
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";

export function SignInForm() {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user, setUserConnected, setUser, setIsAdmin } = useUserStore();

  const { handleSubmit } = useAppForm({
    schema: SignInSchema(),
    defaultValues: {
      email: user?.email ?? "",
      password: "",
    },
  });

  const { isPending, mutateAsync } = useSignIn().userSignIn;

  const proceedSignIn = useCallback(
    async (data: AuthDto) => {
      const result = await mutateAsync(data);

      if (result.status) {
        setUserConnected(true);
        setIsAdmin(false);
        setUser(result.data?.data as any);
        queryClient.clear();
        return;
      }

      Alert.alert(t("signIn.auth_failed"), result.message);
      //
    },
    [setUserConnected, setIsAdmin, setUser]
  );

  return (
    <>
      <ThemedFormView>
        <ThemedText style={styles.title} type="title">
          {t("signIn.user.title")}
        </ThemedText>

        <ThemedInput
          label={t("signIn.form.email")}
          name="email"
          placeholder={t("signIn.form.placeholder_email")}
          keyboardType="email-address"
          autoCorrect={false}
          autoComplete={"off"}
        />

        <ThemedInput
          label={t("signIn.form.password")}
          name="password"
          placeholder={t("signIn.form.placeholder_password")}
          keyboardType="visible-password"
        />

        <ThemedButton
          isLoading={isPending}
          disabled={isPending}
          title={t("signIn.form.submit_btn")}
          onPress={handleSubmit(proceedSignIn)}
        />

        <ThemedText style={styles.forgotPassword}>
          {t("signIn.forgot_password")}
          <ThemedText type="link"> {t("signIn.reset_text")}</ThemedText>
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
