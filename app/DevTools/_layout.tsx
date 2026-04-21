import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "DevTools" }} />
    </Stack>
  );
}
