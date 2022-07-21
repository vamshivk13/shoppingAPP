import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecentlyVisitedProducts from "./RecentlyVisitedProducts";
export default function MostDiscountedProducts() {
  const allProducts = useSelector((state) => state.globalReducer.allProducts);
  const [discountedProds, setDiscountedProd] = useState([]);

  useEffect(() => {
    const discounted = allProducts.filter(
      (item) => item.discountPercentage > 15
    );
    setDiscountedProd(discounted);
  }, [allProducts]);

  return (
    <View>
      <RecentlyVisitedProducts
        title="Most Discounted"
        customList={discountedProds}
      />
    </View>
  );
}
