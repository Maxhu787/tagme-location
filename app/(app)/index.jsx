import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Platform, Dimensions } from "react-native";
import {
  MapView,
  Camera,
  Logger,
  ShapeSource,
  CircleLayer,
  SymbolLayer,
  UserLocation,
  PointAnnotation,
  UserLocationRenderMode,
} from "@maplibre/maplibre-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import TopNav from "../../components/TopNav";
import Locate from "../../components/Locate";
import Loading from "../../components/Loading";
import SideBar from "../../components/SideBar";

const { height } = Dimensions.get("window");

Logger.setLogCallback((log) => {
  const { message } = log;
  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed") ||
    message.match(
      "Request failed due to a permanent error: stream was reset: CANCEL"
    ) ||
    message.match("MapLibre warning eglSwapBuffer error: 12301.")
  ) {
    return true;
  }
  return false;
});

export default Home = () => {
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [following, setFollowing] = useState(true);
  const [followZoom, setFollowZoom] = useState(16);

  useEffect(() => {
    // const getCurrentLocation = async () => {
    //   let location_data = await Location.getCurrentPositionAsync({
    //     accuracy: Location.Accuracy.Highest,
    //   });
    // };
    // getCurrentLocation();
    // const interval = setInterval(() => {
    //   getCurrentLocation();
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // paddingTop: Platform.OS === "ios" ? 0 : insets.top,
        // paddingBottom: insets.bottom,
      }}
    >
      <MapView
        style={{ flex: 1 }}
        // mapStyle="https://tiles.openfreemap.org/styles/bright"
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        rotateEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        onTouchStart={() => {
          if (Platform.OS !== "ios") {
            setFollowing(false);
          }
        }}
      >
        <Camera
          ref={cameraRef}
          followUserLocation={true}
          followZoomLevel={16}
        />
        <UserLocation
          androidRenderMode={"compass"}
          renderMode={UserLocationRenderMode.Native}
          showsUserHeadingIndicator={true}
          visible={true}
          requestsAlwaysUse={true}
          minDisplacement={1}
          animated={true}
        />
      </MapView>
      <TopNav />
      <SideBar
        setFollowZoom={setFollowZoom}
        following={following}
        setFollowing={setFollowing}
        cameraRef={cameraRef}
      />
      <Locate setFollowing={setFollowing} cameraRef={cameraRef} />
    </View>
  );
};

const styles = StyleSheet.create({});
