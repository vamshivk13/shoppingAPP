import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllOrderedItems } from "../Backend/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

export default function MyOrdersScreen() {
  const [orderedItems, setOrderedItems] = useState([]);
  const products = useSelector((state) => state.globalReducer.allProducts);
  useEffect(() => {
    async function getOrderedItems() {
      const curUserId = await AsyncStorage.getItem("curUser");
      const response = await getAllOrderedItems(curUserId);
      setOrderedItems(response);
      console.log(response);
    }
    getOrderedItems();
  }, []);
  function getProductTitle(id) {
    return products.filter((item) => {
      return item.id == id;
    })[0];
  }
  function handleOpenOrder() {}

  return (
    <View>
      <FlatList
        data={orderedItems}
        renderItem={(dataItem) => {
          const product = getProductTitle(dataItem.item[0].productId);

          return (
            <Pressable onPress={handleOpenOrder}>
              <View style={styles.orderView}>
                <Image
                  style={styles.orderedImage}
                  source={{ uri: product.thumbnail }}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {product.title}{" "}
                    {dataItem.item.length > 1
                      ? `and ${dataItem.item.length - 1} others ..`
                      : ""}
                  </Text>
                  <Text style={{ color: "green" }}>Ordered</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  orderView: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e3e3e3",
    elevation: 8,
    flexDirection: "row",
    paddingVertical: 20,
    marginVertical: 10,
  },
  orderedImage: {
    width: "30%",
    height: "100%",
    resizeMode: "contain",
  },
});
