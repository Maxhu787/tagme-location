import { router, Stack } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import AnimatedButton from "../../../components/AnimatedButton";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "../../../contexts/UserContext";
import { supabase } from "../../../utils/supabase";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [fetchData, setFetchData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const fetch = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          setFetchData(false); // No profile found
        }
        console.log("Error checking profile:", error);
        setFetchData(false); // Unexpected error
      } else {
        setFetchData(data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const handleEdit = (field, value) => {
    router.push({
      pathname: `/(app)/(profile)/editfield`,
      params: { field: field, value: value },
    });
  };

  if (fetchData === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Oops!",
          }}
        />
        <Text style={{ fontSize: 30 }}>Oops!</Text>
        <Text
          style={{
            fontSize: 23,
            color: "#666",
            textAlign: "center",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          Something went wrong while fetching your profile data.
        </Text>
      </View>
    );
  } else if (fetchData === null) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      </>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetch();
              }}
            />
          }
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <AnimatedButton
              buttonScale={0.9}
              onPress={() =>
                handleEdit("profile_picture", fetchData.profile_picture)
              }
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <Image
                  alt=""
                  source={{ uri: fetchData.profile_picture }}
                  style={{ height: 40, width: 40, borderRadius: 100 }}
                />
              </View>
              <Text style={styles.rowLabel}>Profile picture</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>
                {fetchData.profile_picture.length > 25
                  ? fetchData.profile_picture.substring(0, 25 - 3) + "..."
                  : mytextvar}
              </Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => handleEdit("username", fetchData.username)}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <FeatherIcon color="#fff" name="user" size={20} />
              </View>
              <Text style={styles.rowLabel}>Username</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.username}</Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => handleEdit("name", fetchData.name)}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <Image
                  alt=""
                  source={require("../../../assets/4.png")}
                  style={{ height: 50, width: 50 }}
                />
              </View>
              <Text style={styles.rowLabel}>Name</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.name}</Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => handleEdit("bio", fetchData.bio)}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <Image
                  alt=""
                  source={require("../../../assets/1.png")}
                  style={{ height: 50, width: 50 }}
                />
              </View>
              <Text style={styles.rowLabel}>Bio</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.bio}</Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => handleEdit("website", fetchData.website)}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
                <MaterialCommunityIcons name="web" size={20} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Website</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.website}</Text>
            </AnimatedButton>

            <AnimatedButton
              buttonScale={0.9}
              onPress={() => handleEdit("country", fetchData.country)}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="map-pin" size={20} />
              </View>
              <Text style={styles.rowLabel}>Country</Text>
              <View style={styles.rowSpacer} />
              <Text style={styles.rowValue}>{fetchData.country}</Text>
            </AnimatedButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    padding: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "300",
    color: "#616161",
  },
  rowSpacer: {
    flexGrow: 1,
  },
});
