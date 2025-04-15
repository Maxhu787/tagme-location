import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AnimatedButton from "./AnimatedButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Auth() {
  GoogleSignin.configure({
    webClientId:
      "1094899319864-n9jeg34al5slqen27ave2mh3ttm1k824.apps.googleusercontent.com",
  });
  const { setUser } = useContext(UserContext);

  const handlePress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (data.user) {
          setUser(data.user);
        }
        // router.dismissAll();
        router.replace("/(app)");
        if (error) console.log(error.message);
      } else {
        throw new Error("No ID token found");
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error, "SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error, "IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error, "PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        // some other error happened
        console.log(error, "auth error");
      }
    }
  };
  return (
    <>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handlePress}
      /> */}
      <AnimatedButton
        style={{
          height: 52,
          width: 290,
          borderRadius: 50,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handlePress}
        // buttonScale={0.85}
        buttonScale={0.9}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <AntDesign
            name="google"
            style={{ marginRight: 0 }}
            size={30}
            color="#fff"
          />
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              fontWeight: "bold",
              marginBottom: 1,
            }}
          >
            Sign in with google
          </Text>
        </View>
      </AnimatedButton>
    </>
  );
}
