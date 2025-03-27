import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import AnimatedButton from "../../components/AnimatedButton";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";

export default function Test() {
  const { user, setUser } = useContext(UserContext);
  const test_insert_location = async () => {
    const { data, error } = await supabase.from("user_location").upsert(
      [
        {
          id: user.id,
          latitude: "40.7128",
          longitude: "-74.0060",
          battery: 80,
          timestamp: new Date().toISOString(),
        },
      ],
      { onConflict: ["id"] }
    );
    if (error) {
      console.log("Error inserting profile:", error);
    } else {
      console.log("Profile data inserted/updated:", data);
    }
  };

  const checkProfileExists = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return false; // No rows found
      }
      console.log("Error checking profile:", error);
      return null; // Return null for an unexpected error
    }
    return !!data; // Return true if profile exists
  };

  const upsertProfile = async (user) => {
    if (!user) {
      console.log("No user logged in");
      return;
    }

    const profileExists = await checkProfileExists(user.id);
    if (profileExists === null) return; // Stop if there was an error

    if (!profileExists) {
      const { data, error } = await supabase.from("profiles").upsert([
        {
          id: user.id,
          username: "test_user",
          name: user.user_metadata.full_name,
          website: "https://maxhu787.github.io/",
          bio: "This is a test bio.",
          profile_picture: user.user_metadata.avatar_url,
          country: "TW",
          public: true,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.log("Error inserting profile:", error);
      } else {
        console.log("Profile created:", data);
      }
    } else {
      console.log("Profile already exists");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(user.id)}</Text>
      <AnimatedButton style={styles.button} onPress={test_insert_location}>
        <Text style={{ fontSize: 18 }}>insert location</Text>
      </AnimatedButton>
      <AnimatedButton
        buttonScale={0.9}
        style={styles.button}
        onPress={() => upsertProfile(user)}
      >
        <Text style={{ fontSize: 18 }}>upsert profile</Text>
        <View style={styles.rowSpacer} />
      </AnimatedButton>
      <AnimatedButton
        buttonScale={0.9}
        style={styles.button}
        onPress={() => {
          router.dismissAll();
          router.replace("/(app)");
          // router.push("/(app)")
        }}
      >
        <Text style={{ fontSize: 18 }}>map</Text>
        <View style={styles.rowSpacer} />
      </AnimatedButton>
      <AnimatedButton
        buttonScale={0.9}
        style={styles.button}
        onPress={() => router.push("/(auth)/signout")}
      >
        <Text style={{ fontSize: 18 }}>Signout</Text>
        <View style={styles.rowSpacer} />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 50,
    width: 120,
    borderRadius: 12,
    backgroundColor: "#ffa500",
    justifyContent: "center",
    alignItems: "center",
  },
});
