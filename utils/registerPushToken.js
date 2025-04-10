import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { Platform } from "react-native";

export const registerPushToken = async (user_id) => {
  // console.log(user_id);
  if (!user_id) return;
  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") return;

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  const savedToken = await AsyncStorage.getItem("expoPushToken");

  if (token !== savedToken) {
    await supabase
      .from("expo_tokens")
      .upsert({ user_id, token }, { onConflict: ["user_id"] });

    await AsyncStorage.setItem("expoPushToken", token);
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#ffa500",
    });
  }
};
