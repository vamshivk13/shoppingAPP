import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import ImageCarousal from "../UI/ImageCarousal/ImageCarousal";
import GlobalSearchInput from "../UI/GlobalSearch/GlobalSearchInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { carousal_images } from "../data/images";
import { getAllCartItems } from "../Backend/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { globalActions } from "../store/store";
import { getAllSavedItems } from "../Backend/auth-api";
import RecentlyVisitedProducts from "../components/RecentlyVisitedProducts";
import { getAllWishListItems } from "../Backend/auth-api";
import { getAllRecentItems } from "../Backend/auth-api";
// import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";

import MostDiscountedProducts from "../components/MostDiscountedProducts";
export default function HomePage() {
  const dispatch = useDispatch();
  const products_api = "https://dummyjson.com/products?limit=100";

  useEffect(() => {
    async function getIntialData() {
      const curUserId = await AsyncStorage.getItem("curUser");
      const allCartItems = await getAllCartItems(curUserId);
      const allSavedItems = await getAllSavedItems(curUserId);
      const allWishListItems = await getAllWishListItems(curUserId);
      const allRecentItems = await getAllRecentItems(curUserId);
      dispatch(globalActions.setInitialCartItems(allCartItems));
      dispatch(globalActions.setInitialSavedItems(allSavedItems));
      dispatch(globalActions.setInitialWishListItems(allWishListItems));
      dispatch(globalActions.setRecentlyVisitedProducts(allRecentItems));
    }
    async function getInitialDetails() {
      const response = await axios.get(products_api);
      dispatch(globalActions.setAllProductsData(response.data.products));
      getIntialData();
    }
    getInitialDetails();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.homePageContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchBarSticky}>
            <GlobalSearchInput />
          </View>
          <ImageCarousal carousal_images={carousal_images} />
          <RecentlyVisitedProducts title="Recently Visited" />
          <MostDiscountedProducts />
        </ScrollView>
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
    backgroundColor: "#e6fcff",
  },
});
