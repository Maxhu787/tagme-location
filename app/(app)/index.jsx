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
    coordinates: [-122.4324, 37.78825],
    image: "https://picsum.photos/id/664/1920/1080",
  },
  {
    id: 2,
    coordinates: [-122.4364, 37.78125],
    image: "https://picsum.photos/id/664/1920/1080",
  },
];

const MapScreen = () => {
  const markerRefs = useRef({});

  return (
    <View style={styles.container}>
      <MapView
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        style={styles.map}
      >
        <Camera zoomLevel={12} centerCoordinate={test[0].coordinates} />

        {test.map((item) => (
          <PointAnnotation
            key={item.id}
            ref={(ref) => (markerRefs.current[item.id] = ref)}
            coordinate={item.coordinates}
          >
            <View style={styles.markerContainer}>
              <Image
                // source={require("../../assets/icon.png")}
                source={{ uri: "https://picsum.photos/id/664/1920/1080" }}
                style={styles.image}
                onLoad={() => markerRefs.current[item.id]?.refresh()}
              />
            </View>
          </PointAnnotation>
        ))}
      </MapView>
    </View>
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

export default MapScreen;
