import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function CategoryItem({ dataItem }) {
  const navigation = useNavigation();
  function handleCategorySelection() {
    navigation.navigate("CategoryOverview", { dataItem });
  }
  return (
    <View style={styles.topContainer}>
      <Pressable
        onPress={handleCategorySelection}
        android_ripple={{ color: "gray" }}
      >
        <View style={styles.categoryItemContainer}>
          <Image
            style={styles.thumbnail}
            source={{ uri: dataItem.thumbnail }}
          ></Image>
        </View>
        <View style={styles.categoryText}>
          <Text style={styles.textCat}>{dataItem.category}</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  topContainer: {
    width: 100,
    height: 120,
    margin: 10,
    overflow: "hidden",
  },
  textCat: { textAlign: "center", fontSize: 13 },
  categoryText: {},
  categoryItemContainer: {
    alignItems: "center",
  },
  thumbnail: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
});
