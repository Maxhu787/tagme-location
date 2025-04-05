import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import AnimatedButton from "../../../components/AnimatedButton";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { supabase } from "../../../utils/supabase";
import Loading from "../../../components/Loading";
import { UserContext } from "../../../contexts/UserContext";

const dummyFriends = [
  {
    id: "a76236b8-947d-447b-91ed-883a6d828c51",
    username: "johndoe",
    name: "John Doe",
    profile_picture: "https://picsum.photos/100",
  },
  {
    id: "2",
    username: "janesmith",
    name: "Jane Smith",
    profile_picture: "https://picsum.photos/101",
  },
  {
    id: "3",
    username: "alicej",
    name: "Alice Johnson",
    profile_picture: "https://picsum.photos/102",
  },
  {
    id: "4",
    username: "alicej",
    name: "Alice Johnson",
    profile_picture: "https://picsum.photos/103",
  },
  {
    id: "5",
    username: "alicej",
    name: "Alice Johnson",
    profile_picture: "https://picsum.photos/104",
  },
  {
    id: "6",
    username: "alicej",
    name: "Alice Johnson",
    profile_picture: "https://picsum.photos/105",
  },
  {
    id: "7",
    username: "alicej",
    name: "Alice Johnson",
    profile_picture: "https://picsum.photos/33",
  },
  {
    id: "8",
    username: "alicej",
    name: "Alice Johnson",
    profile_picture: "https://picsum.photos/99",
  },
];

export default function Profile() {
  const [fetchData, setFetchData] = useState(null);
  const local = useLocalSearchParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetch = async () => {
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
    fetch();
  }, [local.user]);
  // !refetch data here again

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
                  router.push("/(app)/settings");
                }}
              >
                <FontAwesome6 name="gear" size={24} color="black" />
              </AnimatedButton>
            ),
          }}
        />
        <ScrollView>
          <View style={styles.profile}>
            {/* <AnimatedButton buttonScale={0.8} onPress={() => {}}> */}
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{ uri: fetchData.profile_picture }}
                style={styles.profileAvatar}
              />
            </View>
            {/* </AnimatedButton> */}
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
                <View style={[styles.rowIcon, { backgroundColor: "#ffa500" }]}>
                  <FeatherIcon color="#fff" name="edit" size={20} />
                </View>
                <Text style={styles.rowLabel}>Edit Profile</Text>
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
                    source={require("../../../assets/5.png")}
                    style={{ height: 50, width: 50 }}
                  />
                </View>
                <Text style={styles.rowLabel}>Test Route</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </AnimatedButton>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <AnimatedButton
              buttonScale={0.9}
              onPress={() => router.push("/(app)/add-friend")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#ffa500" }]}>
                <FeatherIcon color="#fff" name="user-plus" size={20} />
              </View>
              <Text style={styles.rowLabel}>Add New Friend</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </AnimatedButton>
            {dummyFriends.map((friend) => (
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
                <View style={[styles.rowIcon, { backgroundColor: "#4287f5" }]}>
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
    width: 32,
    height: 32,
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
  rowValue: {
    fontSize: 16,
    fontWeight: "300",
    color: "#616161",
  },
  rowSpacer: {
    flexGrow: 1,
  },
});
