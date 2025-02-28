import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import AnimatedButton from "../../components/AnimatedButton";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase"; // Ensure the supabase client is properly set up

export default function Test() {
  const { user, setUser } = useContext(UserContext);

  // const insertTestProfileData = async () => {
  //   if (!user) {
  //     console.log("No user logged in");
  //     return;
  //   }

  //   const { data, error } = await supabase.from("profiles").upsert([
  //     {
  //       id: user.id,
  //       username: "test_user",
  //       bio: "This is a test bio. 2",
  //       profile_picture: "",
  //       country: "TW",
  //       public: true,
  //       created_at: new Date().toISOString(),
  //     },
  //   ]);

  //   if (error) {
  //     console.log("Error inserting profile:", error);
  //   } else {
  //     console.log("Profile data inserted/updated:", data);
  //   }
  // };

  const test_insert = async () => {
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>test</Text>
      <Text>{JSON.stringify(user.id)}</Text>
      <AnimatedButton style={styles.button} onPress={test_insert}>
        <Text style={{ fontSize: 20 }}>test</Text>
      </AnimatedButton>
      <AnimatedButton
        buttonScale={0.9}
        style={styles.button}
        onPress={() => router.push("/(auth)/signout")}
      >
        <Text style={{ fontSize: 20 }}>Signout</Text>
        <View style={styles.rowSpacer} />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 80,
    width: 120,
    borderRadius: 50, // Corrected typo 'borderradius' to 'borderRadius'
    backgroundColor: "#ffa500",
    justifyContent: "center",
    alignItems: "center",
  },
});
