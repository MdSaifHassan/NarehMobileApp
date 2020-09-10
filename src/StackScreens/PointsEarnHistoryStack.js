import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import { CartStackScreen } from "./DashboardStack";
import PointsEarnHistoryScreen from "../screens/PointsEarnHistoryScreen/PointsEarnHistoryScreen";

const PointsEarnHistoryStack = createStackNavigator();

const PointsEarnHistoryStackScreen = ({ navigation }) => {
  return (
    <PointsEarnHistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <PointsEarnHistoryStack.Screen
        name="Points"
        component={PointsEarnHistoryScreen}
      />
      <PointsEarnHistoryStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <PointsEarnHistoryStack.Screen name="Cart" component={CartStackScreen} />
    </PointsEarnHistoryStack.Navigator>
  );
};

export default PointsEarnHistoryStackScreen;
