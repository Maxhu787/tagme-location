import { View, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import AnimatedButton from "../../../components/AnimatedButton";

export default User = () => {
  const local = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Stack.Screen
        options={{
          title: `${local.user}`,
        }}
      />
      <Text
        style={{
          fontSize: 30,
        }}
      >
        (Profile page)
      </Text>
      <Text
        style={{
          fontSize: 25,
        }}
      >
        username: {local.user}
      </Text>
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
    </View>
  );
};
