import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function Input({ label, style, ...inputConfig }) {
  const styleCustomized = [styles.inputContainer];
  if (style) {
    styleCustomized.push(style);
  }

  return (
    <View style={styleCustomized}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        autoComplete="email"
        style={styles.TextIn}
        {...inputConfig}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    padding: 5,
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 5,
  },
  TextIn: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 8,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
