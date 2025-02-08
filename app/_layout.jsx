import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(auth)/signin" />
      <Stack.Screen name="(auth)/signout" />
    </Stack>
  );
};
