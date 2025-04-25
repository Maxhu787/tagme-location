import { useMemo, useCallback, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { supabase } from "../utils/supabase";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import AnimatedButton from "./AnimatedButton";
import { router } from "expo-router";

const keyExtractor = (item) => item;

export default function FriendsBottomSheet({
  openBottomSheet,
  setOpenBottomSheet,
}) {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [locationData, setLocationData] = useState({});

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000); // in seconds

    const times = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (let t of times) {
      const interval = Math.floor(diff / t.seconds);
      if (interval >= 1) {
        return `${interval} ${t.unit}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  useEffect(() => {
    if (openBottomSheet) {
      sheetRef.current?.snapToIndex(0);
      setOpenBottomSheet(false);
    }
  }, [openBottomSheet]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Fetch sent friend requests
        const { data: sentData, error: sentError } = await supabase
          .from("friends")
          .select(
            `
          friend_id,
          profiles:friend_id(id, username, profile_picture)
        `
          )
          .eq("user_id", user.id)
          .eq("status", "accepted");

        if (sentError) throw sentError;

        // Fetch received friend requests
        const { data: receivedData, error: receivedError } = await supabase
          .from("friends")
          .select(
            `
          user_id,
          profiles:user_id(id, username, profile_picture)
        `
          )
          .eq("friend_id", user.id)
          .eq("status", "accepted");

        if (receivedError) throw receivedError;

        const sentProfiles = sentData.map((f) => f.profiles);
        const receivedProfiles = receivedData.map((f) => f.profiles);

        const allFriendIds = [...sentProfiles, ...receivedProfiles].map(
          (profile) => profile.id
        );

        // Fetch location data for all friends
        const { data: locationData, error: locationError } = await supabase
          .from("user_location")
          .select("id, timestamp")
          .in("id", allFriendIds);

        if (locationError) throw locationError;

        const locationMap = locationData.reduce((acc, loc) => {
          acc[loc.id] = loc.timestamp;
          return acc;
        }, {});

        setLocationData(locationMap);
        setFriends([...sentProfiles, ...receivedProfiles]);
      } catch (error) {
        console.error("Error fetching friends or location data:", error);
      }
    };

    fetchFriends();
  }, [user.id]);

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["40%", "80%"], []);

  const renderItem = useCallback(
    ({ item }) => (
      <AnimatedButton
        style={styles.row}
        key={item.id}
        buttonScale={0.9}
        onPress={() => {
          router.push({
            pathname: `/(app)/trampoline`,
            params: { user: item.id },
          });
        }}
      >
        <View style={styles.rowIcon}>
          <Image
            alt="profile picture"
            source={{ uri: item.profile_picture }}
            style={{ width: 42, height: 42, borderRadius: 9999 }}
          />
        </View>
        <Text style={styles.rowLabel}>{item.username}</Text>
        <View style={styles.rowSpacer} />
        <Text style={styles.timestamp}>
          {getTimeAgo(locationData[item.id])}
        </Text>
      </AnimatedButton>
    ),
    [locationData]
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        backgroundColor: "#ccc",
        // backgroundColor: "#fff",
        width: 60,
        height: 6,
        borderRadius: 3,
        marginTop: 8,
        // marginTop: 2,
        // marginBottom: 2,
      }}
      // backgroundStyle={{ backgroundColor: "#ddd" }}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      index={-1} // initially closed
    >
      <BottomSheetFlashList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        estimatedItemSize={50}
        backgroundColor={"#fff"}
        // paddingTop={12}
      />
      {/* <BottomSheetTextInput
        backgroundColor={"#aaa"}
        style={{
          borderRadius: 10,
          fontSize: 18,
          padding: 12,
          paddingLeft: 18,
          color: "#fff",
          marginHorizontal: 12,
          marginVertical: 8,
        }}
        placeholderTextColor={"#eee"}
        placeholder="Enter username"
      /> */}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 5,
    // paddingHorizontal: 12,
    paddingHorizontal: 18,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 9999,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
  },
  timestamp: {
    fontSize: 14,
    color: "#888",
    marginLeft: 8,
  },
});
