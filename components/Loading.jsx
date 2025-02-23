import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { useEffect } from "react";

export default function LoadingScreen() {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 540, easing: Easing.ease }),
        withTiming(1.2, { duration: 360, easing: Easing.ease }),
        withTiming(1.2, { duration: 360, easing: Easing.ease }),
        withTiming(1.2, { duration: 360, easing: Easing.ease }),
        withTiming(1, { duration: 540, easing: Easing.ease })
      ),
      -1
    );

    /*
      .logo {
    animation: logo-anim 1.8s ease infinite;
    height: 50px;
    width: 50px;
  }

  @keyframes logo-anim {
    30% {
      transform: scale(1.2);
    }
    40%, 
    60% {
      transform: rotate(-20deg) scale(1.2);
    }
    50% {
      transform: rotate(20deg) scale(1.2);
    }
    70% {
      transform: rotate(0deg) scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }


  implement in reanimated
    */

    rotate.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 360, easing: Easing.ease }),
        withTiming(20, { duration: 360, easing: Easing.ease }),
        withTiming(0, { duration: 360, easing: Easing.ease })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: "https://avatars.githubusercontent.com/u/103299803" }}
        style={[styles.logo, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    height: 50,
    width: 50,
  },
});
