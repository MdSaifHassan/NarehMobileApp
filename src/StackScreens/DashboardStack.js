import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen/Dashboard";
import RewardsScreen from "../screens/RewardsScreen/RewardsScreen";
//import RewardsDetailScreen from "../screens/RewardsScreen/RewardsDetailScreen";
import CheckOutScreen from "../screens/CartScreen/CheckOutScreen";
import CartScreen from "../screens/CartScreen/CartScreen";
import Addaddress from "../screens/CartScreen/Addadress";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
//import ReferStackScreen from "./ReferStack";
import RewardsDetailsStackScreen from "./RewardsDetailStack";
import RewardsDetailScreen from "../screens/RewardsScreen/RewardsDetailScreen";

const DashboardStack = createStackNavigator();
const RewardsStack = createStackNavigator();

export const RewardsStackScreen = () => {
  return (
    <RewardsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RewardsStack.Screen name="Rewards" component={RewardsScreen} />
      <RewardsStack.Screen
        name="RewardsDetails"
        component={RewardsDetailScreen}
      />

      <RewardsStack.Screen name="Cart" component={CartStackScreen} />
      <RewardsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </RewardsStack.Navigator>
  );
};

const CartStack = createStackNavigator();

export const CartStackScreen = ({ navigation }) => {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="AddAddress" component={Addaddress} />
      <CartStack.Screen name="CheckOut" component={CheckOutScreen} />
      <CartStack.Screen name="Notifications" component={NotificationsScreen} />
    </CartStack.Navigator>
  );
};

const DashboardStackScreen = ({ navigation, route }) => {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />

      {/* <DashboardStack.Screen name="Refer" component={ReferStackScreen} />
      
      <DashboardStack.Screen name="Rewards" component={RewardsStackScreen} /> */}
      <RewardsStack.Screen
        name="RewardsDetails"
        component={RewardsDetailScreen}
      />
      <DashboardStack.Screen name="Cart" component={CartStackScreen} />
      <DashboardStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardStackScreen;

const styles = StyleSheet.create({});
