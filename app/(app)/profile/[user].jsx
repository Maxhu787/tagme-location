import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import AnimatedButton from "../../../components/AnimatedButton";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { supabase } from "../../../utils/supabase";
import Loading from "../../../components/Loading";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Profile() {
  const [fetchData, setFetchData] = useState(null);
  const local = useLocalSearchParams();

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        // .eq("id", "81a2b721-1811-469f-a02d-250821bb3612")
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
  }, []);
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
            title: `${fetchData.username}`,
            headerShown: true,
            headerShadowVisible: true,
            headerRight: () => (
              <AnimatedButton
                style={{
                  // marginRight: -12,
                  height: 55,
                  width: 40,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
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
            <AnimatedButton buttonScale={0.8} onPress={() => {}}>
              <View style={styles.profileAvatarWrapper}>
                <Image
                  alt=""
                  // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                  source={{ uri: fetchData.profile_picture }}
                  // source={require("../../../assets/hi.png")}
                  style={styles.profileAvatar}
                />
              </View>
            </AnimatedButton>
            <View style={styles.profileText}>
              <Text style={styles.profileUserName}>{fetchData.username}</Text>
              <Text style={styles.profileName}>{fetchData.name}</Text>
              <Text style={styles.profileBio}>{fetchData.bio}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <AnimatedButton
              buttonScale={0.9}
              onPress={() => {}}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <FeatherIcon color="#fff" name="user" size={20} />
                {/* <Image
                  alt=""
                  // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                  source={require("../../../assets/2.png")}
                  style={{ height: 50, width: 50 }}
                /> */}
              </View>
              <Text style={styles.rowLabel}>Username</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.username}</Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => {}}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
                <MaterialCommunityIcons name="web" size={20} color="#fff" />
                {/* <Image
                  alt=""
                  // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                  source={require("../../../assets/hi.png")}
                  style={{ height: 50, width: 50 }}
                /> */}
              </View>
              <Text style={styles.rowLabel}>Website</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.website}</Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => {}}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="map-pin" size={20} />
                {/* <Image
                  alt=""
                  // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                  source={require("../../../assets/3.png")}
                  style={{ height: 50, width: 50 }}
                /> */}
              </View>
              <Text style={styles.rowLabel}>Location</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.country}</Text>
            </AnimatedButton>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <AnimatedButton
              buttonScale={0.9}
              onPress={() => {}}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <FeatherIcon color="#fff" name="edit" size={20} />
                {/* <Image
                  alt=""
                  // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                  source={require("../../../assets/5.png")}
                  style={{ height: 50, width: 50 }}
                /> */}
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
                <FeatherIcon color="#fff" name="edit" size={20} />
                {/* <Image
                  alt=""
                  // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                  source={require("../../../assets/4.png")}
                  style={{ height: 50, width: 50 }}
                /> */}
              </View>
              <Text style={styles.rowLabel}>Test Route</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </AnimatedButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: 30,
    paddingVertical: 30,
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
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "left",
  },
  section: {
    paddingHorizontal: 12,
    // 24
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
    // backgroundColor: "#f2f2f2",
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#f2f2f2",
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
