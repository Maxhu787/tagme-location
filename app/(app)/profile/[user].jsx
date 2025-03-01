import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import AnimatedButton from "../../../components/AnimatedButton";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const local = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          title: `${local.user}`,
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
                source={require("../../../assets/hi.png")}
                style={styles.profileAvatar}
              />
            </View>
          </AnimatedButton>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{local.user}</Text>
            <Text style={styles.profileBio}>
              lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
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
              {/* <FeatherIcon color="#fff" name="user" size={20} /> */}
              <Image
                alt=""
                // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                source={require("../../../assets/2.png")}
                style={{ height: 50, width: 50 }}
              />
            </View>
            <Text style={styles.rowLabel}>Username</Text>
            <View style={styles.rowSpacer} />
            <Text style={styles.rowValue}>{local.user}</Text>
          </AnimatedButton>

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
              {/* <FeatherIcon color="#fff" name="mail" size={20} /> */}
              <Image
                alt=""
                // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                source={require("../../../assets/hi.png")}
                style={{ height: 50, width: 50 }}
              />
            </View>
            <Text style={styles.rowLabel}>Email</Text>
            <View style={styles.rowSpacer} />
            <Text style={styles.rowValue}>hu@example.com</Text>
          </AnimatedButton>

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
              {/* <FeatherIcon color="#fff" name="map-pin" size={20} /> */}
              <Image
                alt=""
                // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                source={require("../../../assets/3.png")}
                style={{ height: 50, width: 50 }}
              />
            </View>
            <Text style={styles.rowLabel}>Location</Text>
            <View style={styles.rowSpacer} />
            <Text style={styles.rowValue}>New York, USA</Text>
          </AnimatedButton>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => setIsEditing(!isEditing)}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              {/* <FeatherIcon color="#fff" name="edit" size={20} /> */}
              <Image
                alt=""
                // source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                source={require("../../../assets/5.png")}
                style={{ height: 50, width: 50 }}
              />
            </View>
            <Text style={styles.rowLabel}>Edit Profile</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    padding: 24,
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
  profileName: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "600",
    color: "#414d63",
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
