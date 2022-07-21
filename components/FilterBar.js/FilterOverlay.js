import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import FilterTypeElement from "./FilterTypeElement";
import { useSelector } from "react-redux";

export default function FilterOverlay({
  currentItems,
  setCurrentItems,
  isFilterVisible,
  setIsFilterVisible,
  setSortState,
}) {
  const [curFilterOptions, setCurFilterOptions] = useState([]);
  const allBrands = useSelector((state) => state.globalReducer.allBrands);
  const allCategories = useSelector((state) => state.globalReducer.categories);
  const [currentFilter, setCurrentFilter] = useState("");
  const allDisplayProducts = useSelector(
    (state) => state.globalReducer.currentSearchItems
  );

  function handleBrandFilter() {
    setCurrentFilter("brand");
    setCurFilterOptions(() => setCurFilterOptions(allBrands));
  }
  function handleCategroyFilter() {
    setCurrentFilter("category");
    setCurFilterOptions(() => setCurFilterOptions(allCategories));
  }
  function handleFilterSelection(filterOption) {
    setSortState("Relevance");
    const filteredItems = allDisplayProducts.filter(
      (item) => item[currentFilter] == filterOption
    );
    setCurrentItems(filteredItems);
    ToastAndroid.show(
      `${currentFilter.toUpperCase()} Filter Applied !`,
      ToastAndroid.SHORT
    );
    setIsFilterVisible(false);
  }
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => setIsFilterVisible(false)}
      visible={isFilterVisible}
    >
      <View style={styles.filterContainer}>
        <View style={styles.filterType}>
          <View style={styles.filterTitle}>
            <Text style={styles.filterTitleText}>Filter</Text>
          </View>
          <FilterTypeElement
            isSelected={currentFilter == "brand"}
            type="Brand"
            onPress={handleBrandFilter}
          />
          <FilterTypeElement
            isSelected={currentFilter == "category"}
            type="Category"
            onPress={handleCategroyFilter}
          />
        </View>
        <View style={styles.filterOptions}>
          {currentFilter == "" ? (
            <View style={styles.noFilterMessage}>
              <Text style={styles.noFilterMessageText}> Choose a Filter!</Text>
            </View>
          ) : (
            <FlatList
              data={curFilterOptions}
              renderItem={(dataItem) => {
                return (
                  <View style={styles.optionElement}>
                    <FilterTypeElement
                      type={dataItem.item[currentFilter]}
                      onPress={() =>
                        handleFilterSelection(dataItem.item[currentFilter])
                      }
                    />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            ></FlatList>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#e6fcff",
  },
  filterType: {
    flex: 0.4,
    borderRightColor: "gray",
    borderRightWidth: 0.6,
  },
  filterOptions: {
    paddingVertical: 10,
    flex: 0.6,
  },
  filterTitle: {
    padding: 10,
  },
  filterTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noFilterMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noFilterMessageText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  optionElement: {
    backgroundColor: "#e6fcff",
    elevation: 7,
  },
});
