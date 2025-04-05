import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import AnimatedButton from "../../../components/AnimatedButton";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../../../components/Loading";

export default function Notifications() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("id, username, profile_picture")
          .neq("id", user.id);

        if (usersError) {
          console.error("Error fetching users:", usersError);
        } else {
          setUsers(usersData);
        }

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
      }
    };

    fetchUsers();
  }, []);

  // user_id uuid references auth.users on delete cascade not null,
  // friend_id uuid references auth.users on delete cascade not null,
  // status text check (status IN ('pending', 'accepted', 'blocked')) not null,

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
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Loading />
      </>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerShadowVisible: true,
          headerShown: true,
        }}
      />
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
