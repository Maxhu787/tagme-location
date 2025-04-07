import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
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
      <Auth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
});
