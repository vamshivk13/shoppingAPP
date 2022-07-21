import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function FilterTypeElement({ type, isSelected, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.filterElement,
          isSelected && { backgroundColor: "#05b1e6" },
        ]}
      >
        <Text style={styles.filterElementText}>{type}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filterElement: {
    padding: 10,
    alignItems: "center",
    margin: 5,
  },
  filterElementText: {
    fontWeight: "bold",
  },
});
