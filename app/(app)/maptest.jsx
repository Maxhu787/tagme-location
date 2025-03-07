import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import AnimatedButton from "../../components/AnimatedButton";
import { Camera, MapView, MarkerView } from "@maplibre/maplibre-react-native";

export default function MapTest() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <MapView
        style={{ flex: 1 }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
      >
        <Camera centerCoordinate={[2.31683, 48.85884]} zoomLevel={5} />
        <MarkerView coordinate={[2.31683, 48.85884]}>
          <TouchableOpacity style={styles.marker}>
            <Text>Test</Text>
          </TouchableOpacity>
        </MarkerView>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 50,
    width: 120,
    borderRadius: 12,
    backgroundColor: "#ffa500",
    justifyContent: "center",
    alignItems: "center",
  },
});
