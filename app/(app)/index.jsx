import { useEffect, useRef, useState } from "react";
import { View, Platform } from "react-native";
import {
  MapView,
  Camera,
  Logger,
  UserLocation,
  UserLocationRenderMode,
} from "@maplibre/maplibre-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNav from "../../components/TopNav";
import Locate from "../../components/Locate";
import DisplayUsers from "../../components/DisplayUsers";
// import Loading from "../../components/Loading";
// import SideBar from "../../components/SideBar";

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
  const [following, setFollowing] = useState(true);
  const [followZoom, setFollowZoom] = useState(16);

  // useEffect(() => {
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
  // }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : insets.top,
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
          followZoomLevel={followZoom}
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
        <DisplayUsers />
      </MapView>
      <TopNav />
      {/* <SideBar
        following={following}
        setFollowing={setFollowing}
        setFollowZoom={setFollowZoom}
        cameraRef={cameraRef}
      /> */}
      <Locate setFollowing={setFollowing} cameraRef={cameraRef} />
    </View>
  );
};
