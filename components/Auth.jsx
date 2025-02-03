import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../utils/supabase";
import { TouchableOpacity, Text } from "react-native";

export default function Auth() {
  GoogleSignin.configure({
    // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "1094899319864-in6t1vgarrq32m59d34vpuk692nesg93.apps.googleusercontent.com",
  });

  return (
    <TouchableOpacity
      // size={GoogleSigninButton.Size.Wide}
      // color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          // console.log(JSON.stringify(userInfo, null, 2));
          if (userInfo.data.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: userInfo.data.idToken,
            });
            console.log(error, data);
          } else {
            throw new Error("No ID token found");
          }
        } catch (error) {
          console.log(error);
          /*
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }*/
        }
      }}
      // disabled={this.state.isSigninInProgress}
    >
      <Text>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
