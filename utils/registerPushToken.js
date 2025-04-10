import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabaseClient";

export const registerPushToken = async (userId) => {
  if (!Device.isDevice) return;

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
      .upsert({ user_id: userId, token }, { onConflict: ["user_id"] });

    await AsyncStorage.setItem("expoPushToken", token);
  }
};
