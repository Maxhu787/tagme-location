import { useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "../utils/supabase";
import { UserContext } from "../contexts/UserContext";
import { ProfileContext } from "../contexts/ProfileContext";
import Bording from "../components/Bording";
import Loading from "../components/Loading";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(null);

  const { setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);

  useEffect(() => {
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
        console.log("Error checking profile:", error);
        return null; // Unexpected error
      }
      setProfile(data);
      return !!data; // Return true if profile exists
    };

    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session && data.session.user) {
        setUser(data.session.user);
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
  if (loading) {
    return <Loading />;
  } else if (!session || !session.user) {
    return <Bording />;
  } else {
    return (
      <Redirect
        href={profileExists ? "/(app)" : "/(app)/(profile)/createprofile"}
      />
    );
  }
}
