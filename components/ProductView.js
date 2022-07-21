import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PriceDetailBar from "./PriceDetailBar";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/store";
import { addRecentlyVisited } from "../Backend/auth-api";
export default function ProductView({ dataItem }) {
  const navigation = useNavigation();
  const recentlyVisited = useSelector(
    (state) => state.globalReducer.recentlyVisitedItems
  );
  const dispatch = useDispatch();
  async function addToRecentlyVisited() {
    dispatch(globalActions.setRecentlyVisitedProducts(dataItem.id));
  }
  function handleProductViewClick() {
    navigation.navigate("ProductOverView", { dataItem });
    addToRecentlyVisited(dataItem);
    //handle recently visited items here
  }
  return (
    <View style={styles.topContainer}>
      <Pressable
        android_ripple={{ color: "gray" }}
        onPress={handleProductViewClick}
      >
        <View style={styles.productViewContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.previewThumbnail}
              source={{ uri: dataItem.thumbnail }}
            ></Image>
          </View>
          <View>
            <View style={styles.productTitleView}>
              <Text style={styles.productTitle}>{dataItem.title}</Text>
            </View>
            <PriceDetailBar dataItem={dataItem} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    overflow: "hidden",
    maxHeight: 200,
    elevation: 1,
    margin: 4,
    backgroundColor: "white",
  },
  productViewContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    padding: 5,
  },

  productTitle: {
    fontSize: 18,
    padding: 5,
    fontWeight: "bold",
  },

  previewThumbnail: {
    width: 100,
    height: 100,
    backgroundColor: "#e6e7e8",
    resizeMode: "contain",
  },
});

// (price/x)*100=(100-per);
// 100price =100x-per(x);
// 100*price/(100-per) = x
