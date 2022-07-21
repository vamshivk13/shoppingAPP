import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductView from "../components/ProductView";
import { RecentlyVisitedItem } from "../components/RecentlyVisitedProducts";
import SortList from "../components/FilterBar.js/SortList";

import FilterBar from "../components/FilterBar.js/FilterBar";
import SortOverlayModal from "../components/FilterBar.js/SortOverlayModal";
import FilterOverlay from "../components/FilterBar.js/FilterOverlay";
export default function ProductListScreen({
  customListItems,
  route,
  navigation,
}) {
  if (
    customListItems == undefined &&
    route?.params != undefined &&
    route?.params?.showFilterbar == undefined
  ) {
    customListItems = route.params?.dataItem;
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [sortState, setSortState] = useState("Relevance");
  const allDisplayProducts = useSelector(
    (state) => state.globalReducer.currentSearchItems
  );
  useEffect(() => {
    setCurrentItems(allDisplayProducts);
    navigation?.setOptions({
      title: "Search Results",
      headerStyle: { backgroundColor: "#2987f2" },
    });
  }, [allDisplayProducts]);
  function openModalOverLay() {
    setModalVisible(true);
  }
  function openFilterOverLay() {
    setIsFilterVisible(true);
  }

  return (
    <View style={styles.topContainer}>
      <FlatList
        data={customListItems ? customListItems : currentItems}
        renderItem={(dataItem) => {
          return <ProductView dataItem={dataItem.item} />;
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => {
          return (
            <>
              {route?.params?.showFilterbar == true ? (
                <FilterBar
                  openModalOverLay={openModalOverLay}
                  openFilterOverlay={openFilterOverLay}
                />
              ) : (
                <View></View>
              )}
            </>
          );
        }}
      ></FlatList>
      <SortOverlayModal
        setCurrentItems={setCurrentItems}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setSortState={setSortState}
        sortState={sortState}
        currentItems={currentItems}
      />
      <FilterOverlay
        setCurrentItems={setCurrentItems}
        currentItems={currentItems}
        setIsFilterVisible={setIsFilterVisible}
        isFilterVisible={isFilterVisible}
        setSortState={setSortState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#e6fcff",
  },
});
