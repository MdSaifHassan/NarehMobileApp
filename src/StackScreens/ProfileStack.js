import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileEdit from "../screens/ProfileScreen/ProfileEdit";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { CartStackScreen } from "./DashboardStack";
import NotificationsScreen from "../screens/Notification/NotificationsScreen";
import ProfileEditScreen from "../screens/ProfileScreen/ProfileEditScreen";
// import Addaddress from "../screens/CartScreen/Addadress";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />

      <ProfileStack.Screen name="EditScreen" component={ProfileEditScreen} />
      <ProfileStack.Screen name="Cart" component={CartStackScreen} />
      <ProfileStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;

const styles = StyleSheet.create({});
