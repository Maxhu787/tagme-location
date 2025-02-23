import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function AnimatedButton({ text, style, onPress, children }) {
  const scaleButton = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleButton.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.button, style]}
        activeOpacity={1}
        onPressIn={() =>
          (scaleButton.value = withSpring(0.75, {
            stiffness: 300,
            damping: 15,
          }))
        }
        onPressOut={() =>
          (scaleButton.value = withSpring(1, {
            stiffness: 150,
            damping: 10,
          }))
        }
        onPress={onPress || (() => Alert.alert("test"))}
      >
        {children ? children : <Text>{text}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    // height: 50,
    // width: 100,
    // borderRadius: 10,
    // backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
    // shadowColor: "#000",
    // elevation: 15,
  },
});
