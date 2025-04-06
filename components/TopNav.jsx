import { StyleSheet, Platform, Image, Animated } from "react-native";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import AnimatedButton from "./AnimatedButton";

export default function TopNav() {
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    console.log(profile);
  }, []);

  return (
    <Animated.View style={styles.container}>
      <AnimatedButton
        onPress={() => {
          router.push({
            pathname: `/(app)/trampoline`,
            params: { user: profile.id },
          });
        }}
        style={styles.animatedButton}
      >
        <Image
          source={{
            uri: profile?.profile_picture,
          }}
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
    height: 64,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  animatedButton: {
    height: 64,
    width: 64,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: "#fff",
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
