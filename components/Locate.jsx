import { View, Platform } from "react-native";
import * as Location from "expo-location";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AnimatedButton from "./AnimatedButton";

export default TopNav = ({ setFollowing, cameraRef }) => {
  const moveToCurrentLocation = async () => {
    if (Platform.OS !== "ios") {
      setFollowing(true);
    } else {
      let location_data = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      if (location_data) {
        cameraRef.current?.moveTo([
          location_data.coords.longitude,
          location_data.coords.latitude,
        ]);
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
          elevation: 4,
        }}
        text="Settings"
        onPress={moveToCurrentLocation}
      >
        <FontAwesome6 name="location-crosshairs" size={32} color="#000" />
      </AnimatedButton>
    </View>
  );
};
