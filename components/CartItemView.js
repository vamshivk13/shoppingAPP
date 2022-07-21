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

export default function CartItemView({ dataItem }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  function handleProductViewClick() {
    navigation.navigate("ProductOverView", { dataItem });
  }
  async function incrementCartItem() {
    dispatch(globalActions.incrementCartItem(dataItem));
    const curUserId = await AsyncStorage.getItem("curUser");
    updateCartItemQuantity({
      cartItemId: curUserId + dataItem.id,
      productId: dataItem.id,
      quantity: dataItem.quantity + 1,
    });
  }
  async function decrementCartItem() {
    const curUserId = await AsyncStorage.getItem("curUser");
    if (dataItem.quantity == 1) {
      dispatch(globalActions.removeCartItem(dataItem));
      updateCartItemQuantity({
        cartItemId: curUserId + dataItem.id,
        productId: dataItem.id,
        quantity: dataItem.quantity - 1,
      });
      return;
    }
    if (dataItem.quantity > 1) {
      dispatch(globalActions.decrementCartItem(dataItem));
      updateCartItemQuantity({
        cartItemId: curUserId + dataItem.id,
        productId: dataItem.id,
        quantity: dataItem.quantity - 1,
      });
    }
  }
  async function handleRemoveItem() {
    dispatch(globalActions.removeCartItem(dataItem));
    const curUserId = await AsyncStorage.getItem("curUser");
    updateCartItemQuantity({
      cartItemId: curUserId + dataItem.id,
      productId: dataItem.id,
      quantity: 0,
    });
  }
  async function handleSaveToLater() {
    setIsSaving(true);
    dispatch(globalActions.setSaveToLaterItems(dataItem));
    const curUserId = await AsyncStorage.getItem("curUser");
    const savedProduct = {
      toRemove: false,
      productId: dataItem.id,
      savedItemId: dataItem.id + curUserId,
      userId: curUserId,
      quantity: dataItem.quantity,
    };
    await updateSavedItems(savedProduct);
    setIsSaving(false);
    handleRemoveItem();

    //database part
  }
  if (isSaving) {
    return <ActivityIndicator></ActivityIndicator>;
  } else
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
          <View></View>
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
        <View style={styles.removeButtonContainer}>
          <AddCartButtons
            color={{
              marginTop: 0,
              height: 40,
              backgroundColor: "white",
              borderRightColor: "gray",
              borderRightWidth: 0.6,
            }}
            textStyle={{ color: "black", fontWeight: "normal" }}
            rippleColor={{ color: "gray" }}
            onPress={handleSaveToLater}
          >
            Save for later
          </AddCartButtons>
          <AddCartButtons
            color={{ marginTop: 0, height: 40, backgroundColor: "white" }}
            textStyle={{ color: "black", fontWeight: "normal" }}
            rippleColor={{ color: "gray" }}
            onPress={handleRemoveItem}
          >
            Remove Item
          </AddCartButtons>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  Container: { marginVertical: 4 },
  removeButtonContainer: {
    flexDirection: "row",
    backgroundColor: "gray",
    elevation: 10,
  },
  topContainer: {
    overflow: "hidden",
    maxHeight: 200,
    backgroundColor: "white",

    flexDirection: "row",
  },
  productViewContainer: {},
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
