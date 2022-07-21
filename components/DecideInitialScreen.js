import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginRegisterScreen from "../Screens/LoginRegisterScreen";
import HomePage from "../Screens/HomePage";
import HomePageBottomBar from "./HomePageBottomBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalActions } from "../store/store";
import { ActivityIndicator } from "react-native-paper";
import { getUserDetails } from "../Backend/auth-api";
import { getAllCartItems } from "../Backend/auth-api";
const stack = createNativeStackNavigator();
export default function DecideInitialScreen() {
  const isLoggedIn = useSelector((state) => state.globalReducer.isLoggedIn);
  const [isStatusFetched, setIsStatusFetched] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token");
      const curUserId = await AsyncStorage.getItem("curUser");
      const userDetails = await getUserDetails(curUserId);
      //const allCartItems = await getAllCartItems(curUserId);
      // dispatch(globalActions.setInitialCartItems(allCartItems));
      dispatch(globalActions.setLoggedInUserDetails(userDetails));
      dispatch(globalActions.setLoginState(!!token));
      setIsStatusFetched(true);
    }
    getToken();
  }, []);
  if (!isStatusFetched) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ margin: 20 }}>Welcome Back!</Text>
        <ActivityIndicator size={30} color="black" />
      </View>
    );
  } else
    return (
      <stack.Navigator>
        {!isLoggedIn && (
          <stack.Screen
            name="Login"
            component={LoginRegisterScreen}
            options={{ headerShown: false }}
          ></stack.Screen>
        )}
        {isLoggedIn && (
          <stack.Screen
            name="HomePage"
            component={HomePageBottomBar}
            options={{ headerShown: false }}
          ></stack.Screen>
        )}
      </stack.Navigator>
    );
}
