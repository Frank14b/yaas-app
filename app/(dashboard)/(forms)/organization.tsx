import {
    ThemedButton,
    ThemedInput,
    ThemedView,
  } from "@/components";
  
  import { Keys } from "@/constants";
  import { useAppForm, useOrganizations } from "@/hooks";
  import { CreateOrganizationDto, CreateRoleDto } from "@/types";
  import { RoleSchema } from "@/validators";
  import { useQueryClient } from "@tanstack/react-query";
  import { router } from "expo-router";
  import { useCallback } from "react";
  import { useTranslation } from "react-i18next";
  import { StyleSheet } from "react-native";
  
  export default function OrganizationFormScreen() {
    //
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { addOrganization } = useOrganizations();
  
    const { handleSubmit } = useAppForm({
      schema: RoleSchema(),
      defaultValues: {
        name: "",
        code: ""
      },
    });
  
    const proceedSave = useCallback(async (data: CreateOrganizationDto) => {
      await addOrganization.mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: [Keys.Queries.GET_ORGANIZATIONS] });
      router.back();
    }, []);
  
    return (
      <ThemedView style={styles.container}>
        <ThemedInput
          name="name"
          label={t("organizations.form.fields.name")}
          placeholder={t("organizations.form.fields.name_placeholder")}
        />
        <ThemedButton
          title={t("organizations.form.submit_btn")}
          onPress={handleSubmit(proceedSave)}
          isLoading={addOrganization.isPending}
          disabled={addOrganization.isPending}
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
  