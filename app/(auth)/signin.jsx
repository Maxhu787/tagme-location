import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Auth from "../../components/Auth";

export default Signin = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
        }}
      >
        (Sign in)
      </Text>
      <Auth />
      <Pressable onPress={() => router.push("/settings")}>
        <Text
          style={{
            fontSize: 25,
            color: "rgb(56, 162, 254)",
          }}
        >
          settings test
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
    gap: 20,
  },
});
