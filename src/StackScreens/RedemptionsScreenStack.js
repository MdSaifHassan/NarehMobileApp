import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../screens/ProductsScreen/ProductScreen";
import { CartStackScreen } from "./DashboardStack";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import RedemptionHistoryScreen from "../screens/RedemptionHistory/RedemptionHistoryScreen";
import RedemptionsDetails from "../screens/RedemptionHistory/RedemptionsDetails";

const RededemptionsStack = createStackNavigator();

const RededemptionsStackScreen = ({ navigation }) => {
  return (
    <RededemptionsStack.Navigator screenOptions={{ headerShown: false }}>
      <RededemptionsStack.Screen
        name="RedemptionsHistory"
        component={RedemptionHistoryScreen}
      />
      <RededemptionsStack.Screen
        name="RedemptionsDetails"
        component={RedemptionsDetails}
      />
      <RededemptionsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </RededemptionsStack.Navigator>
  );
};

export default RededemptionsStackScreen;

const styles = StyleSheet.create({});
