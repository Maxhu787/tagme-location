import { PointAnnotation, MarkerView } from "@maplibre/maplibre-react-native";
import React, { useRef, useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import AnimatedButton from "./AnimatedButton";

const test = [
  {
    id: 1,
    coordinates: [120.492021, 22.783503],
    image: "https://picsum.photos/id/664/1920/1080",
  },
  {
    id: 2,
    coordinates: [120.494519, 22.782503],
    image: "https://picsum.photos/id/664/1920/1080",
  },
  {
    id: 3,
    coordinates: [120.492319, 22.779233],
    image: "https://picsum.photos/id/664/1920/1080",
  },
  {
    id: 4,
    coordinates: [120.502319, 22.779233],
    image: "https://picsum.photos/id/664/1920/1080",
  },
  {
    id: 5,
    coordinates: [120.488521, 22.686551],
    image: "https://picsum.photos/id/664/1920/1080",
  },
];

const DisplayUsers = ({ setFollowing }) => {
  const [coordinates, setCoordinates] = useState(test);
  const markerRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates((prevCoordinates) =>
        prevCoordinates.map((item) => {
          const newCoordinates = [
            item.coordinates[0] + (Math.random() - 0.5) * 0.001,
            item.coordinates[1] + (Math.random() - 0.5) * 0.001,
          ];
          if (markerRefs.current[item.id]) {
            // setFollowing(false);
            markerRefs.current[item.id].refresh();
            // setFollowing(true);
          }
          return { ...item, coordinates: newCoordinates };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <AnimatedButton
        style={{
          width: 75,
          backgroundColor: "#fff",
          padding: 22,
          borderRadius: 18,
          shadowColor: "#000",
          elevation: 15,
        }}
        text="refresh"
      ></AnimatedButton> */}
      {coordinates.map((item) => (
        <PointAnnotation
          key={item.id}
          ref={(ref) => (markerRefs.current[item.id] = ref)}
          coordinate={item.coordinates}
          onSelected={() => console.log("onSelected")}
        >
          <View style={styles.markerContainer}>
            <Image
              source={require("../assets/hi.png")}
              // source={{ uri: item.image }}
              style={styles.image}
              onLoad={() => markerRefs.current?.[item.id]?.refresh()}
              fadeDuration={0}
            />
          </View>
        </PointAnnotation>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerContainer: {
    height: 54,
    width: 54,
  },
  image: { height: 54, width: 54, borderRadius: 1000 },
});

export default DisplayUsers;
