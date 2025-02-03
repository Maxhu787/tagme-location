import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default User = () => {
  const local = useLocalSearchParams();
  // add username to header title
  return (
    <View
      style={{
        flex: 1,
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
        (Profile page)
      </Text>
      <Text
        style={{
          fontSize: 25,
        }}
      >
        username: {local.user}
      </Text>
    </View>
  );
};
