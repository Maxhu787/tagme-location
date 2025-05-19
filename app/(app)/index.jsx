import { useContext, useEffect, useRef, useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MapView,
  Camera,
  UserLocation,
  UserLocationRenderMode,
} from "@maplibre/maplibre-react-native";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { UserContext } from "../../contexts/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNav from "../../components/TopNav";
import Locate from "../../components/Locate";
import DisplayUsers from "../../components/DisplayUsers";
// import SideBar from "../../components/SideBar";
import AnimatedButton from "../../components/AnimatedButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { supabase } from "../../utils/supabase";
import { registerPushToken } from "../../utils/registerPushToken";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FriendsBottomSheet from "../../components/FriendsBottomSheet";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default Home = () => {
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [following, setFollowing] = useState(true); // android
  const [followZoom, setFollowZoom] = useState(16); // ios
  const { user } = useContext(UserContext);
  const [fetchUsers, setFetchUsers] = useState(true);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [tracking, setTracking] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
    };
    requestPermissions();

    registerPushToken(user.id)
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));

    const insertToken = async () => {
      const { data, error } = await supabase.from("expo_tokens").upsert(
        [
          {
            id: user.id,
            token: expoPushToken,
            timestamp: new Date().toISOString(),
          },
        ],
        { onConflict: ["id"] }
      );

      if (error) {
        console.log("Error inserting location data:", error);
        // } else {
        //   console.log("Location data inserted/updated:", data);
      }
    };
    insertToken();
  }, []);
  const getCurrentLocation = async () => {
    try {
      const insertLocationData = async (userId) => {
        let location_data = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const { data, error } = await supabase.from("user_location").upsert(
          [
            {
              id: userId,
              latitude: location_data.coords.latitude,
              longitude: location_data.coords.longitude,
              battery: 100,
              timestamp: new Date().toISOString(),
            },
          ],
          { onConflict: ["id"] }
        );

        if (error) {
          console.log("Error inserting location data:", error);
          // } else {
          //   console.log("Location data inserted/updated:", data);
        }
      };
      insertLocationData(user.id);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    let interval;

    if (tracking) {
      getCurrentLocation();
      interval = setInterval(getCurrentLocation, 1000 * 10); // insert every 10 seconds
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [tracking]);

  const LOCATION_TASK_NAME = "background-location-task";

  TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
    try {
      await getCurrentLocation();
      return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
      console.error("Error in background task:", error);
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  });

  const registerBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
        minimumInterval: 10, // Run every 10 seconds
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log("Background task registered");
    } catch (error) {
      console.error("Error registering background task:", error);
    }
  };

  useEffect(() => {
    registerBackgroundTask();
  }, []);

  useEffect(() => {
    const loadTrackingState = async () => {
      const savedTrackingState = await AsyncStorage.getItem("trackingState");
      if (savedTrackingState !== null) {
        setTracking(JSON.parse(savedTrackingState));
      }
    };
    loadTrackingState();
  }, []);

  const toggleTracking = async () => {
    const newTrackingState = !tracking;
    setTracking(newTrackingState);
    await AsyncStorage.setItem(
      "trackingState",
      JSON.stringify(newTrackingState)
    );
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : insets.top,
        }}
      >
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
          <DisplayUsers
            setFollowing={setFollowing}
            setFetchUsers={setFetchUsers}
            fetchUsers={fetchUsers}
          />
        </MapView>
        <TopNav />
        <View style={[{ right: 115 }, styles.bottomButtonContainer]}>
          <AnimatedButton
            style={[
              styles.bottomButtonStyle,
              { backgroundColor: "#fff", paddingVertical: 26 },
            ]}
            onPress={() => setOpenBottomSheet(true)}
          >
            <FontAwesome5 name="users" size={24} color="#000" />
          </AnimatedButton>
          {/* <AnimatedButton
            style={[styles.bottomButtonStyle, { backgroundColor: "#fff" }]}
            onPress={() => setFetchUsers(true)}
          >
            <FontAwesome name="refresh" size={32} color="#000" />
          </AnimatedButton> */}
        </View>
        <Locate setFollowing={setFollowing} cameraRef={cameraRef} />
        <View style={[{ left: 115 }, styles.bottomButtonContainer]}>
          <AnimatedButton
            style={[
              { backgroundColor: tracking ? "#fff" : "#000" },
              styles.bottomButtonStyle,
            ]}
            onPress={toggleTracking}
          >
            {tracking ? (
              <MaterialIcons name="location-on" size={32} color="#000" />
            ) : (
              <MaterialIcons name="location-off" size={32} color="#fff" />
            )}
          </AnimatedButton>
        </View>

        <FriendsBottomSheet
          openBottomSheet={openBottomSheet}
          setOpenBottomSheet={setOpenBottomSheet}
        />
        {/* <SideBar
        following={following}
        setFollowing={setFollowing}
        setFollowZoom={setFollowZoom}
        cameraRef={cameraRef}
      /> */}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: Platform.OS === "ios" ? 42 : 32,
  },
  bottomButtonStyle: {
    width: 75,
    padding: 22,
    paddingLeft: 23,
    borderRadius: 18,
    shadowColor: "#000",
    elevation: 4,
  },
});
