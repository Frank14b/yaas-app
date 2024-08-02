import { StackHeader } from "@/components/navigation/StackHeader";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function FormsLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="violence"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("violences.form.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
      <Stack.Screen
        name="service"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("services.form.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
      <Stack.Screen
        name="country"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("countries.form.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
      <Stack.Screen
        name="role"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("roles.form.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
      <Stack.Screen
        name="organization"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("organizations.form.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
      <Stack.Screen
        name="victim"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("victims.form.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
    </Stack>
  );
}
