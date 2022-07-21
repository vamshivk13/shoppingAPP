import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function AddCartButtons({
  onPress,
  textStyle,
  children,
  color,
  rippleColor,
}) {
  return (
    <Pressable
      style={[styles.buttonContainer, color]}
      onPress={onPress}
      android_ripple={{
        color: rippleColor != undefined ? rippleColor.color : "white",
      }}
    >
      <View style={[styles.buttonTop]}>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonTop: {},
  buttonContainer: {
    flex: 1,

    alignItems: "center",
    height: 50,
    padding: 12,
    marginTop: 10,

    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
