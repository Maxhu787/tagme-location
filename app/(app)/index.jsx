import {
  MarkerView,
  MapView,
  Camera,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";
import React, { useRef } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

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
  const handlePress = (id) => {
    console.log(`Marker ${id} pressed`);
  };
  const markerRef = useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        style={styles.map}
      >
        <Camera zoomLevel={12} centerCoordinate={test[0].coordinates} />

        {test.map((item) => (
          <PointAnnotation
            ref={markerRef}
            coordinate={item.coordinates}
            // onSelected={() => centerOnMarker(vehicle)}
          >
            {/* <View style={{ height: 75, width: 75 }}>
              <Image
                source={require("../../assets/icon.png")}
                style={{ height: 54, width: 43.5 }}
                // onLoad={() => markerRef.refresh()}
              />
            </View> */}
          </PointAnnotation>
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
