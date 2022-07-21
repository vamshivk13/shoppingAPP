import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ProductDescriptionDetails({ dataItem }) {
  return (
    <View>
      <Text style={styles.title}>Details</Text>
      <View style={styles.details}>
        <View style={styles.detailPair}>
          <Text style={styles.detailsItem1}>Modal</Text>
          <Text style={styles.detailsItem}>{dataItem.title}</Text>
        </View>
        <View style={styles.detailPair}>
          <Text style={styles.detailsItem1}>Description</Text>
          <Text style={styles.detailsItem}>{dataItem.description}</Text>
        </View>
        <View style={styles.detailPair}>
          <Text style={styles.detailsItem1}>Brand</Text>
          <Text style={styles.detailsItem}>{dataItem.brand}</Text>
        </View>
        <View style={styles.detailPair}>
          <Text style={styles.detailsItem1}>Price</Text>
          <Text style={styles.detailsItem}>{dataItem.price}</Text>
        </View>
        <View style={styles.detailPair}>
          <Text style={styles.detailsItem1}>Stock</Text>
          <Text style={styles.detailsItem}>{dataItem.stock}</Text>
        </View>
        <View style={styles.detailPair}>
          <Text style={styles.detailsItem1}>Category</Text>
          <Text style={styles.detailsItem}>{dataItem.category}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    padding: 5,
  },
  details: {
    padding: 10,
  },
  detailPair: {
    flexDirection: "row",
  },
  detailsItem: {
    flex: 1,
    fontSize: 14,
    justifyContent: "flex-start",
    marginVertical: 4,
  },
  detailsItem1: {
    flex: 0.5,
    fontSize: 14,
    justifyContent: "flex-start",
    marginVertical: 4,
  },
});
