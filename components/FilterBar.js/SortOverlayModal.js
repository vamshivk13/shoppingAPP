import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
export default function SortOverlayModal({
  modalVisible,
  setModalVisible,
  setCurrentItems,
  setSortState,
  sortState,
  currentItems,
}) {
  function handlePriceLowToHigh() {
    setSortState("Low2High");
    const temp = [...currentItems];
    const cur = temp.sort((a, b) => Number(a.price) - Number(b.price));

    setCurrentItems(() => cur);
    setModalVisible(false);
  }
  function handleDiscountSort() {
    setSortState("Discount");
    const temp = [...currentItems];
    const cur = temp.sort(
      (a, b) => Number(b.discountPercentage) - Number(a.discountPercentage)
    );

    setCurrentItems(() => cur);
    setModalVisible(false);
  }
  function handlePriceHighToLow() {
    setSortState("High2Low");
    const temp = [...currentItems];
    const cur = temp.sort((a, b) => Number(b.price) - Number(a.price));

    setCurrentItems(() => cur);
    setModalVisible(false);
  }
  function handleRatingSort() {
    setSortState("Rating");
    const temp = [...currentItems];
    const cur = temp.sort((a, b) => Number(b.rating) - Number(a.rating));

    setCurrentItems(() => cur);
    setModalVisible(false);
  }
  function handleReleventOrder() {
    setSortState("Relevance");
    setCurrentItems(() => allDisplayProducts);
    setModalVisible(false);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <Pressable
          style={styles.freeArea}
          onPress={() => setModalVisible(false)}
        ></Pressable>

        <View style={styles.modalView}>
          <View style={styles.sortPropList}>
            <Pressable
              onPress={handleReleventOrder}
              android_ripple={{ color: "gray" }}
            >
              <View style={styles.sortProp}>
                <Text style={styles.modalText}>Relevance</Text>
                <Octicons
                  name={sortState == "Relevance" ? "dot-fill" : "dot"}
                  size={28}
                  color="blue"
                />
              </View>
            </Pressable>
            <Pressable
              onPress={handlePriceLowToHigh}
              android_ripple={{ color: "gray" }}
            >
              <View style={styles.sortProp}>
                <Text style={styles.modalText}>Price Low to High</Text>
                <Octicons
                  name={sortState == "Low2High" ? "dot-fill" : "dot"}
                  size={28}
                  color="blue"
                />
              </View>
            </Pressable>
            <Pressable
              onPress={handlePriceHighToLow}
              android_ripple={{ color: "gray" }}
            >
              <View style={styles.sortProp}>
                <Text style={styles.modalText}>Price High to Low</Text>
                <Octicons
                  name={sortState == "High2Low" ? "dot-fill" : "dot"}
                  size={28}
                  color="blue"
                />
              </View>
            </Pressable>
            <Pressable
              onPress={handleRatingSort}
              android_ripple={{ color: "gray" }}
            >
              <View style={styles.sortProp}>
                <Text style={styles.modalText}>Rating</Text>
                <Octicons
                  name={sortState == "Rating" ? "dot-fill" : "dot"}
                  size={28}
                  color="blue"
                />
              </View>
            </Pressable>
            <Pressable
              onPress={handleDiscountSort}
              android_ripple={{ color: "gray" }}
            >
              <View style={styles.sortProp}>
                <Text style={styles.modalText}>Discount</Text>
                <Octicons
                  name={sortState == "Discount" ? "dot-fill" : "dot"}
                  size={28}
                  color="blue"
                />
              </View>
            </Pressable>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    justifyContent: "flex-end",
  },
  freeArea: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    height: "30%",
    justifyContent: "space-evenly",
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  sortProp: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    justifyContent: "space-between",
  },
  modalText: {
    margin: 10,
  },
  sortPropList: {
    marginVertical: 20,
  },
  textStyle: {
    textAlign: "center",
  },
});
