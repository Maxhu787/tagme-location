import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedButton from "./AnimatedButton";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "One",
    description: "production build test 2025/4/8 07:10",
    image: "https://picsum.photos/id/667/1920/1080",
    // image: "https://placehold.co/1920x1080",
  },
  {
    id: "2",
    title: "Two",
    description: "lorem ipsum dolor sit amet",
    image: "https://picsum.photos/id/667/1920/1080",
    // image: "https://placehold.co/1920x1080",
  },
  {
    id: "3",
    title: "Three",
    description: "lore ipsum dolor sit amet",
    image: "https://picsum.photos/id/667/1920/1080",
    // image: "https://placehold.co/1920x1080",
  },
];

const OnboardingItem = ({ item }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width,
        alignItems: "center",
        padding: 35,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: width,
          // height: 540,
          height:
            Platform.OS === "ios" ? height / 1.45 + insets.top : height / 1.45,
          // borderBottomLeftRadius: 20,
          // borderBottomRightRadius: 20,
          marginTop: -20,
        }}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 20,
          color: "#000",
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          marginTop: 10,
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {item.description}
      </Text>
    </View>
  );
};

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
      // router.push("/(app)");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
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
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: Platform.OS === "ios" ? 100 : 90,
        }}
      >
        {slides.map((_, i) => (
          <Animated.View
            key={i}
            style={{
              width: indicators[i],
              height: 10,
              borderRadius: 5,
              backgroundColor: i === currentIndex ? "#ffa500" : "#ccc",
              margin: 5,
            }}
          />
        ))}
      </View>
      <AnimatedButton
        onPress={handleNext}
        style={{
          width: width - 40,
          height: 55,
          paddingVertical: 10,
          backgroundColor: "#ffa500",
          borderRadius: 5,
          alignItems: "center",
          bottom: Platform.OS === "ios" ? 60 : 40,
        }}
        buttonScale={0.85}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          {currentIndex == 2 ? "Get Started!" : "Next"}
        </Text>
      </AnimatedButton>
    </View>
  );
};

export default Bording;
