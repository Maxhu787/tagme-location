import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { router } from "expo-router";
import { supabase } from "../../../utils/supabase";
import AnimatedButton from "../../../components/AnimatedButton";
const { width, height } = Dimensions.get("window");

export default function Signin() {
  const [username, setUsername] = useState("");
  const { user } = useContext(UserContext);

  const getCountry = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);

    const country = geocode[0]?.country;
    return country;
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
          username: username,
          name: user.user_metadata.full_name,
          website: "",
          bio: "",
          profile_picture: user.user_metadata.avatar_url,
          country: getCountry(),
          public: true,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.log("Error inserting profile:", error);
      } else {
        console.log("Profile created:", data);
        router.push("/(app)");
      }
    } else {
      console.log("Profile already exists");
      router.push("/(app)");
    }
  };

  const handleSubmit = () => {
    if (username.length < 4 || username.length > 32) {
      Alert.alert(
        "Invalid Username",
        "Username must be between 4 and 32 characters."
      );
      return;
    }
    upsertProfile(user);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Create Profile
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 20,
            paddingHorizontal: 10,
            width: "90%",

            fontSize: 16,
            paddingLeft: 12,
            borderRadius: 8,
          }}
          placeholder="Enter username"
          maxLength={32}
          value={username}
          onChangeText={setUsername}
        />
        <AnimatedButton
          onPress={handleSubmit}
          style={{
            width: width - 40,
            paddingVertical: 10,
            backgroundColor: "#ffa500",
            borderRadius: 5,
            alignItems: "center",
            bottom: -40,
          }}
          buttonScale={0.85}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
            Create Profile
          </Text>
        </AnimatedButton>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  submitButton: {},
});
