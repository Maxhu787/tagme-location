import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";

export default Layout = () => {
  return (
    <UserProvider>
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
