import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import {
  MapView,
  Camera,
  Logger,
  ShapeSource,
  CircleLayer,
  UserLocation,
  UserLocationRenderMode,
} from "@maplibre/maplibre-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import TopNav from "../../components/TopNav";
import Locate from "../../components/Locate";

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
      let location_data = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        // maximumAge: 1000,
      });
      setLocation(location_data);
    };
    getCurrentLocation();
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 1000);

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

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : insets.top,
        // paddingBottom: insets.bottom,
      }}
    >
      <TopNav />
      <MapView
        style={{ flex: 1 }}
        // mapStyle="https://tiles.openfreemap.org/styles/bright"
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        rotateEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Camera
          ref={cameraRef}
          // centerCoordinate={
          //   location
          //     ? [location.coords.longitude, location.coords.latitude]
          //     : [0, 0]
          // }
          // zoomLevel={16}
          // animationDuration={0}
          // ios
          animationDuration={2000}
          followUserLocation={true}
          followZoomLevel={16}
        />
        {/* <ShapeSource
          id="myShapeSource"
          shape={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    location.coords.longitude,
                    location.coords.latitude,
                  ],
                },
                properties: {
                  title: "Current Location",
                },
              },
            ],
          }}
        >
          <CircleLayer
            id="circleLayer"
            style={{
              circleRadius: 9,
              circleColor: "blue",
              circleOpacity: 0.8,
              circleStrokeWidth: 5,
              circleStrokeColor: "#000",
            }}
          />
        </ShapeSource> */}
        <UserLocation
          androidRenderMode={"compass"}
          renderMode={UserLocationRenderMode.Native}
          showsUserHeadingIndicator={true}
          visible={true}
          requestsAlwaysUse={true}
          minDisplacement={1}
          animated={true}
        />
        {/* <PointAnnotation
          coordinate={[location.coords.longitude, location.coords.latitude]}
          selected={false}
          draggable={false}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              backgroundColor: "#ffa500",
              borderWidth: 4,
              borderColor: "#000",
            }}
          />
        </PointAnnotation> */}
      </MapView>
      <Locate cameraRef={cameraRef} location={location} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({});
