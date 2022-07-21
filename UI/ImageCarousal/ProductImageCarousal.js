import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
function ImageItem({ imageData }) {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.carousalImage} source={{ uri: imageData }}></Image>
    </View>
  );
}
export default function ProductImageCarousal({ dataItem }) {
  return (
    <View style={styles.imageCarousalContainer}>
      <FlatList
        data={dataItem.images}
        renderItem={(images) => {
          return <ImageItem imageData={images.item} />;
        }}
        horizontal={true}
        viewabilityConfig={{
          minimumViewTime: 20,
          viewAreaCoveragePercentThreshold: 95,
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imageCarousalContainer: {
    padding: 10,
  },
  imageContainer: {
    backgroundColor: "#eaebe8",

    margin: 10,
  },
  carousalImage: {
    width: 330,
    height: 380,
    resizeMode: "contain",
  },
});
