import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default TopNav = ({ location, cameraRef }) => {
  const scaleLocation = useSharedValue(1);

  const animatedStyleLocation = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLocation.value }],
  }));

  const moveToCurrentLocation = () => {
    if (location) {
      cameraRef.current?.moveTo(
        [location.coords.longitude, location.coords.latitude],
        2000
      );
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
      <Animated.View style={animatedStyleLocation}>
        <TouchableOpacity
          style={{
            width: 75,
            backgroundColor: "#fff",
            padding: 22,
            borderRadius: 18,
            shadowColor: "#000",
            elevation: 15,
          }}
          activeOpacity={1}
          onPressIn={() =>
            (scaleLocation.value = withSpring(0.75, {
              stiffness: 300,
              damping: 15,
            }))
          }
          onPressOut={() =>
            (scaleLocation.value = withSpring(1, {
              stiffness: 150,
              damping: 10,
            }))
          }
          onPress={moveToCurrentLocation}
        >
          <FontAwesome6 name="location-crosshairs" size={32} color="black" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});
