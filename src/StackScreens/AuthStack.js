import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/AuthenticationScreen/LoginScreen";
import VerifyScreen from "../screens/AuthenticationScreen/VerifyOTPScreen";
import { MaterialIcons } from "@expo/vector-icons";
import RoleScreen from "../screens/RoleScreen";
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="select"
        component={RoleScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Verify"
        component={VerifyScreen}
        options={{
          headerStyle: { elevation: 0 },
          headerLeftContainerStyle: { paddingLeft: 10, paddingTop: 10 },
          headerTitle: "",
          headerStatusBarHeight: 15,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;

const styles = StyleSheet.create({});
