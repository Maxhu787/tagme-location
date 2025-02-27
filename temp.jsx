export default temp = () => {
  return (
    <>
      <ShapeSource
        id="myShapeSource"
        shape={{
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [
                  location.coords.longitude - 0.001,
                  location.coords.latitude - 0.001,
                ],
              },
              properties: {
                title: "Current Location",
              },
            },
          ],
        }}
      >
        <CircleLayer
          id="circleLayer"
          style={{
            circleRadius: 9,
            circleColor: "#fff",
            circleOpacity: 1,
            circleStrokeWidth: 5,
            circleStrokeColor: "#fd572e",
          }}
        />
      </ShapeSource>
      <PointAnnotation
        coordinate={[
          location.coords.longitude + 0.001,
          location.coords.latitude + 0.001,
        ]}
        selected={false}
        draggable={false}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            backgroundColor: "#ffa500",
            borderWidth: 4,
            borderColor: "#000",
          }}
        />
      </PointAnnotation>
    </>
  );
};
