import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../../store/store";
export default function GlobalSearchScreen() {
  const [searchText, setSearchText] = useState("");
  const curSearchItems = useSelector(
    (state) => state.globalReducer.currentSearchItems
  );
  const curSearchItemsList = useSelector(
    (state) => state.globalReducer.currentSearchItemsList
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function handleSearchProduct() {
    console.log(searchText);

    dispatch(globalActions.setAllCurrentSearchItems(searchText));
    navigation.navigate("productList", { showFilterbar: true });
  }
  function handleSearchElement(e) {
    setSearchText(e);
    dispatch(globalActions.setCurrentSearchItemsList(e));
  }
  function displaySearchResult(searchKeyword) {
    dispatch(globalActions.setAllCurrentSearchItems(searchKeyword));
    navigation.navigate("productList", { showFilterbar: true });
  }
  return (
    <View>
      <View style={styles.globalSearchContainer}>
        <TextInput
          autoFocus
          style={styles.globalSearchTextInp}
          value={searchText}
          onChangeText={handleSearchElement}
        ></TextInput>
        <View style={styles.searchButton}>
          <Pressable onPress={handleSearchProduct}>
            <Ionicons name="md-search" size={24} color="blue"></Ionicons>
          </Pressable>
        </View>
      </View>
      <View style={styles.searchResults}>
        <FlatList
          data={curSearchItemsList}
          renderItem={(dataItem) => {
            return (
              <View>
                <Pressable
                  onPress={() => {
                    displaySearchResult(dataItem.item);
                  }}
                >
                  <Text style={styles.searchResultText}>{dataItem.item}</Text>
                </Pressable>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  globalSearchTextInp: {
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#fcf2f5",
    padding: 8,
    flex: 1,
  },
  globalSearchContainer: {
    marginTop: 40,

    marginHorizontal: 10,
    flexDirection: "row",
  },
  searchResults: {
    marginTop: 10,
  },
  searchResultText: {
    marginVertical: 5,
    marginHorizontal: 4,
    borderBottomColor: "gray",
    padding: 5,
    fontWeight: "bold",
    borderBottomWidth: 0.6,
  },
});
