import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import AnimatedButton from "../../components/AnimatedButton";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase"; // Ensure the supabase client is properly set up

export default function Test() {
  const { user, setUser } = useContext(UserContext);

  // Function to insert test data into the profiles table
  const insertTestProfileData = async () => {
    if (!user) {
      console.log("No user logged in");
      return;
    }

    const { data, error } = await supabase.from("profiles").upsert([
      {
        id: user.id,
        username: "test_user",
        bio: "This is a test bio. 2",
        profile_picture: "",
        country: "TW",
        public: true,
        created_at: new Date().toISOString(),
      },
    ]);

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
      <AnimatedButton style={styles.button} onPress={insertTestProfileData}>
        <Text>Insert Test Profile</Text>
      </AnimatedButton>
      <AnimatedButton
        buttonScale={0.9}
        style={styles.button}
        onPress={() => router.push("/(auth)/signout")}
      >
        <Text style={[styles.rowLabel, { color: "#444" }]}>Signout</Text>
        <View style={styles.rowSpacer} />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 64,
    width: 64,
    borderRadius: 50, // Corrected typo 'borderradius' to 'borderRadius'
    backgroundColor: "#ffa500",
    justifyContent: "center",
    alignItems: "center",
  },
});
