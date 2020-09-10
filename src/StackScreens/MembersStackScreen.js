import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClaimPointsScreen from "../screens/ClaimPointsScreen/ClaimPointsScreen";
import ClaimScanner from "../screens/ClaimPointsScreen/ClaimScanner";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
//import { CartStackScreen } from "./DashboardStack";
import MemberListScreen from "../screens/MembersListScreen/MemberListScreen";
//import SalesOrderHistoryScreen from "../screens/SalesOrderHistoryScreen/SalesOrderHistoryScreen";
import SalesScreen from "../screens/SalesOrderHistoryScreen/SalesScreen";

const MembersStack = createStackNavigator();

const MembersStackScreen = ({ navigation }) => {
  return (
    <MembersStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MembersStack.Screen name="MembersList" component={MemberListScreen} />
      <MembersStack.Screen name="SalesMembers" component={SalesScreen} />
      <MembersStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </MembersStack.Navigator>
  );
};

export default MembersStackScreen;
