import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "../utils/supabase";
import Bording from "../components/Bording";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session && session.user ? <Redirect href="/(app)" /> : <Bording />;
}
