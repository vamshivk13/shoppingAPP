import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { globalActions } from "../store/store";

export default function ProductIdView({ prodDetails }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleOpenRecentlyViewed() {
    navigation.navigate("ProductOverView", { dataItem: prodDetails });
    dispatch(globalActions.setRecentlyVisitedProducts(prodDetails.id));
  }

  return (
    <>
      <Pressable
        onPress={handleOpenRecentlyViewed}
        style={styles.recentItem}
        android_ripple={{ color: "#bdeefc" }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.recentProdImage}
            source={{ uri: prodDetails.thumbnail }}
          ></Image>
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.prodDetailText}
        >
          {prodDetails.title}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  recentItem: {
    height: 180,
    width: 200,
    flex: 1,
    elevation: 4,
    backgroundColor: "white",
    marginVertical: 4,
    marginHorizontal: 4,
  },
  imageContainer: {
    width: "100%",
    height: "85%",
    padding: 5,

    resizeMode: "contain",
  },
  prodDetailText: {
    fontWeight: "normal",
    fontSize: 14,
    textAlign: "center",
  },
  recentProdImage: {
    width: "100%",
    height: "100%",
  },
  recentlyVisitedContainer: {
    padding: 10,
    elevation: 9,
    marginVertical: 10,
    backgroundColor: "white",
  },
});
