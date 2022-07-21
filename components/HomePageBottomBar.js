import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomePage from "../Screens/HomePage";
import Categories from "../Screens/Categories";
import Account from "../Screens/Account";
import Cart from "../Screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const bottomTabs = createMaterialBottomTabNavigator();

export default function HomePageBottomBar() {
  return (
    <bottomTabs.Navigator barStyle={{ backgroundColor: "#a4ebf5" }}>
      <bottomTabs.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons name="home-outline" size={24} color="black"></Ionicons>
            );
          },
        }}
      ></bottomTabs.Screen>
      <bottomTabs.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: () => {
            return <MaterialIcons name="category" size={24} color="black" />;
          },
        }}
      ></bottomTabs.Screen>
      <bottomTabs.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialIcons name="account-circle" size={24} color="black" />
            );
          },
        }}
      ></bottomTabs.Screen>
      <bottomTabs.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialIcons name="shopping-cart" size={24} color="black" />
            );
          },
        }}
      ></bottomTabs.Screen>
    </bottomTabs.Navigator>
  );
}
