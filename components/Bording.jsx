import { View, Text, StyleSheet, Image } from "react-native";
import Auth from "../components/Auth";

export default Signin = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/tagme.png")} style={styles.logo} />
      <View style={styles.auth}>
        <Auth />
      </View>
      <View style={styles.imageRow}>
        <Image source={require("../assets/1.png")} style={styles.icon} />
        <Image source={require("../assets/2.png")} style={styles.icon} />
        <Image source={require("../assets/3.png")} style={styles.icon} />
        <Image source={require("../assets/4.png")} style={styles.icon} />
        <Image source={require("../assets/5.png")} style={styles.icon} />
      </View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          color: "#000",
          position: "absolute",
          bottom: 15,
          fontSize: 18,
          letterSpacing: 1.1,
        }}
      >
        v2025-4-9 00:56
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageRow: {
    position: "absolute",
    bottom: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },
  icon: {
    height: 50,
    width: 50,
    marginHorizontal: 5,
  },
  logo: {
    // backgroundColor: "red",
    height: 125,
    width: 370,
    marginLeft: -12,
  },
  auth: {},
});
