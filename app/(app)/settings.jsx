import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AnimatedButton from "../../components/AnimatedButton";

export default function Example() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <ScrollView>
        <View style={styles.profile}>
          <AnimatedButton buttonScale={0.9} onPress={() => {}}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                style={styles.profileAvatar}
              />
            </View>
          </AnimatedButton>
          <View>
            <Text style={styles.profileName}>Hu Kaixiang</Text>
            <Text style={styles.profileBio}>
              lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
              <FeatherIcon color="#fff" name="globe" size={20} />
            </View>
            <Text style={styles.rowLabel}>Language</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              setDarkMode(!darkMode);
            }}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(darkMode) => setDarkMode(darkMode)}
              value={darkMode}
            />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
              <FeatherIcon color="#fff" name="navigation" size={20} />
            </View>
            <Text style={styles.rowLabel}>Location</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              setEmailNotifications(!emailNotifications);
            }}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Email Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(emailNotifications) =>
                setEmailNotifications(emailNotifications)
              }
              value={emailNotifications}
            />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              setPushNotifications(!pushNotifications);
            }}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Push Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(pushNotifications) =>
                setPushNotifications(pushNotifications)
              }
              value={pushNotifications}
            />
          </AnimatedButton>
        </View>
        <View style={[styles.section, { paddingBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#8e8d91" }]}>
              <FeatherIcon color="#fff" name="flag" size={20} />
            </View>
            <Text style={styles.rowLabel}>Report Bug</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>
            <Text style={styles.rowLabel}>Contact Us</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {}}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
              <FeatherIcon color="#fff" name="star" size={20} />
            </View>
            <Text style={styles.rowLabel}>Rate in App Store</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>
          <AnimatedButton
            buttonScale={0.9}
            style={styles.row}
            // onPress={() => router.push("/(auth)/signout")}
          >
            <Text style={styles.rowLabel}>Signout</Text>
            <View style={styles.rowSpacer} />
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
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileBio: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
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
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
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
  rowSpacer: {
    flexGrow: 1,
  },
});
