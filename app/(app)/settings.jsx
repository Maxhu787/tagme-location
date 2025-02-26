import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import AnimatedButton from "../../components/AnimatedButton";

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
      <Stack.Screen
        options={{
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerShadowVisible: false,
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
          elevation: 5,
        }}
        text="Signout"
        onPress={() => {
          router.push("/(auth)/signout");
        }}
      />
    </View>
  );
};
