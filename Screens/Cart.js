import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  StatusBar,
  SectionList,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CartItemView from "../components/CartItemView";
import AddCartButtons from "../UI/AddCartButtons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SaveForLaterItem from "../components/SaveForLaterItem";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { globalActions } from "../store/store";
export default function Cart({ navigation }) {
  const cartItems = useSelector((state) => state.globalReducer.cartItems);
  const saveToLaterItems = useSelector(
    (state) => state.globalReducer.saveToLaterItems
  );
  const dispatch = useDispatch();

  const RenderData = [
    { title: "Cart Items", data: cartItems },
    { title: "Saved For Later", data: saveToLaterItems },
  ];
  const totalAmountDetails = useSelector(
    (state) => state.globalReducer.totalAmountDetails
  );
  function handleBuyProduct() {
    dispatch(globalActions.setCheckoutItems(cartItems));
    navigation.navigate("Order Summary");
  }
  if (cartItems.length == 0 && saveToLaterItems.length == 0) {
    return (
      <View style={styles.emptyCart}>
        <MaterialCommunityIcons name="cart-minus" size={50} color="gray" />
        <Text style={styles.emptyCartText}>Your Cart Is Empty</Text>
        <Text style={{ color: "gray", fontSize: 13 }}>
          Go, add products to your cart !
        </Text>
      </View>
    );
  } else
    return (
      <>
        <SafeAreaView>
          <View style={styles.homePageContainer}>
            <View style={styles.cartItemsList}>
              <SectionList
                sections={RenderData}
                renderItem={({ section, item }) => {
                  if (section.title == "Cart Items")
                    return <CartItemView dataItem={item} />;
                  else return <SaveForLaterItem dataItem={item} />;
                }}
                renderSectionHeader={({ section: { title } }) => {
                  if (title == "Cart Items") {
                    return (
                      <View style={styles.saveForlaterView}>
                        <Ionicons
                          name="ios-cart-sharp"
                          size={20}
                          color="#4c4c4d"
                        />
                        <Text style={styles.saveForlaterText}>{title}</Text>
                      </View>
                    );
                  } else {
                    return (
                      <View style={styles.saveForlaterView}>
                        <MaterialIcons
                          name="save-alt"
                          size={20}
                          color="#4c4c4d"
                        />
                        <Text style={styles.saveForlaterText}>{title}</Text>
                      </View>
                    );
                  }
                }}
                stickySectionHeadersEnabled={true}
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
                  {totalAmountDetails.totalAmount}
                </Text>
              </View>
              <AddCartButtons
                onPress={handleBuyProduct}
                color={{ ...styles.checkoutButton }}
              >
                CheckOut
              </AddCartButtons>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
}

const styles = StyleSheet.create({
  homePageContainer: {
    height: "100%",
  },
  cartItemsList: {
    flex: 1,
    flexShrink: 0,
    backgroundColor: "white",
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
  myCartTitle: {
    backgroundColor: "#fc9f1c",
    maxHeight: 45,
    flex: 1,
    justifyContent: "center",
    elevation: 12,
  },
  mycartTitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  finalAmount: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyCartText: {
    margin: 10,
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
  },
  saveForlaterView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#dbdbdb",
    flexDirection: "row",
    padding: 8,
  },
  saveForlaterText: {
    fontWeight: "bold",
    color: "#4c4c4d",
    fontSize: 20,
    marginHorizontal: 4,
  },
});
