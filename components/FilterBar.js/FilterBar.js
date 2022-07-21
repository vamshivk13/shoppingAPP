import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SortList from "./SortList";

export default function FilterBar({ openModalOverLay, openFilterOverlay }) {
  return (
    <View style={styles.filterBar}>
      <SortList title="Sort" onPress={openModalOverLay} iconName="sort" />
      <SortList title="Filter" onPress={openFilterOverlay} iconName="filter" />
    </View>
  );
}
const styles = StyleSheet.create({
  filterBar: {
    flex: 1,
    flexDirection: "row",
  },
});
