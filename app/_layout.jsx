import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { StatusBar } from "expo-status-bar";
export default Layout = () => {
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)/signin" />
        <Stack.Screen name="(auth)/signout" />
      </Stack>
    </UserProvider>
  );
};
