import { View, StyleSheet, Platform } from "react-native";
import AnimatedButton from "./AnimatedButton";

export default SideBar = ({
  setFollowZoom,
  following,
  setFollowing,
  cameraRef,
}) => {
  const delay = 2000;
  const handleZoom = (n) => {
    setFollowZoom(n);
  };

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 2,
        top: "40%",
        right: 20,
        // top: Platform.OS === "ios" ? 40 : 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // padding: 32,
        gap: 24,
      }}
    >
      <AnimatedButton
        textColor="#ffa500"
        style={styles.zoomButton}
        text="4x"
        onPress={() => {
          handleZoom(16);
        }}
      />
      <AnimatedButton
        textColor="#ffa500"
        style={styles.zoomButton}
        text="3x"
        onPress={() => {
          handleZoom(12);
        }}
      />
      <AnimatedButton
        textColor="#ffa500"
        style={styles.zoomButton}
        text="2x"
        onPress={() => {
          handleZoom(8);
        }}
      />
      <AnimatedButton
        textColor="#ffa500"
        style={styles.zoomButton}
        text="1x"
        onPress={() => {
          handleZoom(2);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  zoomButton: {
    height: 45,
    width: 45,
    color: "#ffa500",
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 15,
  },
});
