import { Stack, Redirect } from "expo-router";
import { useState, useEffect } from "react";
// import { getAuthState } from "../auth";

export default function Layout() {
  // const [isAuthenticated, setIsAuthenticated] = useState(null);

  // useEffect(() => {
  // getAuthState().then(setIsAuthenticated);
  // }, []);

  // if (isAuthenticated === null) return null;
  // if (!isAuthenticated) return <Redirect href="/signin" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
