import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CategoryItem from "../components/CategoryItem";

export default function Categories() {
  const allCategories = useSelector((state) => state.globalReducer.categories);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.homePageContainer}>
        <FlatList
          data={allCategories}
          renderItem={(dataItem) => {
            return <CategoryItem dataItem={dataItem.item} />;
          }}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => {
            return (
              <View style={styles.headerView}>
                <Text style={styles.headerText}>All Categories</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#e6fcff",
  },
  homePageContainer: {
    marginTop: 20,
    width: "100%",

    alignItems: "center",
    backgroundColor: "#e6fcff",
  },
  headerText: {
    fontSize: 20,
  },
  headerView: {
    padding: 10,
  },
});
