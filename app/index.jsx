import { useContext, useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import { supabase } from "../utils/supabase";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext } from "../contexts/ProfileContext";
import Toast from "react-native-toast-message";
import Bording from "../components/Bording";
import Loading from "../components/Loading";
import { View, Text } from "react-native";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);

  const checkProfileExists = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return false; // No profile found
      }
      Toast.show({
        type: "error",
        text1: "Error checking profile:",
        text2: error.message,
        position: "top",
      });
      console.log("Error checking profile:", error);
      return null; // Unexpected error
    }
    setProfile(data);
    return !!data; // Return true if profile exists
  };
  const fetchSession = async () => {
    console.log("fetchSession");
    const { data } = await supabase.auth.getSession();
    setSession(data.session);

    if (data.session && data.session.user) {
      setUser(data.session.user);
      const exists = await checkProfileExists(data.session.user.id);
      if (exists) {
        console.log("navigate to app");
        router.replace("/(app)");
      } else {
        console.log("navigate to create profile");
        router.push("/(app)/(profile)/createprofile");
      }
    } else {
      console.log("No session found");
    }
    setLoading(false);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session && session.user) {
          setUser(session.user);
          const exists = await checkProfileExists(session.user.id);
          if (exists) {
            router.replace("/(app)");
          } else {
            router.push("/(app)/(profile)/createprofile");
          }
        }
        setLoading(false);
      }
    );
    fetchSession();
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
        <Toast />
      </>
    );
  } else if (!session || !session.user) {
    return <Bording />;
  }
  //  else {
  //   return (
  //     <View>
  //       <Text>test</Text>
  //       <Text>test</Text>
  //       <Text>test</Text>
  //       <Text>test</Text>
  //     </View>
  //     // <Redirect href="/(app)/" />
  //   );
  // }
}
