import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import Auth from "../components/Auth";

export default Signin = () => {
  const attemptLogin = () => {
    router.dismissAll();
    router.replace("/(app)");
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        login form
      </Text>
      <Auth />
      <Pressable onPress={attemptLogin}>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Login
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
