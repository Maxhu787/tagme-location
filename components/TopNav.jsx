import { View, StyleSheet, Platform, Image } from "react-native";
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
        paddingHorizontal: 32,
        paddingVertical: 32,
        gap: 24,
      }}
    >
      <AnimatedButton
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          elevation: 15,
        }}
        onPress={() => router.push("/profile/hukaixiang")}
      >
        <Image
          source={{ uri: "https://picsum.photos/240/240" }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          resizeMode="contain"
        />
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({});
