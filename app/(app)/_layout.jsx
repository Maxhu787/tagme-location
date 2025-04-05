import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(profile)"
        options={{ headerShown: false, headerTitle: "Settings" }}
      />
      <Stack.Screen name="test" />
      <Stack.Screen name="maptest" />
    </Stack>
  );
};
