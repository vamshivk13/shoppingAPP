import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AddCartButtons from "../UI/AddCartButtons";
export default function Account({ navigation }) {
  const userDetails = useSelector((state) => state.globalReducer.userDetails);

  const dispatch = useDispatch();

  async function handleuserLogout() {
    await AsyncStorage.removeItem("token");
    const token = await AsyncStorage.getItem("token");
    await AsyncStorage.removeItem("curUser");
    console.log("isremoved", await AsyncStorage.getItem("curUser"));
    dispatch(globalActions.clearState());
    dispatch(globalActions.setLoginState(!!token));
    navigation.navigate("InitalScreen");
  }
  function openWishList() {
    navigation.navigate("WishList");
  }
  function openMyOrders() {
    navigation.navigate("My Orders");
  }
  return (
    <SafeAreaView>
      <View style={styles.homePageContainer}>
        <View style={styles.userProfile}>
          <View style={styles.userProfilePIc}>
            <AntDesign name="user" size={50} color="black" />
          </View>
          <Text style={styles.userProfileText}>{userDetails.userName}</Text>
        </View>
        <View style={styles.profileDetailContainer}>
          <View style={styles.detailContianer}>
            <Text>Email</Text>
            <Text>{userDetails.email}</Text>
          </View>
          <Pressable android_ripple={{ color: "gray" }} onPress={openWishList}>
            <View style={styles.detailContianer}>
              <Text>WishList</Text>
            </View>
          </Pressable>
          <Pressable android_ripple={{ color: "gray" }} onPress={openMyOrders}>
            <View style={styles.detailContianer}>
              <Text>My Orders</Text>
            </View>
          </Pressable>
          <View style={styles.logoutContianer}>
            <AddCartButtons
              color={styles.logoutButton}
              textStyle={{ color: "black" }}
              onPress={handleuserLogout}
            >
              Logout
            </AddCartButtons>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    marginTop: 20,
  },
  userProfile: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  userProfilePIc: {
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
  },
  userProfileText: {
    fontWeight: "bold",
  },
  profileDetailContainer: {
    padding: 10,
  },
  detailContianer: {
    padding: 10,
    paddingLeft: 20,
    marginHorizontal: 10,
    backgroundColor: "#d1d0cf",
    borderRadius: 20,
    marginVertical: 10,
  },
  logoutContianer: {
    marginHorizontal: 10,
    backgroundColor: "#d1d0cf",
    borderRadius: 20,
    marginVertical: 10,
    height: 45,
  },
  logoutButton: {
    marginTop: 0,
  },
});
