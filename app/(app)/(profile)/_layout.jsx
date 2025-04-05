import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerTitle: "Settings" }} />
      <Stack.Screen name="edit" options={{ headerTitle: "Edit Profile" }} />
      <Stack.Screen name="addfriend" options={{ headerTitle: "Add Friend" }} />
      <Stack.Screen name="trampoline" />
    </Stack>
  );
};
