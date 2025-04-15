import { useMemo, useCallback, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

const keyExtractor = (item) => item;

export default function FriendsBottomSheet({
  openBottomSheet,
  setOpenBottomSheet,
}) {
  useEffect(() => {
    if (openBottomSheet) {
      // sheetRef.current?.expand();
      sheetRef.current?.snapToIndex(0);
      setOpenBottomSheet(false);
    }
  }, [openBottomSheet]);

  const sheetRef = useRef(null);
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["40%", "80%"], []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        backgroundColor: "#ccc",
        width: 60,
        height: 6,
        borderRadius: 3,
        marginTop: 8,
      }}
      backgroundStyle={{ backgroundColor: "white" }}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
    >
      <BottomSheetFlashList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={50}
      />
      <BottomSheetTextInput
        backgroundColor={"#aaa"}
        style={{
          borderRadius: 10,
          fontSize: 18,
          padding: 12,
          paddingLeft: 18,
          color: "#fff",
          marginHorizontal: 12,
          marginVertical: 8,
        }}
        placeholderTextColor={"#eee"}
        placeholder="Enter username"
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
