import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "../../utils/supabase";
import { Alert } from "react-native";
import { UserContext } from "../../contexts/UserContext";

export default function Signout() {
  GoogleSignin.configure({
    webClientId:
      "1094899319864-in6t1vgarrq32m59d34vpuk692nesg93.apps.googleusercontent.com",
  });
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const logout = async () => {
      try {
        await GoogleSignin.signOut();
        await supabase.auth.signOut();
        setUser(null);
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
