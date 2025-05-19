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

export default function AddFriend() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const [pendingRequests, setPendingRequests] = useState([]);

  const fetchUsers = async () => {
    try {
      // 1. Get all accepted friend IDs (bidirectional)
      const { data: friendsData, error: friendsError } = await supabase
        .from("friends")
        .select("user_id, friend_id")
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
        .eq("status", "accepted");

      const friendIds =
        friendsData?.map((f) =>
          f.user_id === user.id ? f.friend_id : f.user_id
        ) ?? [];

      // 2. Get all users excluding self and friends
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("id, username, profile_picture")
        .not("id", "in", `(${[...friendIds, user.id].join(",")})`);

      if (usersError) {
        console.error("Error fetching users:", usersError);
      } else {
        setUsers(usersData);
      }

      // 3. Get pending friend requests
      const { data: pendingData, error: pendingError } = await supabase
        .from("friends")
        .select("friend_id")
        .eq("user_id", user.id)
        .eq("status", "pending");

      if (pendingError) {
        console.error("Error fetching pending requests:", pendingError);
      } else {
        setPendingRequests(pendingData.map((request) => request.friend_id));
      }
    } catch (error) {
      console.error("Error in fetchUsers:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddFriend = async (id) => {
    const { error } = await supabase
      .from("friends")
      .upsert(
        { user_id: user.id, friend_id: id, status: "pending" },
        { onConflict: ["user_id", "friend_id"] }
      );

    if (error) {
      console.error("Error adding friend:", error);
    } else {
      setPendingRequests((prev) => [...prev, id]); // Add the user ID to pending requests
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
            fetchUsers();
          }}
        />
      }
    >
      <View style={[styles.section, { marginTop: 8 }]}>
        <Text style={styles.sectionTitle}>Add Friends</Text>
        {users.map((user) => (
          <AnimatedButton
            onPress={() => {
              router.push({
                pathname: `/(app)/trampoline`,
                params: { user: user.id },
              });
            }}
            buttonScale={0.9}
            key={user.id}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
              <Image
                alt="profile picture"
                source={{ uri: user.profile_picture }}
                style={{ width: 42, height: 42, borderRadius: 9999 }}
              />
            </View>
            <Text style={styles.rowLabel}>{user.username}</Text>
            <View style={styles.rowSpacer} />
            <AnimatedButton
              onPress={() => handleAddFriend(user.id)}
              buttonScale={pendingRequests.includes(user.id) ? 1 : 0.85}
              disabled={pendingRequests.includes(user.id)}
            >
              <View
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 100,
                  backgroundColor: pendingRequests.includes(user.id)
                    ? "#888"
                    : "#000",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>
                  {pendingRequests.includes(user.id) ? "Pending" : "Add Friend"}
                </Text>
              </View>
            </AnimatedButton>
          </AnimatedButton>
        ))}
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
