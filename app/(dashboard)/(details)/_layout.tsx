import { StackHeader } from "@/components";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function DetailsLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="violence"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("violences.details.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
      <Stack.Screen
        name="service"
        options={{
          headerShown: true,
          header: () => <StackHeader title={t("services.details.title")} />,
          presentation: "modal",
          animation:
            Platform.OS == "ios" ? "slide_from_bottom" : "slide_from_left",
        }}
      />
    </Stack>
  );
}
