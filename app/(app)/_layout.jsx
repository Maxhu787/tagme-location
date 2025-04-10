import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(profile)" />
      <Stack.Screen name="bording" options={{ headerShown: false }} />
      <Stack.Screen name="test" options={{ headerShown: true }} />
      <Stack.Screen name="maptest" />
    </Stack>
  );
};
