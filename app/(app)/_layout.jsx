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
        name="settings"
        options={{ headerShown: true, headerTitle: "Settings" }}
      />
      <Stack.Screen name="edit" />
      <Stack.Screen name="test" />
      <Stack.Screen name="maptest" />
    </Stack>
  );
};
