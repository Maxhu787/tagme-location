import { PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";

const DisplayUsers = ({ setFollowing, fetchUsers, setFetchUsers }) => {
  const [friendsData, setFriendsData] = useState([]); // State to store friends' data
  const markerRefs = useRef({});
  const { user } = useContext(UserContext);

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
        .select("id, latitude, longitude")
        .in("id", allFriendIds);

      if (locationError) {
        console.error("Error fetching location data:", locationError);
        return;
      }

      // Map and combine the profile and location data
      const formattedData = profilesAndLocationData.map((profile) => {
        const location = locationData.find((loc) => loc.id === profile.id);
        return {
          id: profile.id,
          username: profile.username,
          coordinates: location
            ? [parseFloat(location.longitude), parseFloat(location.latitude)]
            : [0, 0],
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
          key={item.id}
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
});

export default DisplayUsers;
