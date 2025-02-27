import { View, Text, TouchableOpacity, Image } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import AnimatedButton from "../../../components/AnimatedButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}
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
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerShadowVisible: false,
          headerRight: () => (
            <AnimatedButton
              style={{
                height: 40,
                width: 40,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
              }}
              text="Settings"
              onPress={() => {
                router.push("/(app)/settings");
              }}
            >
              <FontAwesome6 name="gear" size={24} color="black" />
            </AnimatedButton>
          ),
        }}
      />
      <Text
        style={{
          fontSize: 25,
          flex: 1,
        }}
      >
        {local.user}
      </Text>
    </View>
  );
};
