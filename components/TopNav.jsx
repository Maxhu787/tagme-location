import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { useContext, useRef, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import AnimatedButton from "./AnimatedButton";
import Feather from "@expo/vector-icons/Feather";

export default function TopNav() {
  const { profile } = useContext(ProfileContext);
  const [expanded, setExpanded] = useState(false);
  const widthAnim = useRef(new Animated.Value(64)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const profilePosition = useRef(new Animated.Value(0)).current;

  // const toggleNav = () => {
  //   const toValue = expanded ? 64 : 270; // Expands width
  //   Animated.timing(widthAnim, {
  //     toValue,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();

  //   Animated.timing(opacityAnim, {
  //     toValue: expanded ? 0 : 1, // Controls opacity of buttons
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();

  //   Animated.timing(profilePosition, {
  //     toValue: expanded ? 0 : 140, // Moves profile icon to the right
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();

  //   setExpanded(!expanded);
  // };

  return (
    <Animated.View style={[styles.container, { width: widthAnim }]}>
      {/* {!expanded && (
        <TouchableOpacity
          onPress={toggleNav}
          style={[styles.animatedButton, { marginLeft: -5 }]}
        >
          <Image
            source={require("../assets/icon.png")}
            // source={{ uri: "https://picsum.photos/id/664/500/500" }}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )} */}
      {/* <Animated.View
        style={[
          styles.buttonsContainer,
          { opacity: opacityAnim, pointerEvents: expanded ? "auto" : "none" },
        ]}
      >
        <AnimatedButton style={styles.animatedButton} onPress={() => {}}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Feather name="user-plus" size={26} color="black" />
        </AnimatedButton>

        <AnimatedButton style={styles.animatedButton} onPress={() => {}}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </AnimatedButton>

        <AnimatedButton
          style={styles.animatedButton}
          onPress={() => {}}
        >
          <Image
            source={{ uri: profile.profile_picture }}
            style={styles.icon}
            resizeMode="contain"
          />
        </AnimatedButton>
      </Animated.View> */}
      <AnimatedButton
        // onPress={toggleNav}
        // onPress={() => {}}
        onPress={() => router.push(`/profile/${profile.id}`)}
        style={styles.animatedButton}
      >
        <Image
          // source={require("../assets/icon.png")}
          source={{ uri: "https://picsum.photos/id/664/500/500" }}
          style={styles.icon}
          resizeMode="contain"
        />
      </AnimatedButton>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: Platform.OS === "ios" ? 65 : 55,
    right: 20,
    height: 64, //64
    // backgroundColor: "#fff",
    // backgroundColor: "#ddd",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    // paddingRight: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    marginLeft: -10,
  },
  animatedButton: {
    height: 64,
    width: 64,
    borderRadius: 50,
    backgroundColor: "#ffa500",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginLeft: -2,
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
});
