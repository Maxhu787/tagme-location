import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Logger } from "@maplibre/maplibre-react-native";

Logger.setLogCallback((log) => {
  const { message } = log;
  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed") ||
    message.match(
      "Request failed due to a permanent error: stream was reset: CANCEL"
    )
  ) {
    return true;
  }
  return false;
});

export default Layout = () => {
  return (
    <UserProvider>
      <ProfileProvider>
        <ThemeProvider>
          {/* <StatusBar style="light" backgroundColor="#ffa500" /> */}
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)" />
            <Stack.Screen name="(auth)/signout" />
          </Stack>
        </ThemeProvider>
      </ProfileProvider>
    </UserProvider>
  );
};
