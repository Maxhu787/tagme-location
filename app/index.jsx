import { useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "../utils/supabase";
import { View, ActivityIndicator } from "react-native";
import Bording from "../components/Bording";
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setTimeout(() => {
        setSession(data.session);
        if (data.session && data.session.user) {
          setUser(data.session.user);
        }
        setLoading(false);
      }, 2500);
    };
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setTimeout(() => {
          setSession(session);
          setLoading(false);
        }, 5000);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <ActivityIndicator size="large" color="#ffa500" />
      // </View>
      <Loading />
    );
  }

  // return session && session.user ? (
  //   <Redirect href="/(app)/test" />
  // ) : (
  //   <Bording />
  // );

  // return session && session.user ? (
  //   <Redirect href="/(app)" />
  // ) : (
  //   <Bording />
  // );

  // return <Redirect href="/(app)" />;
  return <Bording />;
}
