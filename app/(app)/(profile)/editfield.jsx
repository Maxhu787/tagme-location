import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../../../contexts/UserContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../utils/supabase";
const { width } = Dimensions.get("window");

export default function EditField() {
  const local = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      input: local.value || "",
    },
  });
  const getValidationRules = (field) => {
    const requiredMessage = `${field} can't be empty.`;

    switch (field) {
      case "username":
        return {
          required: { value: true, message: requiredMessage },
          minLength: { value: 4, message: "Minimum 4 characters." },
          maxLength: { value: 32, message: "Maximum 32 characters." },
        };
      case "name":
        return {
          required: { value: true, message: requiredMessage },
          minLength: { value: 1, message: "Minimum 1 character." },
          maxLength: { value: 50, message: "Maximum 50 characters." },
        };
      case "bio":
      case "profile_picture":
      case "website":
        return {
          maxLength: {
            value: 150,
            message: "Maximum 150 characters.",
          },
        };
      case "country":
        return {
          required: { value: true, message: requiredMessage },
          minLength: {
            value: 2,
            message: "Must be exactly 2 letters.",
          },
          maxLength: {
            value: 2,
            message: "Must be exactly 2 letters.",
          },
          pattern: {
            value: /^[A-Za-z]{2}$/,
            message: "Must be 2 alphabetic characters.",
          },
        };
      default:
        return {};
    }
  };
  const updateProfile = async (input) => {
    if (!user) {
      console.log("No user logged in");
      return { error: "No user logged in" };
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ [local.field]: input })
      .eq("id", user.id);

    if (error) {
      console.log("Error updating profile:", error);
      return { error };
    } else {
      return { data };
    }
  };
  const checkUsernameExists = async (username) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .neq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking username:", error);
      return null; // Unexpected error
    }
    return !!data; // Return true if username exists
  };
  const onSubmit = async (formData) => {
    if (local.field === "username") {
      const usernameExists = await checkUsernameExists(formData.input);
      if (usernameExists) {
        setError("input", {
          type: "manual",
          message: "Username already exists.",
        });
        return;
      }
    }
    const { data, error } = await updateProfile(formData.input);
    if (!error) router.back();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: `Edit ${local.field}` || "Edit Field",
          }}
        />
        <Controller
          control={control}
          rules={getValidationRules(local.field)}
          name="input"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={{
                  position: "absolute",
                  top: 20,
                  height: 50,
                  borderColor: "gray",
                  borderWidth: 2,
                  borderRadius: 8,
                  width: "90%",
                  fontSize: 18,
                  paddingLeft: 20,
                }}
                placeholder={`Enter your ${local.field || "value"}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.input && (
                <Text
                  style={{
                    color: "#e00404",
                    position: "absolute",
                    fontSize: 16,
                    top: 75,
                    left: 25,
                  }}
                >
                  {errors.input.message || "Invalid input"}
                </Text>
              )}
            </>
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            position: "absolute",
            bottom: 40,
            width: width - 40,
            paddingVertical: 10,
            backgroundColor: "#000",
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
