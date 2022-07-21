import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
export default function SortList({ onPress, title, iconName }) {
  return (
    <Pressable
      style={styles.sortView}
      onPress={onPress}
      android_ripple={{ color: "gray" }}
    >
      <View style={styles.iconNameView}>
        <FontAwesome name={iconName} size={20} color="#4780fc" />
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sortView: {
    padding: 14,
    backgroundColor: "white",
    elevation: 4,
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  iconNameView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
