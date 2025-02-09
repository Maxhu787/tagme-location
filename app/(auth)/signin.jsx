import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Auth from "../../components/Auth";

export default Signin = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
        }}
      >
        (Sign in)
      </Text>
      <Auth />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
