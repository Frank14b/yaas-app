import { StackHeader } from "@/components/navigation/StackHeader";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

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
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="service"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("services.form.title")} />,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="country"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("countries.form.title")} />,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
