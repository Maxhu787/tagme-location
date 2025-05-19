import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Camera,
  MapView,
  ShapeSource,
  CircleLayer,
} from "@maplibre/maplibre-react-native";

const circleLayerStyle = {
  circleRadius: 20,
  circleColor: "#007afe",
};

export default function MapTest() {
  const center = [2.31683, 48.85884]; // center of circular motion
  const radius = 0.05; // ~5km
  const interval = 1000; // milliseconds

  const [shape, setShape] = useState({
    type: "Point",
    coordinates: center,
  });

  useEffect(() => {
    let angle = 0;
    const intervalId = setInterval(() => {
      const rad = (angle * Math.PI) / 180;
      const lng = center[0] + radius * Math.cos(rad);
      const lat = center[1] + radius * Math.sin(rad);
      setShape({
        type: "Point",
        coordinates: [lng, lat],
      });
      angle = (angle + 10) % 360;
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
      >
        <Camera centerCoordinate={center} zoomLevel={12} />
        <ShapeSource id="circle-shape" shape={shape}>
          <CircleLayer id="circle-layer" style={circleLayerStyle} />
        </ShapeSource>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
