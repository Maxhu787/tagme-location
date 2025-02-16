import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  MapView,
  Camera,
  UserLocation,
  Logger,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Location from "expo-location";
import { router } from "expo-router";

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
  const [hasPermission, setHasPermission] = useState(false);

  const scaleSignout = useSharedValue(1);
  const scaleProfile = useSharedValue(1);
  const scaleLocation = useSharedValue(1);

  const animatedStyleSignout = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSignout.value }],
  }));
  const animatedStyleProfile = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProfile.value }],
  }));
  const animatedStyleLocation = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLocation.value }],
  }));

  useEffect(() => {
    const requestPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (!hasPermission) return;

    const getCurrentLocation = async () => {
      let location_data = await Location.getCurrentPositionAsync({});
      setLocation(location_data);
    };

    const interval = setInterval(() => {
      getCurrentLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, [hasPermission]);

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24 }}>
          Permission to access location was denied
        </Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24 }}>Loading...</Text>
      </View>
    );
  }

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
        flexDirection: "column",
        flex: 1,
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          display: "flex",
          position: "absolute",
          zIndex: 2,
          top: 10,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 32,
          gap: 48,
        }}
      >
        <Animated.View style={animatedStyleSignout}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 100,
              borderRadius: 10,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              elevation: 15,
            }}
            activeOpacity={1}
            onPressIn={() =>
              (scaleSignout.value = withSpring(0.75, {
                stiffness: 300,
                damping: 15,
              }))
            }
            onPressOut={() =>
              (scaleSignout.value = withSpring(1, {
                stiffness: 150,
                damping: 10,
              }))
            }
            onPress={() => {
              router.push("/(app)/settings");
            }}
          >
            <Text>Settings</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={animatedStyleProfile}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 100,
              borderRadius: 10,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              elevation: 15,
            }}
            activeOpacity={1}
            onPressIn={() =>
              (scaleProfile.value = withSpring(0.75, {
                stiffness: 300,
                damping: 15,
              }))
            }
            onPressOut={() =>
              (scaleProfile.value = withSpring(1, {
                stiffness: 150,
                damping: 10,
              }))
            }
            onPress={() => {
              router.push("/(auth)/signout");
            }}
          >
            <Text>Signout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <MapView
        style={{ flex: 1 }}
        // mapStyle="https://tiles.openfreemap.org/styles/bright"
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        rotateEnabled={false}
        logoEnabled={true}
        attributionEnabled={false}
      >
        <Camera
          ref={cameraRef}
          centerCoordinate={
            location
              ? [location.coords.longitude, location.coords.latitude]
              : [0, 0]
          }
          zoomLevel={9}
          animationDuration={0}
        />
        <UserLocation />
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
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({});
