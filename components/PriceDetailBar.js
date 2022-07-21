import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function PriceDetailBar({ dataItem }) {
  return (
    <View>
      <View style={styles.costDiscountText}>
        <Text style={styles.priceText}>₹{dataItem.price}</Text>
        <View style={styles.discountView}>
          <Text style={styles.realPriceText}>
            ₹
            {Math.round(
              (100 * dataItem.price) / (100 - dataItem.discountPercentage)
            )}
          </Text>
          <Text style={styles.discountText}>
            ({dataItem.discountPercentage}% off)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  costDiscountText: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  discountView: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceText: {
    marginHorizontal: 5,
    color: "#f54118",
    fontSize: 17,
  },
  discountText: {
    fontSize: 11,
  },
  realPriceText: {
    fontSize: 12,
    textDecorationLine: "line-through",
  },
});
