import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router } from "expo-router";

export default TopNav = () => {
  const scaleSignout = useSharedValue(1);
  const scaleProfile = useSharedValue(1);

  const animatedStyleSignout = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSignout.value }],
  }));
  const animatedStyleProfile = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProfile.value }],
  }));

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 2,
        top: Platform.OS === "ios" ? 40 : 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 32,
        gap: 48,
      }}
    >
      <Animated.View style={animatedStyleSignout}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 100,
            borderRadius: 10,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            elevation: 15,
          }}
          activeOpacity={1}
          onPressIn={() =>
            (scaleSignout.value = withSpring(0.75, {
              stiffness: 300,
              damping: 15,
            }))
          }
          onPressOut={() =>
            (scaleSignout.value = withSpring(1, {
              stiffness: 150,
              damping: 10,
            }))
          }
          onPress={() => {
            router.push("/(app)/settings");
          }}
        >
          <Text>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={animatedStyleProfile}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 100,
            borderRadius: 10,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            elevation: 15,
          }}
          activeOpacity={1}
          onPressIn={() =>
            (scaleProfile.value = withSpring(0.75, {
              stiffness: 300,
              damping: 15,
            }))
          }
          onPressOut={() =>
            (scaleProfile.value = withSpring(1, {
              stiffness: 150,
              damping: 10,
            }))
          }
          onPress={() => {
            router.push("/(auth)/signout");
          }}
        >
          <Text>Signout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});
