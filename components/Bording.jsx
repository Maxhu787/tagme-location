import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router, useFocusEffect } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Screen 1",
    description: "lorem ipsum dolor sit amet",
    // image: "https://picsum.photos/300/300",
  },
  {
    id: "2",
    title: "Screen 2",
    description: "lorem ipsum dolor sit amet",
    // image: "https://picsum.photos/300/300",
  },
  {
    id: "3",
    title: "Screen 3",
    description: "lore ipsum dolor sit amet",
    // image: "https://picsum.photos/300/300",
  },
];

const OnboardingItem = ({ item }) => (
  <View
    style={{
      width,
      alignItems: "center",
      padding: 40,
      flex: 1,
    }}
  >
    <Image
      source={{ uri: item.image }}
      style={{
        width: width,
        height: 540,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        marginTop: -20,
      }}
    />
    <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
      {item.title}
    </Text>
    <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
      {item.description}
    </Text>
  </View>
);

const Bording = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flashListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const indicators = useRef(slides.map(() => new Animated.Value(10))).current;

  useFocusEffect(
    React.useCallback(() => {
      setCurrentIndex(0);
      animateIndicator(0);
      flashListRef.current?.scrollToIndex({ index: 0, animated: false });
    }, [])
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const animateIndicator = (index) => {
    indicators.forEach((indicator, i) => {
      Animated.timing(indicator, {
        toValue: i === index ? 20 : 10,
        duration: 100,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      animateIndicator(newIndex);
      flashListRef.current.scrollToIndex({ index: newIndex, animated: true });
    } else {
      router.push("/(auth)/signin");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlashList
        ref={flashListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={({ viewableItems }) => {
          const newIndex = viewableItems[0]?.index || 0;
          setCurrentIndex(newIndex);
          animateIndicator(newIndex);
        }}
        estimatedItemSize={width}
        renderItem={({ item }) => <OnboardingItem item={item} />}
      />
      <View style={{ flexDirection: "row", position: "absolute", bottom: 90 }}>
        {slides.map((_, i) => (
          <Animated.View
            key={i}
            style={{
              width: indicators[i],
              height: 10,
              borderRadius: 5,
              backgroundColor: i === currentIndex ? "black" : "gray",
              margin: 5,
            }}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={handleNext}
        style={{
          width: width - 40,
          paddingVertical: 10,
          backgroundColor: "#000",
          borderRadius: 5,
          alignItems: "center",
          bottom: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {currentIndex == 2 ? "Get Started!" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bording;
