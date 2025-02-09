import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
// import { supabase } from "../utils/supabase";
import { View, ActivityIndicator } from "react-native";
import Bording from "../components/Bording";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     setTimeout(() => {
  //       setSession(data.session);
  //       setLoading(false);
  //     }, 10);
  //   };
  //   fetchSession();

  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (_event, session) => {
  //       setTimeout(() => {
  //         setSession(session);
  //         setLoading(false);
  //       }, 5000);
  //     }
  //   );

  //   return () => {
  //     listener?.subscription.unsubscribe();
  //   };
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#ffa500" />
  //     </View>
  //   );
  // }

  return session && session.user ? <Redirect href="/(app)" /> : <Bording />;
}
