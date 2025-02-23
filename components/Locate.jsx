import { View, StyleSheet, Platform } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AnimatedButton from "./AnimatedButton";

export default TopNav = ({ following, setFollowing, location, cameraRef }) => {
  const moveToCurrentLocation = () => {
    if (Platform.OS === "ios") {
      if (location) {
        cameraRef.current?.moveTo(
          [location.coords.longitude, location.coords.latitude],
          2000
        );
      }
    } else {
      if (following) {
        setFollowing(false);
      } else {
        setFollowing(true);
      }
    }
  };
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        bottom: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: Platform.OS === "ios" ? 42 : 32,
      }}
    >
      <AnimatedButton
        style={{
          width: 75,
          backgroundColor: "#fff",
          padding: 22,
          borderRadius: 18,
          shadowColor: "#000",
          elevation: 15,
        }}
        text="Settings"
        onPress={moveToCurrentLocation}
      >
        <FontAwesome6 name="location-crosshairs" size={32} color="black" />
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({});
