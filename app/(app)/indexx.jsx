import {
  Images,
  SymbolLayer,
  ShapeSource,
  MapView,
  Camera,
} from "@maplibre/maplibre-react-native";
import React from "react";
import { View, StyleSheet } from "react-native";

const test = [
  {
    coordinates: [-122.4324, 37.78825],
    image: "https://picsum.photos/24/24",
  },
  {
    coordinates: [-122.4364, 37.78125],
    image: "https://picsum.photos/24/24",
  },
  {
    coordinates: [-122.4424, 37.78425],
    image: "https://picsum.photos/24/24",
  },
  {
    coordinates: [-122.4484, 37.78625],
    image: "https://picsum.photos/24/24",
  },
  {
    coordinates: [-122.4524, 37.79025],
    image: "https://picsum.photos/24/24",
  },
];

const MapScreen = () => {
  const geoJsonData = {
    type: "FeatureCollection",
    features: test.map((item, index) => ({
      type: "Feature",
      id: index,
      geometry: {
        type: "Point",
        coordinates: item.coordinates,
      },
      properties: {
        icon: `icon-${index}`, // Unique key for each image
      },
    })),
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera zoomLevel={12} centerCoordinate={test[0].coordinates} />

        {test.map((item, index) => (
          <Images key={index} images={{ [`icon-${index}`]: item.image }} />
        ))}

        <ShapeSource id="points" shape={geoJsonData}>
          <SymbolLayer
            id="symbols"
            style={{
              iconImage: ["get", "icon"],
              iconSize: 0.5,
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;
