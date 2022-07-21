import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function GlobalSearchInput() {
  const navigation = useNavigation();
  function navigateToSearch() {
    navigation.navigate("GlobalSearchScreen");
  }
  return (
    <Pressable onFocus={navigateToSearch} onPress={navigateToSearch}>
      <View style={styles.globalSearchContainer}>
        <View style={styles.globalSearchTextInp}></View>
        <View style={styles.searchButton}>
          <Ionicons name="md-search" size={24} color="blue"></Ionicons>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  globalSearchTextInp: {
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginLeft: 10,
    flex: 1,
    backgroundColor: "#fcf2f5",
  },
  globalSearchContainer: {
    flexDirection: "row",
  },
});
