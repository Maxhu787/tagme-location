import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

export default function Auth() {
  GoogleSignin.configure({
    webClientId:
      "1094899319864-in6t1vgarrq32m59d34vpuk692nesg93.apps.googleusercontent.com",
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.data.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: userInfo.data.idToken,
            });
            // console.log(
            //   error,
            //   JSON.stringify(
            //     data.user.identities[0]["identity_data"]["name"],
            //     null,
            //     2
            //   )
            // );
            router.dismissAll();
            router.replace("/");
            if (error) Alert.alert(error.message);
          } else {
            throw new Error("No ID token found");
          }
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log(error);
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log(error);
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log(error);
          } else {
            // some other error happened
            console.log(error);
          }
        }
      }}
    />
  );
}
