import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./Screens/HomePage";
import GlobalSearchScreen from "./UI/GlobalSearch/GlobalSearchScreen";
import LoginScreen from "./Screens/LoginScreen";
import LoginRegisterScreen from "./Screens/LoginRegisterScreen";
import DecideInitialScreen from "./components/DecideInitialScreen";
import store, { globalActions } from "./store/store";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ProductOverViewScreen from "./Screens/ProductOverViewScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import CategoryOverview from "./Screens/CategoryOverview";
import WishListScreen from "./Screens/WishListScreen";
import CheckOutSummary from "./Screens/CheckOutSummary";
import MyOrdersScreen from "./Screens/MyOrdersScreen";
import RecentlyViewedScreen from "./Screens/RecentlyViewedScreen";
const stack = createNativeStackNavigator();

function RenderHomeScreen() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="InitalScreen"
        component={DecideInitialScreen}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen
        name="GlobalSearchScreen"
        component={GlobalSearchScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#e6fcff" },
        }}
      ></stack.Screen>
      <stack.Screen
        name="CategoryOverview"
        component={CategoryOverview}
      ></stack.Screen>
      <stack.Screen
        name="productList"
        component={ProductListScreen}
      ></stack.Screen>
      <stack.Screen
        name="ProductOverView"
        component={ProductOverViewScreen}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen name="WishList" component={WishListScreen}></stack.Screen>
      <stack.Screen
        name="Order Summary"
        component={CheckOutSummary}
      ></stack.Screen>
      <stack.Screen name="My Orders" component={MyOrdersScreen}></stack.Screen>
      <stack.Screen
        name="Recently Visited"
        component={RecentlyViewedScreen}
        options={{
          contentStyle: { backgroundColor: "#e6fcff" },
          headerStyle: { backgroundColor: "#2987f2" },
        }}
      ></stack.Screen>
    </stack.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <NavigationContainer>
          <RenderHomeScreen></RenderHomeScreen>
        </NavigationContainer>
      </Provider>
    </>
  );
}
