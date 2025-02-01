import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qjwjlvgctlimiuemqpif.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqd2psdmdjdGxpbWl1ZW1xcGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNjE4MDEsImV4cCI6MjA1MzYzNzgwMX0.wNZt9kq5TCYI9rnPrMWc8VBmh9pAwBrefhLZa2DJvVE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// import { supabase } from '/utils/supabase'
