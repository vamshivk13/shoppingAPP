import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PriceDetailBar from "./PriceDetailBar";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { globalActions } from "../store/store";
import AddCartButtons from "../UI/AddCartButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCartItemQuantity } from "../Backend/auth-api";
import { updateSavedItems } from "../Backend/auth-api";

export default function CheckoutItem({ dataItem }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  function handleProductViewClick() {
    navigation.navigate("ProductOverView", { dataItem });
  }
  //handle
  function incrementCartItem() {
    console.log("Inc");
    dispatch(globalActions.incrementCheckoutItem(dataItem));
  }
  //handle
  function decrementCartItem() {
    if (dataItem.quantity == 1) {
      return;
    }
    if (dataItem.quantity > 1) {
      dispatch(globalActions.decrementCheckoutItem(dataItem));
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.previewThumbnail}
            source={{ uri: dataItem.thumbnail }}
          ></Image>
          <View style={styles.quantityBar}>
            <Pressable onPress={incrementCartItem}>
              <Ionicons name="add-outline" size={20} color="black" />
            </Pressable>
            <Text>{dataItem.quantity}</Text>
            <Pressable onPress={decrementCartItem}>
              <Ionicons name="remove" size={20} color="black" />
            </Pressable>
          </View>
        </View>

        <Pressable
          android_ripple={{ color: "gray" }}
          onPress={handleProductViewClick}
          style={styles.productTitleView}
        >
          <View>
            <Text style={styles.productTitle}>{dataItem.title}</Text>
          </View>
          <View style={styles.productRating}>
            <Text style={styles.productRatingText}>{dataItem.rating}</Text>
            <Ionicons name="star" size={12} color="#f7b90f"></Ionicons>
          </View>
          <PriceDetailBar dataItem={dataItem} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    overflow: "hidden",
    maxHeight: 200,
    backgroundColor: "white",
    flexDirection: "row",
  },
  Container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  imageContainer: {
    padding: 5,
  },
  quantityBar: {
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  productTitle: {
    fontSize: 18,
    padding: 5,
    fontWeight: "bold",
  },
  productTitleView: { flex: 1 },
  previewThumbnail: {
    width: 100,
    height: 100,
    backgroundColor: "#e6e7e8",
    resizeMode: "contain",
  },
  productRatingText: {
    fontWeight: "bold",
    fontSize: 13,
    padding: 5,
  },
  productRating: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
