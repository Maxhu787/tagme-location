import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import AnimatedButton from "../../../components/AnimatedButton";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";

export default function Notifications() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const fetchPendingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("friends")
        .select(
          `
          user_id,
          profiles:user_id(username, profile_picture)
        `
        )
        .eq("friend_id", user.id)
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending requests:", error);
      } else {
        setPendingRequests(data);
      }
    } catch (error) {
      console.error("Error in fetchPendingRequests:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleAcceptRequest = async (requesterId) => {
    try {
      const { error } = await supabase
        .from("friends")
        .update({ status: "accepted" })
        .eq("user_id", requesterId)
        .eq("friend_id", user.id);

      if (error) {
        console.error("Error accepting friend request:", error);
      } else {
        setPendingRequests((prev) =>
          prev.filter((request) => request.user_id !== requesterId)
        );
      }
    } catch (error) {
      console.error("Error in handleAcceptRequest:", error);
    }
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchPendingRequests();
          }}
        />
      }
    >
      <View style={[styles.section, { marginTop: 8 }]}>
        {pendingRequests.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#9e9e9e",
              fontSize: 18,
              letterSpacing: 1.1,
            }}
          >
            No notifications
          </Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Pending Friend Requests</Text>
            {pendingRequests.map((request) => (
              <AnimatedButton
                key={request.user_id}
                style={styles.row}
                buttonScale={0.9}
                onPress={() => {
                  router.push({
                    pathname: `/(app)/trampoline`,
                    params: { user: request.user_id },
                  });
                }}
              >
                <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                  <Image
                    alt="profile picture"
                    source={{ uri: request.profiles.profile_picture }}
                    style={{ width: 42, height: 42, borderRadius: 9999 }}
                  />
                </View>
                <Text style={styles.rowLabel}>{request.profiles.username}</Text>
                <View style={styles.rowSpacer} />
                <AnimatedButton
                  onPress={() => handleAcceptRequest(request.user_id)}
                  buttonScale={0.85}
                >
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      borderRadius: 100,
                      backgroundColor: "#28603d",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Accept</Text>
                  </View>
                </AnimatedButton>
              </AnimatedButton>
            ))}
          </>
        )}
      </View>
    </ScrollView>
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
