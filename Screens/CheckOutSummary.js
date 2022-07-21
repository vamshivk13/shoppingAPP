import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemView from "../components/CartItemView";
import CheckoutItem from "../components/CheckoutItem";
import PriceDetailBar from "../components/PriceDetailBar";
import AddCartButtons from "../UI/AddCartButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalActions } from "../store/store";
import { updateCartItemQuantity } from "../Backend/auth-api";
import { addOrderedItems } from "../Backend/auth-api";
import { ActivityIndicator } from "react-native-paper";
export default function CheckOutSummary({ navigation, route }) {
  const dispatch = useDispatch();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const checkoutItems = useSelector(
    (state) => state.globalReducer.checkoutItems
  );
  const totalCheckoutDetails = useSelector(
    (state) => state.globalReducer.totalCheckoutDetails
  );
  async function handleRemoveItem(dataItem, curUserId) {
    dispatch(globalActions.removeCartItem(dataItem));
    updateCartItemQuantity({
      cartItemId: curUserId + dataItem.id,
      productId: dataItem.id,
      quantity: 0,
    });
  }
  async function handlePlaceOrder() {
    //remove exisiting cart items
    setIsPlacingOrder(true);
    const curUserId = await AsyncStorage.getItem("curUser");
    const orderedItems = [];
    checkoutItems.forEach((item) => {
      handleRemoveItem(item, curUserId);
      orderedItems.push({ productId: item.id, quantity: item.quantity });
    });

    const orderDetails = {
      userId: curUserId,
      orderedItems: orderedItems,
    };
    await addOrderedItems(orderDetails);
    setIsPlacingOrder(false);
    Alert.alert("Order Status", "Order Placed Successfully");
    navigation.navigate("Cart");
    //update /post order items to firebase
  }
  return (
    <>
      {isPlacingOrder && (
        <ActivityIndicator style={styles.loading}></ActivityIndicator>
      )}
      <View style={styles.orderSummaryScreen}>
        <View>
          <FlatList
            data={checkoutItems}
            renderItem={(dataItem) => {
              return <CheckoutItem dataItem={dataItem.item} />;
            }}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => {
              return (
                <View style={styles.priceDetails}>
                  <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                    Price Details
                  </Text>
                  <View style={styles.detailItem}>
                    <Text>Total Price</Text>
                    <Text>
                      ₹
                      {checkoutItems.length == 1
                        ? Math.round(
                            (100 * checkoutItems[0].price) /
                              (100 - checkoutItems[0].discountPercentage)
                          )
                        : totalCheckoutDetails.totalAmount +
                          totalCheckoutDetails.totalDiscount}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text>Total Discount</Text>
                    <Text>
                      ₹
                      {checkoutItems.length == 1
                        ? Math.round(
                            (100 * checkoutItems[0].price) /
                              (100 - checkoutItems[0].discountPercentage)
                          ) - checkoutItems[0].price
                        : totalCheckoutDetails.totalDiscount}
                    </Text>
                  </View>
                  <View style={styles.totalAmount}>
                    <Text>Total Amount</Text>
                    <Text>
                      ₹
                      {checkoutItems.length == 1
                        ? checkoutItems[0].price
                        : totalCheckoutDetails.totalAmount}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.checkoutBar}>
          <View style={styles.finalAmount}>
            <Text
              style={{
                fontSize: 15,
                color: "#096103",
                margin: 3,
              }}
            >
              ₹
            </Text>
            <Text style={{ fontSize: 25 }}>
              {totalCheckoutDetails.totalAmount}
            </Text>
          </View>
          <AddCartButtons
            onPress={handlePlaceOrder}
            color={{ ...styles.checkoutButton }}
          >
            Place Order
          </AddCartButtons>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  orderSummaryScreen: {
    backgroundColor: "white",
    justifyContent: "space-between",
    flex: 1,
  },
  finalAmount: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  checkoutBar: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ebedeb",
    borderTopColor: "#c5c7c5",
    borderTopWidth: 1,
  },
  checkoutButton: {
    backgroundColor: "#fc9208",
    flex: 0.4,
    marginTop: 5,
    height: 45,
    margin: 5,
  },
  priceDetails: {
    padding: 10,
    marginVertical: 20,
    backgroundColor: "white",
    elevation: 10,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  totalAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginTop: 10,
    borderTopColor: "gray",
    borderTopWidth: 0.7,
    paddingVertical: 10,
  },
  loading: {
    position: "absolute",
    alignSelf: "center",
  },
});
