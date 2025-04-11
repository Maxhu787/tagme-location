import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { Platform } from "react-native";

export const registerPushToken = async (user_id) => {
  if (!user_id) return;
  if (!Device.isDevice) {
    // console.log("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") return;

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: "f7edd522-c923-4a40-8e6a-c65ed84c1971",
    })
  ).data;
  // const savedToken = await AsyncStorage.getItem("expoPushToken");
  // console.log(token);
  // if (token !== savedToken) {
  await supabase
    .from("expo_tokens")
    .upsert({ user_id, token }, { onConflict: ["user_id"] });

  await AsyncStorage.setItem("expoPushToken", token);
  // }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#ffa500",
    });
  }
};
