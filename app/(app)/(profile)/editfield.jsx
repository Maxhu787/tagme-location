import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../utils/supabase";
const { width } = Dimensions.get("window");

export default function EditField() {
  const local = useLocalSearchParams();
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);

  const updateProfile = async () => {
    if (!user) {
      console.log("No user logged in");
      return { error: "No user logged in" };
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ [local.field]: input })
      .eq("id", user.id);

    if (error) {
      console.log("Error upserting profile:", error);
      return { error };
    } else {
      console.log("Profile updated", data);
      return { data };
    }
  };

  const handleSubmit = async () => {
    const { data, error } = await updateProfile();
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: local.field,
          }}
        />
        <TextInput
          style={{
            position: "absolute",
            top: 20,
            height: 50,
            borderColor: "#ffa500",
            borderWidth: 2,
            width: "90%",
            fontSize: 18,
            paddingLeft: 20,
            borderRadius: 18,
          }}
          placeholder={`Enter your ${local.field}`}
          maxLength={32}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            position: "absolute",
            bottom: 40,
            width: width - 40,
            paddingVertical: 10,
            backgroundColor: "#ffa500",
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
            Confirm
          </Text>
        </TouchableOpacity>
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
});
