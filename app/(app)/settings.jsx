import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

export default Settings = () => {
  const insets = useSafeAreaInsets();
  // setup settings page stack and list
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,

        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
        }}
      >
        (Settings page)
      </Text>
      <Pressable onPress={() => router.push("/profile/username")}>
        <Text
          style={{
            fontSize: 25,
            color: "rgb(56, 162, 254)",
          }}
        >
          profile test (username)
        </Text>
      </Pressable>
    </View>
  );
};
