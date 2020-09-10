import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../defaultComponents/Colors";
import DashboardStackScreen from "../StackScreens/DashboardStack";
import ClaimsStackScreen from "../StackScreens/ClaimsStack";
import ProfileStackScreen from "../StackScreens/ProfileStack";
import DashboardScreen from "../screens/DashboardScreen/Dashboard";
import { AuthContext } from "../contexts/AuthContext";
import LoadingScreen from "../defaultComponents/LoadingScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const { apiState } = useContext(AuthContext);
  const { claim, profile } = apiState.permissions;

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: Colors.voilet1,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ tintColor: color }}
              source={require("../../assets/ios1x_dashboard.png")}
            />
          ),
        }}
      />
      {!claim ? null : (
        <Tab.Screen
          name="Claims"
          component={ClaimsStackScreen}
          options={{
            tabBarLabel: "Claims",
            tabBarIcon: ({ color }) => (
              <Image
                style={{ tintColor: color }}
                source={require("../../assets/ios1x_gift.png")}
              />
            ),
          }}
        />
      )}
      {!profile ? null : (
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Image
                style={{ tintColor: color }}
                source={require("../../assets/ios1x_Icons.png")}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

//console.log(size, color);

export default TabNavigator;

const styles = StyleSheet.create({});
