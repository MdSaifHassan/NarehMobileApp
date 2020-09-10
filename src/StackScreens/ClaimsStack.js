import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClaimPointsScreen from "../screens/ClaimPointsScreen/ClaimPointsScreen";
import ClaimScanner from "../screens/ClaimPointsScreen/ClaimScanner";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import { CartStackScreen } from "./DashboardStack";

const ClaimsStack = createStackNavigator();

const ClaimsStackScreen = ({ navigation }) => {
  return (
    <ClaimsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ClaimsStack.Screen name="Claims" component={ClaimPointsScreen} />
      <ClaimsStack.Screen name="Scan" component={ClaimScanner} />
      <ClaimsStack.Screen name="Cart" component={CartStackScreen} />
      <ClaimsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </ClaimsStack.Navigator>
  );
};

export default ClaimsStackScreen;
