import { StackHeader } from "@/components/navigation/StackHeader";
import { Stack } from "expo-router";

export default function FormsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="violence"
        options={{
          headerShown: true,
          header: () => <StackHeader title="New Violence" />,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="service"
        options={{
          headerShown: true,
          header: () => <StackHeader title="New Service" />,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
