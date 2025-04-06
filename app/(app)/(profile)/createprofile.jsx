import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { router, Stack } from "expo-router";
import { supabase } from "../../../utils/supabase";
import AnimatedButton from "../../../components/AnimatedButton";
const { width } = Dimensions.get("window");

export default function Signin() {
  const [username, setUsername] = useState("");
  const { user } = useContext(UserContext);

  const getCountryCode = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);

    const countryCode = geocode[0]?.isoCountryCode;
    return countryCode;
  };

  const upsertProfile = async () => {
    if (!user) {
      console.log("No user logged in");
      return;
    }

    const country = await getCountryCode();

    const { data, error } = await supabase.from("profiles").upsert([
      {
        id: user.id,
        username,
        name: user.user_metadata.full_name,
        website: "",
        bio: "",
        profile_picture: user.user_metadata.avatar_url,
        country: country,
        public: true,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.log("Error upserting profile:", error);
    } else {
      console.log("Profile upserted:", data);
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
    upsertProfile();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "text input",
          }}
        />
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        ></Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "#999",
            borderWidth: 2,
            marginTop: 20,
            paddingHorizontal: 10,
            width: "90%",

            fontSize: 18,
            paddingLeft: 20,
            borderRadius: 18,
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
            Confirm{" "}
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
