import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { Profiler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import ProductIdView from "../components/ProductIdView";
export default function RecentlyViewedScreen({ route }) {
  const recentlyVisited = route.params.dataItem;

  return (
    <View style={styles.recentlyVisitedContainer}>
      <FlatList
        data={recentlyVisited}
        renderItem={(dataItem) => {
          return <ProductIdView prodDetails={dataItem.item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  recentlyVisitedContainer: {
    marginTop: 10,

    flex: 1,
    backgroundColor: "#f2fcff",
  },
});
