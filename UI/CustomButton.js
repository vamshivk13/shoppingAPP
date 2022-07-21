import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function CustomButton({ onPress, children }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress}>
        <Text style={{ color: "black", fontWeight: "bold" }}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#c4c4c2",
    borderRadius: 30,

    padding: 10,
    marginTop: 10,
    justifyContent: "center",
  },
});
