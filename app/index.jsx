import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default Bording = () => {
  // add bording scroll view
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
        }}
      >
        (Bording view)
      </Text>
      <Link href="/signin" asChild>
        <Pressable>
          <Text
            style={{
              fontSize: 25,
              color: "rgb(56, 162, 254)",
            }}
          >
            signin
          </Text>
        </Pressable>
      </Link>
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
