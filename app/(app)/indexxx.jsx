import { MarkerView, MapView, Camera } from "@maplibre/maplibre-react-native";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const test = [
  {
    coordinates: [-122.4324, 37.78825],
    image: "https://picsum.photos/id/664/1920/1080",
  },
  {
    coordinates: [-122.4364, 37.78125],
    image: "https://picsum.photos/id/664/1920/1080",
  },
];

const MapScreen = () => {
  const handlePress = (index) => {
    console.log(`Marker ${index} pressed`);
  };

  return (
    <View style={styles.container}>
      <MapView
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        style={styles.map}
      >
        <Camera zoomLevel={12} centerCoordinate={test[0].coordinates} />

        {test.map((item, index) => (
          <MarkerView key={index} coordinate={item.coordinates}>
            <TouchableOpacity onPress={() => handlePress(index)}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
          </MarkerView>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default MapScreen;
