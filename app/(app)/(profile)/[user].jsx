import React, { useContext, useEffect, useState } from "react";
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
} from "react-native";
import AnimatedButton from "../../../components/AnimatedButton";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import { supabase } from "../../../utils/supabase";
import Loading from "../../../components/Loading";
import { UserContext } from "../../../contexts/UserContext";

export default function Profile() {
  const [fetchData, setFetchData] = useState(null);
  const [friends, setFriends] = useState([]);
  const local = useLocalSearchParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
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
    };

    const fetchFriends = async () => {
      try {
        // Friends where user is the sender
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

        // Friends where user is the receiver
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
        console.error("Error fetching friends:", error);
      }
    };

    fetchProfile();
    fetchFriends();
  }, [local.user]);

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
        <Loading />
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
                style={{
                  height: 55,
                  width: 40,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                text="Settings"
                onPress={() => {
                  router.push("/(app)/(profile)/settings");
                }}
              >
                <FontAwesome6 name="gear" size={24} color="black" />
              </AnimatedButton>
            ),
          }}
        />
        <ScrollView>
          <View style={styles.profile}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{ uri: fetchData.profile_picture }}
                style={styles.profileAvatar}
              />
            </View>
            <View style={styles.profileText}>
              <Text style={styles.profileUserName}>{fetchData.username}</Text>
              <Text style={styles.profileName}>
                {fetchData.name} | {fetchData.country}
              </Text>
              <Text style={styles.profileBio}>{fetchData.bio}</Text>
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

          {fetchData.id === user.id && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <AnimatedButton
                buttonScale={0.9}
                onPress={() => router.push("/(app)/edit")}
                style={styles.row}
              >
                <View style={[styles.rowIcon, { backgroundColor: "#000" }]}>
                  <FeatherIcon color="#fff" name="edit" size={20} />
                </View>
                <Text style={styles.rowLabel}>Edit Profile</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>
              <AnimatedButton
                buttonScale={0.9}
                onPress={() => router.push("/(app)/(profile)/notifications")}
                style={styles.row}
              >
                <View style={[styles.rowIcon, { backgroundColor: "#000" }]}>
                  <Fontisto name="bell" size={20} color="#fff" />
                </View>
                <Text style={styles.rowLabel}>Notifications</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>
              <AnimatedButton
                buttonScale={0.9}
                onPress={() => router.push("/(app)/test")}
                style={styles.row}
              >
                <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                  <Image
                    alt=""
                    source={require("../../../assets/4.png")}
                    style={{ height: 56, width: 56 }}
                  />
                </View>
                <Text style={styles.rowLabel}>Test Route</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>

              <AnimatedButton
                buttonScale={0.9}
                onPress={() => router.push("/(app)/createprofile")}
                style={styles.row}
              >
                <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                  <Image
                    alt=""
                    source={require("../../../assets/3.png")}
                    style={{ height: 56, width: 56 }}
                  />
                </View>
                <Text style={styles.rowLabel}>Create Profile</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>
            </View>
          )}

          <View style={styles.section}>
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
    paddingTop: 24,
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
    width: 110,
    height: 110,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileUserName: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "left",
  },
  profileName: {
    marginTop: 5,
    fontSize: 13,
    color: "#989898",
    textAlign: "left",
  },
  profileBio: {
    marginTop: 2,
    fontSize: 16,
    color: "#989898",
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
