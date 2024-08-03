import { Stack } from "expo-router";

export default function DashBoardLayout() {
  //
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(navigation)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(forms)"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="(details)"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
}