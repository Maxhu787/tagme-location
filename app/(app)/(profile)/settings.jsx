import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AnimatedButton from "../../../components/AnimatedButton";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
        }}
      />
      <ScrollView>
        <View style={[styles.section, { marginTop: 12 }]}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View
              style={[
                styles.rowIcon,
                {
                  // backgroundColor: "#fe9400"
                  backgroundColor: "#000",
                },
              ]}
            >
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
            <View
              style={[
                styles.rowIcon,
                {
                  backgroundColor: "#000",
                  // backgroundColor: "#007afe"
                },
              ]}
            >
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
          </AnimatedButton>

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View
              style={[
                styles.rowIcon,
                {
                  // backgroundColor: "#32c759"
                  backgroundColor: "#000",
                },
              ]}
            >
              <FeatherIcon color="#fff" name="navigation" size={20} />
            </View>
            <Text style={styles.rowLabel}>Location</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>

          {/* <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#000" }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Email Notifications</Text>
            <View style={styles.rowSpacer} />
          </AnimatedButton> */}

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#000" }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Push Notifications</Text>
            <View style={styles.rowSpacer} />
          </AnimatedButton>
        </View>
        <View style={[styles.section, { paddingBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View
              style={[
                styles.rowIcon,
                {
                  //  backgroundColor: "#8e8d91"
                  backgroundColor: "#000",
                },
              ]}
            >
              <FeatherIcon color="#fff" name="flag" size={20} />
            </View>
            <Text style={styles.rowLabel}>Report Bug</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View
              style={[
                styles.rowIcon,
                {
                  // backgroundColor: "#007afe"
                  backgroundColor: "#000",
                },
              ]}
            >
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>
            <Text style={styles.rowLabel}>Contact Us</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => {
              Alert.alert("fuck off");
            }}
            style={styles.row}
          >
            <View
              style={[
                styles.rowIcon,
                {
                  backgroundColor: "#000",
                  // backgroundColor: "#32c759",
                },
              ]}
            >
              <FeatherIcon color="#fff" name="star" size={20} />
            </View>
            <Text style={styles.rowLabel}>Rate in App Store</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </AnimatedButton>

          <AnimatedButton
            buttonScale={0.9}
            onPress={() => router.push("/(auth)/signout")}
            style={[
              styles.row,
              {
                backgroundColor: "#fcd5d2",
                marginHorizontal: 8,
              },
            ]}
          >
            <Text
              style={[styles.rowLabel, { paddingLeft: 12, color: "#992b23" }]}
            >
              Signout
            </Text>
            <View style={styles.rowSpacer} />
          </AnimatedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  rowSpacer: {
    flexGrow: 1,
  },
});
