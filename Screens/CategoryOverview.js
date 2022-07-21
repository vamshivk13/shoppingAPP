import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/store";
import ProductListScreen from "./ProductListScreen";
import { ScrollView } from "react-native-virtualized-view";
export default function CategoryOverview({ navigation, route }) {
  const allProducts = useSelector((state) => state.globalReducer.allProducts);
  const [categoryData, setCategoryData] = useState([]);
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();
  const categoryDataItem = route.params.dataItem;
  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        categoryDataItem.category[0].toUpperCase() +
        categoryDataItem.category.substring(
          1,
          categoryDataItem.category.length
        ),
      headerStyle: {
        backgroundColor: "#0f90f2",
      },
    });
  }, []);
  useEffect(() => {
    allProducts.forEach((product) => {
      if (product.category == categoryDataItem.category) {
        setCategoryData((prev) => [...prev, product]);
        setBrands((prev) => {
          if (prev?.indexOf(product.brand) >= 0) {
            return prev;
          } else {
            return [...prev, product.brand];
          }
        });
      }
    });
  }, []);
  useEffect(() => {
    dispatch(globalActions.setCategoryProductList(categoryDataItem.category));
  }, []);
  function handleDisplayBrandProducts(brand) {
    dispatch(globalActions.setBrandProductList(brand));
    navigation.navigate("productList");
  }
  return (
    <View style={styles.CategoryOverviewContianer}>
      <ScrollView>
        <Image
          style={styles.thumbnail}
          source={{ uri: categoryDataItem.thumbnail }}
        />
        <View style={{}}>
          <View>
            <Text style={styles.brandTitle}>Shop By Brand</Text>
            <FlatList
              data={brands}
              renderItem={(dataItem) => {
                return (
                  <View style={styles.brandIconContainer}>
                    <Pressable
                      android_ripple={{ color: "gray" }}
                      onPress={() => handleDisplayBrandProducts(dataItem.item)}
                    >
                      <View style={styles.brandIcon}>
                        <Text style={styles.brandName}>{dataItem.item}</Text>
                      </View>
                    </Pressable>
                  </View>
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <ProductListScreen />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  brandTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
  brandIconContainer: {
    borderRadius: 40,
    backgroundColor: "white",
    marginHorizontal: 5,
    marginTop: 10,
    overflow: "hidden",
  },
  brandName: {
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  brandIcon: {
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    height: 80,
    width: 80,
  },
  CategoryOverviewContianer: {
    flex: 1,
  },
  thumbnail: {
    flex: 0.3,
    width: "100%",
    height: 100,
  },
});
