import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import { CartStackScreen } from "./DashboardStack";
import SalesOrderHistoryScreen from "../screens/SalesOrderHistoryScreen/SalesOrderHistoryScreen";

const SalesOrderHistoryStack = createStackNavigator();

const SalesOrderHistoryStackScreen = ({ navigation }) => {
  return (
    <SalesOrderHistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <SalesOrderHistoryStack.Screen
        name="Sales"
        component={SalesOrderHistoryScreen}
      />
      <SalesOrderHistoryStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      {/* <SalesOrderHistoryStack.Screen name="Cart" component={CartStackScreen} /> */}
    </SalesOrderHistoryStack.Navigator>
  );
};

export default SalesOrderHistoryStackScreen;
