import { Tabs, Redirect } from "expo-router";
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
    <Tabs
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
