import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default Layout = () => {
  return (
    <UserProvider>
      <ProfileProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(app)" />
            <Stack.Screen name="(auth)/signout" />
          </Stack>
        </ThemeProvider>
      </ProfileProvider>
    </UserProvider>
  );
};
