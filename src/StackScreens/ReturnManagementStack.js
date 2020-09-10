import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReturnManagementScreen from "../screens/ReturnManagementScreen/ReturnManagementScreen";
import AddNewReturnScreen from "../screens/ReturnManagementScreen/AddNewReturnScreen";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import { CartStackScreen } from "./DashboardStack";

const ReturnManagementStack = createStackNavigator();

const ReturnManagementStackScreen = ({ navigation }) => {
  return (
    <ReturnManagementStack.Navigator screenOptions={{ headerShown: false }}>
      <ReturnManagementStack.Screen
        name="Return"
        component={ReturnManagementScreen}
      />
      <ReturnManagementStack.Screen
        name="NewReturn"
        component={AddNewReturnScreen}
      />
      <ReturnManagementStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <ReturnManagementStack.Screen name="Cart" component={CartStackScreen} />
    </ReturnManagementStack.Navigator>
  );
};

export default ReturnManagementStackScreen;
