import {
  StyleSheet,
  Platform,
  Image,
  Animated,
  View,
  Text,
} from "react-native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import AnimatedButton from "./AnimatedButton";
import Fontisto from "@expo/vector-icons/Fontisto";
import { ProfileContext } from "../contexts/ProfileContext";
import { supabase } from "../utils/supabase";

export default function TopNav() {
  const { profile } = useContext(ProfileContext);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const fetchPendingRequestsCount = async () => {
    try {
      const { count, error } = await supabase
        .from("friends")
        .select("*", { count: "exact", head: true })
        .eq("friend_id", profile.id)
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending requests count:", error);
      } else {
        setPendingRequestsCount(count || 0);
      }
    } catch (error) {
      console.error("Error in fetchPendingRequestsCount:", error);
    }
  };
  useEffect(() => {
    fetchPendingRequestsCount();
    const intervalId = setInterval(fetchPendingRequestsCount, 1000 * 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Animated.View style={styles.container}>
      <AnimatedButton
        onPress={() => router.push("/(app)/(profile)/notifications")}
        style={styles.animatedButton}
      >
        <View>
          <Fontisto name="bell" size={24} color="#000" />
          {pendingRequestsCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {pendingRequestsCount}
              </Text>
            </View>
          )}
        </View>
      </AnimatedButton>
      <AnimatedButton
        onPress={() => {
          router.push({
            pathname: `/(app)/trampoline`,
            params: { user: profile.id },
          });
        }}
        style={[styles.animatedButton, { marginLeft: 10 }]}
      >
        <Image
          source={{
            uri: profile?.profile_picture,
          }}
          style={styles.icon}
          resizeMode="contain"
        />
      </AnimatedButton>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: Platform.OS === "ios" ? 65 : 55,
    right: 20,
    height: 64,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  animatedButton: {
    height: 64,
    width: 64,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginLeft: -2,
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  notificationBadge: {
    position: "absolute",
    bottom: -18,
    right: -18,
    backgroundColor: "#d43226",
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
