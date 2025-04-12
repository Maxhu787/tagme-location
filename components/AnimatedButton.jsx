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
  onPressIn,
  buttonScale = 0.75,
  children,
  textColor = "#fff",
}) {
  const scaleButton = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleButton.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={style}
        activeOpacity={1}
        onPressIn={() => {
          scaleButton.value = withSpring(buttonScale, {
            stiffness: 300,
            damping: 15,
          });
          if (onPressIn) onPressIn();
        }}
        onPressOut={() =>
          (scaleButton.value = withSpring(1, {
            stiffness: 150,
            damping: 10,
          }))
        }
        onPress={() => {
          if (onPress) onPress();
        }}
      >
        {children ? (
          children
        ) : (
          <Text style={{ fontWeight: 600, fontSize: 16, color: textColor }}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
