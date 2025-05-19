import { View, StyleSheet, Image } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/tagme.png")} style={styles.logo} />
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
  logo: {
    height: 120,
    width: 350,
    marginRight: 10,
  },
});
