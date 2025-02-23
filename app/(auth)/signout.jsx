import { useEffect } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "../../utils/supabase";
import { Alert } from "react-native";

export default function Signout() {
  GoogleSignin.configure({
    webClientId:
      "1094899319864-in6t1vgarrq32m59d34vpuk692nesg93.apps.googleusercontent.com",
  });
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await GoogleSignin.signOut();
        await supabase.auth.signOut();
        router.dismissAll();
        router.replace("/");
      } catch (error) {
        Alert.alert("Logout error:", error);
      }
    };
    logout();
  }, []);

  return null;
}
