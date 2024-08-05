import {
  ThemedInput,
  ThemedButton,
  ThemedFormView,
  ThemedFormPickerSelect,
  ThemedView,
} from "@/components";

import { Keys } from "@/constants";

import {
  useAppForm,
  useCities,
  useCountries,
  useRoleAccess,
  useUsers,
} from "@/hooks";

import { CreateUserDto } from "@/types";
import { AddUserSchema } from "@/validators";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export type UserFormProps = {
  isVictim?: boolean;
};

export function UserForm({ isVictim = false }) {
  //
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  //
  const { handleSubmit } = useAppForm({
    schema: AddUserSchema({ isVictim }),
    defaultValues: {
      id: "",
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "0",
      country: "",
      city: "",
      country_code: 0,
      is_su_admin: false,
      is_admin: isVictim ? false : true,
    },
  });

  const { addUser, addVictim } = useUsers();
  const { useGetRoles } = useRoleAccess();
  const getRoles = useGetRoles();

  const { useGetCountries } = useCountries();
  const getCountries = useGetCountries();
  const { cities } = useCities({ countryKeyName: "country" });

  const roles = useMemo(() => {
    return (
      getRoles.data?.data?.data.map((item) => {
        return {
          label: item.name,
          value: `${item.id}`,
        };
      }) ?? []
    );
  }, [getRoles.data]);

  const countries = useMemo(() => {
    return (
      getCountries.data?.data?.data?.map((item) => {
        return {
          label: item.name,
          value: `${item.name}`,
        };
      }) ?? []
    );
  }, [getCountries.data]);

  const proceedSave = useCallback(
    async (data: CreateUserDto) => {
      if (isVictim) {
        const result = await addVictim.mutateAsync(data);
        if (result.status) {
          queryClient.invalidateQueries({
            queryKey: [Keys.Queries.GET_VICTIMS],
          });
          router.back();
        }
      } else {
        const result = await addUser.mutateAsync(data);
        if (result.status) {
          queryClient.invalidateQueries({ queryKey: [Keys.Queries.GET_USERS] });
          router.back();
        }
      }
    },
    [isVictim]
  );

  return (
    <>
      <ThemedFormView style={[styles.container]}>
        <ThemedInput
          name="firstname"
          label={t("users.form.fields.firstname")}
          placeholder={t("users.form.fields.firstname")}
        />
        <ThemedInput
          name="lastname"
          label={t("users.form.fields.lastname")}
          placeholder={t("users.form.fields.lastname")}
        />
        <ThemedInput
          name="username"
          label={t("users.form.fields.username")}
          placeholder={t("users.form.fields.username")}
        />
        <ThemedInput
          name="phone"
          label={t("users.form.fields.phone")}
          placeholder={t("users.form.fields.phone")}
          keyboardType="phone-pad"
        />
        <ThemedInput
          name="email"
          label={t("users.form.fields.email")}
          placeholder={t("users.form.fields.email")}
        />

        {!isVictim && (
          <ThemedView style={styles.rowDivider}>
            <ThemedView style={styles.rowDividerItem}>
              <ThemedFormPickerSelect
                label={t("users.form.fields.type")}
                name="is_su_admin"
                items={[]}
              />
            </ThemedView>

            <ThemedView style={styles.rowDividerItem}>
              <ThemedFormPickerSelect
                label={t("users.form.fields.role")}
                name="role_id"
                items={roles}
              />
            </ThemedView>
          </ThemedView>
        )}

        <ThemedView style={styles.rowDivider}>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("users.form.fields.country")}
              name="country"
              items={countries}
            />
          </ThemedView>
          <ThemedView style={styles.rowDividerItem}>
            <ThemedFormPickerSelect
              label={t("users.form.fields.city")}
              name="city"
              items={cities}
            />
          </ThemedView>
        </ThemedView>

        <ThemedButton
          title={t("users.form.submit_btn")}
          onPress={handleSubmit(proceedSave)}
          isLoading={addUser.isPending}
          disabled={addUser.isPending}
        />
      </ThemedFormView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  rowDivider: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  rowDividerItem: {
    flex: 0.5,
  },
});
