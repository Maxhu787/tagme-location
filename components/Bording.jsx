import { View, Text, StyleSheet, Image } from "react-native";
import Auth from "../components/Auth";

export default Signin = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/tagme.png")} style={styles.logo} />
      {/* <Image
        source={{ uri: "https://picsum.photos/id/667/1920/1080" }}
        style={{
          width: "100%",
          // height: 540,
          height: 300,
          // borderBottomLeftRadius: 20,
          // borderBottomRightRadius: 20,
          marginTop: -20,
        }}
      /> */}
      <View style={styles.auth}>
        <Auth />
      </View>
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
  logo: {
    backgroundColor: "red",
    height: 150,
    width: 370,
    marginLeft: -12,
  },
  auth: {
    // position: "absolute",
    // bottom: 25,
  },
});
