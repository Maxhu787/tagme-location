import React from "react";
import Home from "./Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./components/Auth";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <Home /> */}
        <Text>Sign in with Google:</Text>
        <Auth />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
