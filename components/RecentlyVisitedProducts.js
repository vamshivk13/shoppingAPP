import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import ProductIdView from "./ProductIdView";
import ImageCarousal from "../UI/ImageCarousal/ImageCarousal";
import { ScrollView } from "react-native-virtualized-view";
import { addRecentlyVisited } from "../Backend/auth-api";
export default function RecentlyVisitedProducts({ customList, title }) {
  const navigation = useNavigation();
  const recentlyVisited = useSelector(
    (state) => state.globalReducer.recentlyVisitedItems
  );
  const [recentlyVisitedProd, setRecentProducts] = useState([]);
  const allProducts = useSelector((state) => state.globalReducer.allProducts);
  useEffect(() => {
    if (!customList) {
      setRecentProducts([]);
      recentlyVisited.forEach((productId) => {
        const prodDetail = allProducts.find((item) => item.id == productId);
        setRecentProducts((prev) => [...prev, prodDetail]);
      });

      if (recentlyVisited.length > 0) {
        async function uploadRecentProd() {
          await addRecentlyVisited(recentlyVisited);
        }
        uploadRecentProd();
      }
    }
  }, [recentlyVisited]);
  function handleViewAll() {
    navigation.navigate("Recently Visited", {
      dataItem: customList ? customList : recentlyVisitedProd,
    });
  }

  return (
    <View style={styles.recentlyVisitedContainer}>
      <View style={styles.header}>
        <View style={styles.recentlyVisitedText}>
          <Text style={styles.recenttext}>{title}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={handleViewAll}>
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.detailGrid}>
          {customList != undefined
            ? customList.slice(0, 4).map((dataItem) => {
                return (
                  <ProductIdView key={dataItem.id} prodDetails={dataItem} />
                );
              })
            : recentlyVisitedProd.slice(0, 4).map((dataItem) => {
                return (
                  <ProductIdView key={dataItem.id} prodDetails={dataItem} />
                );
              })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recentItem: {
    height: 180,
    flex: 1,

    alignItems: "center",
  },
  detailGrid: {
    flex: 1,

    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "100%",
    height: "85%",
    padding: 5,
    resizeMode: "contain",
  },
  prodDetailText: {
    fontWeight: "300",
    fontSize: 14,
  },
  recentProdImage: {
    width: "100%",
    height: "100%",
  },
  recentlyVisitedContainer: {
    padding: 10,

    marginVertical: 10,

    backgroundColor: "#e6ffef",
  },
  viewAll: {
    borderColor: "gray",
    borderWidth: 0.7,
    alignSelf: "flex-end",

    marginRight: 10,
    marginBottom: 10,
    padding: 5,
  },
  recentlyVisitedText: {
    alignSelf: "flex-start",
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recenttext: {
    fontWeight: "bold",
    fontSize: 15,
  },
  viewAllText: {
    color: "#347aeb",
  },
});
