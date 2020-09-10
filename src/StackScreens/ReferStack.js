import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import Refer_Retailer from "../screens/Refer_RetailerScreen/Refer_Retailer";
import { CartStackScreen } from "./DashboardStack";

const ReferStack = createStackNavigator();

const ReferStackScreen = ({ navigation }) => {
  return (
    <ReferStack.Navigator screenOptions={{ headerShown: false }}>
      <ReferStack.Screen name="Refer" component={Refer_Retailer} />
      <ReferStack.Screen name="Notifications" component={NotificationsScreen} />
      <ReferStack.Screen name="Cart" component={CartStackScreen} />
    </ReferStack.Navigator>
  );
};

export default ReferStackScreen;
