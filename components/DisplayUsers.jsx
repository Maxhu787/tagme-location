import {
  MapView,
  Camera,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";
import React, { useRef } from "react";
import { View, Image, StyleSheet } from "react-native";

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

const DisplayUsers = () => {
  const markerRefs = useRef({});

  return (
    <>
      {test.map((item) => (
        <PointAnnotation
          key={item.id}
          ref={(ref) => (markerRefs.current[item.id] = ref)}
          coordinate={item.coordinates}
        >
          <View style={styles.markerContainer}>
            <Image
              source={require("../assets/hi.png")}
              // source={{ uri: item.image }}
              style={styles.image}
              onLoad={() => markerRefs.current[item.id]?.refresh()}
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
