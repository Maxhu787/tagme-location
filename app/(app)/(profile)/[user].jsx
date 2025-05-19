import React, { useContext, useEffect, useState, useCallback } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AnimatedButton from "../../../components/AnimatedButton";
import AddFriendButton from "../../../components/AddFriendButton";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";

export default function Profile() {
  const [fetchData, setFetchData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const local = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [buttonRefresh, setButtonRefresh] = useState(true);

  const fetchDataCallback = useCallback(async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", local.user)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          setFetchData(false); // No profile found
        }
        console.log("Error checking profile:", error);
        setFetchData(false); // Unexpected error
      } else {
        setFetchData(data);
      }

      // Fetch friends
      const { data: sentData, error: sentError } = await supabase
        .from("friends")
        .select(
          `
        friend_id,
        profiles:friend_id(id, username, profile_picture)
      `
        )
        .eq("user_id", local.user)
        .eq("status", "accepted");

      if (sentError) throw sentError;

      const { data: receivedData, error: receivedError } = await supabase
        .from("friends")
        .select(
          `
        user_id,
        profiles:user_id(id, username, profile_picture)
      `
        )
        .eq("friend_id", local.user)
        .eq("status", "accepted");

      if (receivedError) throw receivedError;

      const sentProfiles = sentData.map((f) => f.profiles);
      const receivedProfiles = receivedData.map((f) => f.profiles);

      setFriends([...sentProfiles, ...receivedProfiles]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [local.user]);
  const fetchFriendshipStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("friends")
        .select("status")
        .or(
          `and(user_id.eq.${user.id},friend_id.eq.${local.user}),and(user_id.eq.${local.user},friend_id.eq.${user.id})`
        )
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching friendship status:", error);
      } else {
        setFriendshipStatus(data?.status || null);
      }
    } catch (error) {
      console.error("Error in fetchFriendshipStatus:", error);
    }
  }, [local.user, user.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchDataCallback(), fetchFriendshipStatus()]);
    setButtonRefresh(true);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDataCallback();
    fetchFriendshipStatus();
  }, [fetchDataCallback, fetchFriendshipStatus]);

  useEffect(() => {
    setButtonRefresh(true);
  }, []);

  const countryCodeToFlagEmoji = (code) => {
    if (!code) return "null";
    return code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  };

  if (fetchData === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Oops!",
          }}
        />
        <Text style={{ fontSize: 30 }}>Oops!</Text>
        <Text
          style={{
            fontSize: 23,
            color: "#666",
            textAlign: "center",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          This profile doesn't exist or couldn't be loaded.
        </Text>
      </View>
    );
  } else if (fetchData === null) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      </>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Stack.Screen
          options={{
            title: fetchData ? `${fetchData.username}` : "Profile",
            headerShown: true,
            headerShadowVisible: true,
            headerRight: () => (
              <AnimatedButton
                style={{}}
                text="Settings"
                onPressIn={() => {
                  router.push("/(app)/(profile)/settings");
                }}
              >
                <View
                  style={{
                    height: 55,
                    width: 40,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome6 name="gear" size={24} color="black" />
                </View>
              </AnimatedButton>
            ),
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.profile}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt="profile picture"
                source={{ uri: fetchData.profile_picture }}
                style={styles.profileAvatar}
              />
            </View>
            <View style={styles.profileText}>
              <Text style={styles.profileUserName}>{fetchData.username}</Text>
              <Text style={styles.profileName}>
                {fetchData.name} | {countryCodeToFlagEmoji(fetchData.country)}
              </Text>
              <Text style={[styles.profileBio, { marginTop: 4 }]}>
                {fetchData.bio}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => Linking.openURL(fetchData.website)}
              >
                <Text style={[styles.profileBio, { color: "#4287f5" }]}>
                  {fetchData.website}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {fetchData.id === user.id ? (
            <AnimatedButton
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 4,
              }}
              buttonScale={0.85}
              onPress={() => router.push("/(app)/edit")}
            >
              <View
                style={{
                  height: 40,
                  width: "90%",
                  borderRadius: 100,
                  backgroundColor: "#000",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Edit Profile </Text>
              </View>
            </AnimatedButton>
          ) : (
            <AddFriendButton
              friend_id={local.user}
              buttonRefresh={buttonRefresh}
              setButtonRefresh={setButtonRefresh}
            />
          )}

          <View style={[styles.section, { marginTop: 8 }]}>
            <Text style={styles.sectionTitle}>Friends</Text>
            {fetchData.id === user.id && (
              <AnimatedButton
                buttonScale={0.9}
                onPress={() => router.push("/(app)/addfriend")}
                style={styles.row}
              >
                <View style={[styles.rowIcon, { backgroundColor: "#000" }]}>
                  <FeatherIcon color="#fff" name="user-plus" size={20} />
                </View>
                <Text style={styles.rowLabel}>Add New Friend</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>
            )}
            {friends.map((friend) => (
              <AnimatedButton
                key={friend.id}
                buttonScale={0.9}
                onPress={() => {
                  router.push({
                    pathname: `/(app)/trampoline`,
                    params: { user: friend.id },
                  });
                }}
                style={styles.row}
              >
                <View style={[styles.rowIcon]}>
                  <Image
                    alt="profile picture"
                    source={{ uri: friend.profile_picture }}
                    style={{ width: 42, height: 42, borderRadius: 9999 }}
                  />
                </View>
                <Text style={[styles.rowLabel, { marginLeft: 6 }]}>
                  {friend.username}
                </Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    paddingTop: 18,
    paddingLeft: 24,
    paddingRight: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    marginLeft: 8,
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  profileAvatar: {
    width: 115,
    height: 115,
    borderRadius: 9999,
    backgroundColor: "#fff",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileUserName: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "left",
  },
  profileName: {
    marginTop: 2,
    fontSize: 17,
    color: "#989898",
    textAlign: "left",
  },
  profileBio: {
    marginTop: 2,
    fontSize: 17,
    color: "#000",
    textAlign: "left",
  },
  section: {
    paddingHorizontal: 12,
  },
  sectionTitle: {
    padding: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 12,
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
});
