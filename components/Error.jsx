import { View, StyleSheet, Text } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text>An error occurred</Text>
      <Text>Please try again later</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
