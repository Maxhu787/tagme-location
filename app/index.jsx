import { useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "../utils/supabase";
import { View } from "react-native";
import Bording from "../components/Bording";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext } from "../contexts/ProfileContext";
import Loading from "../components/Loading";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(null);

  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session && data.session.user) {
        setUser(data.session.user);
        // console.log("fetch session");
        const exists = await checkProfileExists(data.session.user.id);
        setProfileExists(exists);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session && session.user) {
          setUser(session.user);

          // console.log("on auth state change");
          const exists = await checkProfileExists(session.user.id);
          setProfileExists(exists);
        }
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const checkProfileExists = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
    if (error) {
      if (error.code === "PGRST116") {
        return false; // No profile found
      }
      console.log("Error checking profile:", error);
      return null; // Unexpected error
    }
    return !!data; // Return true if profile exists
  };

  if (loading) {
    return <Loading />;
  }

  if (!session || !session.user) {
    return <Bording />;
  }

  return <Redirect href={profileExists ? "/(app)" : "/(app)/test"} />;
  // return <Bording />;
  // return <Redirect href={"/(app)/(profile)/createprofile"} />;
}
