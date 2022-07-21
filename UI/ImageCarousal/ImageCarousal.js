import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { carousal_images } from "../../data/images";
import ImageCarousalDots from "./ImageCarousalDots";
function ImageItem({ dataItem }) {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.carousalImage}
        source={{ uri: dataItem.imageUri }}
      ></Image>
    </View>
  );
}

export default function ImageCarousal({ carousalMove, carousal_images }) {
  const [images, setImages] = useState(carousal_images.slice(0, 1));
  const [curImageIndex, setCurImageIndex] = useState(0);
  const [curIndex, setCurIndex] = useState(0);
  const scrollref = useRef();

  function setIndexBasedOnScroll(event) {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const postitonX = event.nativeEvent.contentOffset.x;
    const cur = Math.round(postitonX / totalWidth);
    setCurImageIndex(cur);
  }
  function getItemLayout(event, index) {
    const length = styles.carousalImage.width + 22;
    const offset = index * length;
    return { length, offset, index };
  }

  useEffect(() => {
    const imageInterval = setInterval(
      () =>
        setCurIndex((prev) => {
          if (prev < carousal_images.length - 1) {
            return prev + 1;
          } else {
            return parseInt((prev + 1) % carousal_images.length);
          }
        }),
      2000
    );
    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  useEffect(() => {
    scrollref.current?.scrollToIndex({
      AnimationEffect: "none",
      index: curIndex,
    });
    return () => {};
  }, [curIndex]);

  return (
    <View style={styles.imageCarousalContainer}>
      <FlatList
        ref={scrollref}
        data={carousal_images}
        renderItem={(dataItem) => {
          return <ImageItem dataItem={dataItem.item} />;
        }}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfig={{
          minimumViewTime: 20,
          viewAreaCoveragePercentThreshold: 95,
        }}
        getItemLayout={getItemLayout}
        onScroll={setIndexBasedOnScroll}
      />
      <View style={styles.dotPosition}>
        <ImageCarousalDots curIndex={curImageIndex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageCarousalContainer: {
    paddingVertical: 10,
    position: "relative",
  },
  imageContainer: {
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },
  carousalImage: {
    width: 370,
    height: 190,
  },
  dotPosition: {
    position: "absolute",
    bottom: 30,
    flexWrap: "wrap",

    borderRadius: 10,
    alignSelf: "center",
  },
});
