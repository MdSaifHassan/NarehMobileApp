import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../screens/ProductsScreen/ProductScreen";
import { CartStackScreen } from "./DashboardStack";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";

const ProductsStack = createStackNavigator();

const ProductsStackScreen = ({ navigation }) => {
  return (
    <ProductsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductsStack.Screen name="Products" component={ProductScreen} />
      <ProductsStack.Screen name="Cart" component={CartStackScreen} />
      <ProductsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsStackScreen;

const styles = StyleSheet.create({});
