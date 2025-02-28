import { View, StyleSheet, Platform, Image } from "react-native";
import { router } from "expo-router";
import AnimatedButton from "./AnimatedButton";

export default TopNav = () => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 2,
        top: Platform.OS === "ios" ? 65 : 35,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <AnimatedButton
        style={{
          height: 64,
          width: 64,
          borderRadius: 50,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => router.push("/profile/usr_name")}
      >
        <Image
          // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
          source={require("../assets/icon.png")}
          style={{ width: 52, height: 52, borderRadius: 100 }}
          resizeMode="contain"
        />
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({});
