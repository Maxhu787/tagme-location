import * as Location from "expo-location";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { router } from "expo-router";
import Loading from "../../../components/Loading";
import { ProfileContext } from "../../../contexts/ProfileContext";
import { supabase } from "../../../utils/supabase";

export default function Signin() {
  const { user } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);

  const getCountryCode = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);

    const countryCode = geocode[0]?.isoCountryCode;
    return countryCode;
  };

  const upsertProfile = async () => {
    if (!user) {
      router.dismissAll();
      router.replace("/(app)");
      return;
    }
    const country = await getCountryCode();
    const email = user.user_metadata.email;
    const username = email.split("@")[0];
    const profileData = {
      id: user.id,
      username: username,
      name: user.user_metadata.full_name,
      website: "",
      bio: "",
      profile_picture: user.user_metadata.avatar_url,
      country: country,
      public: true,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert([profileData]);

    if (error) {
      console.log("Error upserting profile:", error);
    } else {
      console.log("Profile upserted:", data);
      setProfile(profileData);
      router.dismissAll();
      router.replace("/(app)");
    }
  };
  useEffect(() => {
    upsertProfile();
  }, []);

  return null;
}
