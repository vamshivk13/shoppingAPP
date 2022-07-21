import { View, StyleSheet } from "react-native";
import { carousal_images } from "../../data/images";
import { Ionicons } from "@expo/vector-icons";
export default function ImageCarousalDots({ curIndex }) {
  return (
    <View style={styles.dotContainer}>
      {carousal_images.map((item, index) => {
        return (
          <View style={[styles.dotStyle]} key={index}>
            <Ionicons
              name="ellipse"
              color={curIndex == index ? "white" : "gray"}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.3)",
    borderRadius: 10,
  },

  dotStyle: {
    marginHorizontal: 4,
  },
});
