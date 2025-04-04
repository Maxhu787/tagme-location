import { useContext, useEffect, useRef, useState } from "react";
import { View, Platform, Text, registerCallableModule } from "react-native";
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
import SideBar from "../../components/SideBar";
import * as Location from "expo-location";
import { UserContext } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import AnimatedButton from "../../components/AnimatedButton";

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
  const [following, setFollowing] = useState(true); // android
  const [followZoom, setFollowZoom] = useState(16); // ios
  const { user } = useContext(UserContext);
  const [fetchUsers, setFetchUsers] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      getCurrentLocation();
    };

    const getCurrentLocation = async () => {
      try {
        let location_data = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const insertLocationData = async (userId) => {
          const { data, error } = await supabase.from("user_location").upsert(
            [
              {
                id: userId,
                latitude: location_data.coords.latitude,
                longitude: location_data.coords.longitude,
                battery: 80,
                timestamp: new Date().toISOString(),
              },
            ],
            { onConflict: ["id"] }
          );

          if (error) {
            console.log("Error inserting location data:", error);
            // } else {
            // console.log("Location data inserted/updated:", data);
          }
        };
        insertLocationData(user.id);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    requestPermissions();
    const interval = setInterval(getCurrentLocation, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : insets.top,
      }}
    >
      <Text>{fetchUsers ? "true" : "false"}</Text>
      <MapView
        // onRegionDidChange={(event) => {
        //   if (following && event.properties.isUserInteraction) {
        //     setFollowing(false);
        //   }
        // }}
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
          // onUserTrackingModeChange={(event) => {
          //   if (!event.nativeEvent.payload.followUserLocation) {
          //     setFollowing(false);
          //   }
          // }}
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
        <DisplayUsers fetchUsers={fetchUsers} setFetchUsers={setFetchUsers} />
      </MapView>
      <AnimatedButton
        style={{
          width: 100,
          backgroundColor: "#fff",
          padding: 22,
          borderRadius: 18,
          shadowColor: "#000",
          bottom: 30,
          left: 30,
          elevation: 2,
        }}
        buttonScale={0.9}
        text="refresh"
        onPress={() => {
          setFetchUsers(true);
        }}
      />
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
