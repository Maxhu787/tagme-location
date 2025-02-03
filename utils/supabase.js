import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const supabaseUrl = "https://qjwjlvgctlimiuemqpif.supabase.co";
// const supabaseAnonKey =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqd2psdmdjdGxpbWl1ZW1xcGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNjE4MDEsImV4cCI6MjA1MzYzNzgwMX0.wNZt9kq5TCYI9rnPrMWc8VBmh9pAwBrefhLZa2DJvVE";

const supabaseUrl = "http://localhost:54321";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
