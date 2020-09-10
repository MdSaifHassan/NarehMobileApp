import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PromotionsScreen from "../screens/PromotionsScreen/PromotionsScreen";
import PromotionsDetailScreen from "../screens/PromotionsScreen/PromotionsDetailScreen";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import { CartStackScreen } from "./DashboardStack";

const PromotionsStack = createStackNavigator();
const PromotionsDetailsStack = createStackNavigator();

export const PromotionsDetailsStackScreen = ({ navigation }) => {
  return (
    <PromotionsDetailsStack.Navigator screenOptions={{ headerShown: false }}>
      <PromotionsDetailsStack.Screen
        name="PromoDetails"
        component={PromotionsDetailScreen}
      />
      <PromotionsDetailsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <PromotionsDetailsStack.Screen name="Cart" component={CartStackScreen} />
    </PromotionsDetailsStack.Navigator>
  );
};
const PromotionsStackScreen = () => {
  return (
    <PromotionsStack.Navigator screenOptions={{ headerShown: false }}>
      <PromotionsStack.Screen name="Promotions" component={PromotionsScreen} />
      <PromotionsStack.Screen
        name="PromoDetails"
        component={PromotionsDetailsStackScreen}
      />
      <PromotionsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <PromotionsStack.Screen name="Cart" component={CartStackScreen} />
    </PromotionsStack.Navigator>
  );
};

export default PromotionsStackScreen;

const styles = StyleSheet.create({});
