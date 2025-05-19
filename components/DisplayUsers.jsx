import { PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";

const DisplayUsers = ({ setFollowing, fetchUsers, setFetchUsers }) => {
  const [friendsData, setFriendsData] = useState([]); // State to store friends' data
  const markerRefs = useRef({});
  const { user } = useContext(UserContext);

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
    const fetchFriends = async () => {
      // First query to get all friend_ids where user_id is the current user's ID
      const { data: friendIdsData, error: friendIdsError } = await supabase
        .from("friends")
        .select("friend_id")
        .eq("user_id", user.id)
        .eq("status", "accepted");

      if (friendIdsError) {
        console.error("Error fetching friend IDs (user_id):", friendIdsError);
        return;
      }

      // Second query to get all user_ids where friend_id is the current user's ID
      const { data: userIdsData, error: userIdsError } = await supabase
        .from("friends")
        .select("user_id")
        .eq("friend_id", user.id)
        .eq("status", "accepted");

      if (userIdsError) {
        console.error("Error fetching user IDs (friend_id):", userIdsError);
        return;
      }

      // Combine both friendIds and userIds to get all relevant friends' user_ids
      const allFriendIds = [
        ...friendIdsData.map((friend) => friend.friend_id),
        ...userIdsData.map((friend) => friend.user_id),
      ];

      // Fetch profiles and location data for all friend_ids
      const { data: profilesAndLocationData, error: profilesAndLocationError } =
        await supabase
          .from("profiles")
          .select("id, username, profile_picture")
          .in("id", allFriendIds);

      if (profilesAndLocationError) {
        console.error(
          "Error fetching profiles and location data:",
          profilesAndLocationError
        );
        return;
      }

      // Fetch the location data for all the friends
      const { data: locationData, error: locationError } = await supabase
        .from("user_location")
        .select("id, latitude, longitude, timestamp")
        .in("id", allFriendIds);

      if (locationError) {
        console.error("Error fetching location data:", locationError);
        return;
      }

      // Map and combine the profile and location data
      // const offset = 0.005; // Change this value to adjust the random offset range
      const offset = 0.002; // Change this value to adjust the random offset range
      const formattedData = profilesAndLocationData.map((profile) => {
        const location = locationData.find((loc) => loc.id === profile.id);
        const randomOffsetLat = (Math.random() - 0.5) * offset;
        const randomOffsetLon = (Math.random() - 0.5) * offset;
        return {
          id: profile.id,
          username: profile.username,
          coordinates: location
            ? [
                parseFloat(location.longitude) + randomOffsetLon,
                parseFloat(location.latitude) + randomOffsetLat,
              ]
            : [0, 0],
          timestamp: location.timestamp,
          profile_picture: profile.profile_picture,
        };
      });
      setFriendsData(formattedData);
    };

    if (fetchUsers) {
      setFollowing(false);
      fetchFriends();
      setFollowing(true);
      setFetchUsers(false);
    }
  }, [fetchUsers]);

  return (
    <>
      {friendsData.map((item) => (
        <PointAnnotation
          key={`${item.id}-image`}
          ref={(ref) => (markerRefs.current[item.id] = ref)}
          coordinate={item.coordinates}
          onSelected={() => {
            router.push({
              pathname: `/(app)/trampoline`,
              params: { user: item.id },
            });
          }}
          onDeselected={() => {
            router.push({
              pathname: `/(app)/trampoline`,
              params: { user: item.id },
            });
          }}
        >
          <View style={styles.markerContainer}>
            <Image
              source={{ uri: item.profile_picture }}
              style={styles.image}
              onLoad={() => markerRefs.current?.[item.id]?.refresh()}
              fadeDuration={0}
            />
            {/* <View style={styles.timestampContainer}>
            <Text
              onLayout={() => markerRefs.current?.[item.id]?.refresh()}
              style={styles.timestamp}
            >
              {getTimeAgo(item.timestamp)}
            </Text>
            </View> */}
          </View>
        </PointAnnotation>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerContainer: {
    height: 58,
    width: 58,
  },
  image: {
    height: 58,
    width: 58,
    borderRadius: 1000,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#fff",
  },
  timestampContainer: {
    alignItems: "center",
  },
  timestamp: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
});

export default DisplayUsers;
