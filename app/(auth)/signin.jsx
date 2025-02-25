import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import Auth from "../../components/Auth";
import { router } from "expo-router";

export default Signin = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        Sign in
      </Text>
      {Platform.OS === "ios" ? (
        <Pressable
          onPress={() => {
            router.dismissAll();
            router.replace("/(app)");
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "rgb(56, 162, 254)",
            }}
          >
            login test
          </Text>
        </Pressable>
      ) : (
        <Auth />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
  },
});
