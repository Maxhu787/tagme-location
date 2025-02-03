import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
};
