import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { supabase } from "./supabase";
import { Alert, Platform } from "react-native";
import Constants from "expo-constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerPushToken = async (user_id) => {
  if (!user_id) return;
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#ffa500",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      console.log("Project ID not found");
      return;
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      // console.log(pushTokenString);
      // const savedToken = await AsyncStorage.getItem("expoPushToken");
      // console.log(token);
      // if (token !== savedToken) {

      // await supabase
      //   .from("expo_tokens")
      //   .upsert({ user_id, pushTokenString }, { onConflict: ["user_id"] });
      // console.log("supabase");
      // await AsyncStorage.setItem("expoPushToken", token);
      return pushTokenString;
    } catch (e) {
      console.log(`${e}`);
    }
  } else {
    // console.log("Must use physical device for push notifications");
  }
};
