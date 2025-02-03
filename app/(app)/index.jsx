import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { MapView, Camera, Logger } from "@maplibre/maplibre-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Location from "expo-location";

Logger.setLogCallback((log) => {
  const { message } = log;
  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed") ||
    message.match(
      "Request failed due to a permanent error: stream was reset: CANCEL"
    )
  ) {
    return true;
  }
  return false;
});

export default Home = () => {
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    const setDefault = () => {
      cameraRef.current?.fitBounds(
        [120.85647759578082, 25.307686891669203],
        [120.80154595772647, 21.895556655975508],
        [60, 80, 40, 20],
        1000
      );
    };
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location_data = await Location.getCurrentPositionAsync({});
      setLocation(location_data);
      setDefault();
    }
    getCurrentLocation();
  }, []);

  // maybe call moveToCurrentLocation(location) and pass in location state
  // more reusable
  const moveToCurrentLocation = () => {
    if (location) {
      cameraRef.current?.setCamera({
        centerCoordinate: [location.coords.longitude, location.coords.latitude],
        // centerCoordinate: [120.49113661544325, 22.773879696935218],
        zoomLevel: 15,
        animationDuration: 2000,
      });
      // cameraRef.current?.flyTo([120.49113661544325, 22.773879696935218], 2000);
      // cameraRef.current?.setCamera({
      //   centerCoordinate: [120.49113661544325, 22.773879696935218],
      //   zoomLevel: 12,
      //   animationDuration: 2000,
      // });
      // cameraRef.current?.zoomTo(12, 2000);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <MapView
        style={{ flex: 1 }}
        // mapStyle="https://tiles.openfreemap.org/styles/bright"
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        rotateEnabled={false}
        logoEnabled={true}
      >
        <Camera ref={cameraRef} />
      </MapView>
      <View
        style={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 32,
        }}
      >
        <Animated.View
          style={[
            {
              width: 75,
              backgroundColor: "#fff",
              padding: 22,
              borderRadius: 18,
              shadowColor: "#000",
              elevation: 15,
            },
            animatedStyle,
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() =>
              (scale.value = withSpring(0.75, {
                stiffness: 300,
                damping: 15,
              }))
            }
            onPressOut={() =>
              (scale.value = withSpring(1, { stiffness: 150, damping: 10 }))
            }
            onPress={moveToCurrentLocation}
          >
            <FontAwesome6 name="location-crosshairs" size={32} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({});
