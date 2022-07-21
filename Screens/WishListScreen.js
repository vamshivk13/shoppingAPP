import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductListScreen from "./ProductListScreen";

export default function WishListScreen() {
  const wishList = useSelector((state) => state.globalReducer.wishListItems);
  return (
    <View style={styles.wishListContainer}>
      <ProductListScreen customListItems={wishList} />
    </View>
  );
}
const styles = StyleSheet.create({
  wishListContainer: {
    padding: 10,
  },
});
