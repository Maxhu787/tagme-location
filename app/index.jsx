import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function Bording() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        bording view blah blah blah
      </Text>
      <Link href="/signin" asChild>
        <Pressable>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            signin
          </Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
