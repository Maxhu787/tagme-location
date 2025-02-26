import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function AnimatedButton({
  text,
  style,
  onPress,
  buttonScale = 0.75,
  children,
}) {
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
          (scaleButton.value = withSpring(buttonScale, {
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
        {children ? (
          children
        ) : (
          <Text style={{ fontWeight: 600, fontSize: 16 }}>{text}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
