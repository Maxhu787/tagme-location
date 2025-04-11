import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { UserContext } from "../../contexts/UserContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import { supabase } from "../../utils/supabase";

export default function Signout() {
  GoogleSignin.configure({
    webClientId:
      "1094899319864-in6t1vgarrq32m59d34vpuk692nesg93.apps.googleusercontent.com",
  });
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);

  useEffect(() => {
    const logout = async () => {
      try {
        await GoogleSignin.signOut();
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        router.dismissAll();
        router.replace("/");
      } catch (error) {
        console.log("Logout error:", error);
      }
    };
    logout();
  }, []);

  return null;
}
