import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(profile)" />
      <Stack.Screen name="bording" />
      <Stack.Screen name="maptest" />
    </Stack>
  );
};
