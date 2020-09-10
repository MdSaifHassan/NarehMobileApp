import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RewardsDetailScreen from "../screens/RewardsScreen/RewardsDetailScreen";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";

const RewardsDetailsStack = createStackNavigator();

const RewardsDetailsStackScreen = ({ navigation }) => {
  return (
    <RewardsDetailsStack.Navigator screenOptions={{ headerShown: false }}>
      <RewardsDetailsStack.Screen
        name="RewardsDetails"
        component={RewardsDetailScreen}
      />
      <RewardsDetailsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </RewardsDetailsStack.Navigator>
  );
};

export default RewardsDetailsStackScreen;

const styles = StyleSheet.create({});
