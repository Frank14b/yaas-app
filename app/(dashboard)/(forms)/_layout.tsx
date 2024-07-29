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
        }}
      />
    </Stack>
  );
}
