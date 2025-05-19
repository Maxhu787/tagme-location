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
        right: 14,
        // top: Platform.OS === "ios" ? 40 : 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // padding: 32,
        gap: 20,
      }}
    >
      <AnimatedButton
        textColor="#000"
        style={styles.zoomButton}
        text="4x"
        onPress={() => {
          handleZoom(16);
        }}
      />
      <AnimatedButton
        textColor="#000"
        style={styles.zoomButton}
        text="3x"
        onPress={() => {
          handleZoom(12);
        }}
      />
      <AnimatedButton
        textColor="#000"
        style={styles.zoomButton}
        text="2x"
        onPress={() => {
          handleZoom(8);
        }}
      />
      <AnimatedButton
        textColor="#000"
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
    height: 50,
    width: 50,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 4,
  },
});
