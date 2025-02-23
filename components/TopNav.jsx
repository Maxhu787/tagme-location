import { View, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";
import AnimatedButton from "./AnimatedButton";

export default TopNav = () => {
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 2,
        top: Platform.OS === "ios" ? 40 : 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 32,
        gap: 48,
      }}
    >
      <AnimatedButton
        style={{
          height: 50,
          width: 100,
          borderRadius: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          elevation: 15,
        }}
        text="Settings"
        onPress={() => {
          router.push("/(app)/settings");
        }}
      />
      <AnimatedButton
        style={{
          height: 50,
          width: 100,
          borderRadius: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          elevation: 15,
        }}
        text="Signout"
        onPress={() => {
          router.push("/(auth)/signout");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
