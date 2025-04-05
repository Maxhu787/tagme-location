import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import AnimatedButton from "../../../components/AnimatedButton";
import { supabase } from "../../../utils/supabase";
import { UserContext } from "../../../contexts/UserContext";

export default function AddFriend() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, profile_picture")
        .neq("id", user.id);

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerShadowVisible: true,
        }}
      />
      <View style={styles.section}>
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
              onPress={() => {
                // console.log(`Add friend: ${user.username}`);
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 100,
                  backgroundColor: "#000",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Add Friend</Text>
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
