import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="settings" options={{ headerTitle: "Settings" }} />
      <Stack.Screen name="edit" options={{ headerTitle: "Edit Profile" }} />
      <Stack.Screen name="addfriend" options={{ headerTitle: "Add Friend" }} />
      <Stack.Screen
        name="notifications"
        options={{ headerTitle: "notifications" }}
      />
      <Stack.Screen name="trampoline" />
      <Stack.Screen name="[user]" options={{ headerShown: false }} />
    </Stack>
  );
};
