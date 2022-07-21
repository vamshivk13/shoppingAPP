import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductImageCarousal from "../UI/ImageCarousal/ProductImageCarousal";
import PriceDetailBar from "../components/PriceDetailBar";
import CustomButton from "../UI/CustomButton";
import ProductDescriptionDetails from "../components/ProductDescriptionDetails";
import AddCartButtons from "../UI/AddCartButtons";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/store";
import { addCartItems } from "../Backend/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addRemoveWishListItem } from "../Backend/auth-api";
import { updateSavedItems } from "../Backend/auth-api";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function ProductOverViewScreen({ navigation, route }) {
  const productDetails = route.params.dataItem;
  const cartItems = useSelector((state) => state.globalReducer.cartItems);
  const userDetails = useSelector((state) => state.globalReducer.userDetails);
  const wishListItems = useSelector(
    (state) => state.globalReducer.wishListItems
  );
  const notificationListener = useRef();
  const responseListener = useRef();

  const [isinCart, setIsInCart] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);
  const dispatch = useDispatch();
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello " + userDetails.userName,
        body: "Item SuccessFully Added to WishList",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }
  useEffect(() => {
    const isinCart = cartItems.findIndex(
      (item) => item.id == productDetails.id
    );
    if (isinCart >= 0) {
      setIsInCart(true);
    }
  }, [handleAddToCart]);
  useEffect(() => {
    const isinWishList = wishListItems.findIndex(
      (item) => item.id == productDetails.id
    );
    if (isinWishList >= 0) {
      setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [addToWishList]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.navigate("WishList");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function handleRemoveItem() {
    dispatch(globalActions.removeSaveToLaterItems(productDetails));
    const curUserId = await AsyncStorage.getItem("curUser");
    const savedProduct = {
      toRemove: true,
      productId: productDetails.id,
      savedItemId: productDetails.id + curUserId,
      userId: curUserId,
      quantity: productDetails.quantity,
    };
    await updateSavedItems(savedProduct);
  }
  async function handleAddToCart() {
    //AddToCart- Dispatch action to add to cart Array.
    await handleRemoveItem();
    dispatch(globalActions.setCartItems(productDetails));
    const curUserId = await AsyncStorage.getItem("curUser");
    addCartItems({
      cartItemId: curUserId + productDetails.id,
      productId: productDetails.id,
      quantity: 1,
    });
    // dispatch(globalActions.setTotalCartAmount(productDetails));
  }
  function handleGoToCart() {
    navigation.navigate("Cart");
  }
  function handleBuyProduct() {
    dispatch(globalActions.setCheckoutItems([productDetails]));
    navigation.navigate("Order Summary");
  }
  async function addToWishList() {
    const curUserId = await AsyncStorage.getItem("curUser");
    let isinlist = false;
    if (!isInWishList) {
      isinlist = true;
      dispatch(globalActions.setWishListItem(productDetails));
      await schedulePushNotification();
    } else {
      isinlist = false;
      dispatch(globalActions.removeWishListItem(productDetails));
    }
    await addRemoveWishListItem({
      wishListItemId: curUserId + productDetails.id,
      productId: productDetails.id,
      isInWishList: isinlist,
      userId: curUserId,
    });
  }
  return (
    <SafeAreaView>
      <View style={styles.productOverviewSeperator}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.productOverViewContainer}>
            <View style={styles.productHeader}>
              <Text style={styles.brandText}>
                Brand: {productDetails.brand}
              </Text>
              <View style={styles.productRating}>
                <Text style={styles.productRatingText}>
                  {productDetails.rating}
                </Text>
                <Ionicons name="star" size={12} color="#f7b90f"></Ionicons>
              </View>
            </View>
            <Text style={styles.prodDesc}>{productDetails.title}</Text>
            <View style={styles.imageCarousalContainer}>
              <View style={styles.wishListIcon}>
                <Pressable
                  android_ripple={{ color: "red" }}
                  style={styles.wishListIconContainer}
                  onPress={addToWishList}
                >
                  <Ionicons
                    name="heart"
                    size={35}
                    color={isInWishList ? "red" : "#c2c1c0"}
                  />
                </Pressable>
              </View>
              <ProductImageCarousal dataItem={productDetails} />
            </View>
            <View style={styles.priceBar}>
              <PriceDetailBar dataItem={productDetails} />
            </View>
          </View>
          <ProductDescriptionDetails dataItem={productDetails} />
          {isinCart && <Text>Yes</Text>}
        </ScrollView>
        <View style={styles.buttonHolder}>
          {isinCart && (
            <AddCartButtons
              onPress={handleGoToCart}
              color={{ backgroundColor: "gray" }}
            >
              GO TO CART
            </AddCartButtons>
          )}
          {!isinCart && (
            <AddCartButtons
              onPress={handleAddToCart}
              color={{ backgroundColor: "gray" }}
            >
              ADD TO CART
            </AddCartButtons>
          )}
          <AddCartButtons
            onPress={handleBuyProduct}
            color={{ backgroundColor: "#2344fc" }}
          >
            BUY NOW
          </AddCartButtons>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productOverViewContainer: {
    borderTopWidth: 2,
    borderColor: "#c1c2be",
    borderBottomWidth: 2,
    marginTop: 20,
    padding: 10,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandText: { color: "#183df5" },
  productRatingText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  productRating: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  prodDesc: {
    paddingTop: 4,
    fontSize: 13,
  },
  priceBar: {
    marginTop: 10,
  },
  productOverviewSeperator: {
    height: "100%",
    justifyContent: "space-around",
  },
  buttonHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageCarousalContainer: {
    position: "relative",
  },
  wishListIconContainer: {},
  wishListIcon: {
    zIndex: 1,
    alignSelf: "flex-end",
    top: 20,
    flex: 1,

    position: "absolute",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#e3e2de",
    overflow: "hidden",
    right: 20,
  },
});
