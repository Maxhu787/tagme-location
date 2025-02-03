import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default Signin = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        login form
      </Text>
      <Link href="/(app)" asChild replace>
        <Pressable>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Login
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
