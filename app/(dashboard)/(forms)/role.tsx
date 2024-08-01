import {
  ThemedButton,
  ThemedInput,
  ThemedView,
} from "@/components";

import { Keys } from "@/constants";
import { useAppForm, useRoleAccess } from "@/hooks";
import { CreateRoleDto } from "@/types";
import { RoleSchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function RoleFormScreen() {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addRole } = useRoleAccess();

  const { handleSubmit } = useAppForm({
    schema: RoleSchema(),
    defaultValues: {
      name: "",
      code: ""
    },
  });

  const proceedSaveRole = useCallback(async (data: CreateRoleDto) => {
    await addRole.mutateAsync(data);
    queryClient.invalidateQueries({ queryKey: [Keys.Queries.GET_ROLES] });
    router.back();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedInput
        name="name"
        label={t("roles.form.fields.name")}
        placeholder={t("roles.form.fields.name_placeholder")}
      />
      <ThemedButton
        title={t("roles.form.submit_btn")}
        onPress={handleSubmit(proceedSaveRole)}
        isLoading={addRole.isPending}
        disabled={addRole.isPending}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
