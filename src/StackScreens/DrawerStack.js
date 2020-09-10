import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../screens/DrawerScreen/DrawerScreen";
import ClaimPointsScreen from "../screens/ClaimPointsScreen/ClaimPointsScreen";
import PointsEarnHistoryScreen from "../screens/PointsEarnHistoryScreen/PointsEarnHistoryScreen";
import ReturnManagementStackScreen from "../StackScreens/ReturnManagementStack";
import RewardsDetailScreen from "../screens/RewardsScreen/RewardsDetailScreen";
import FaqScreen from "../screens/FAQScreen/FaqScreen";
import ContactScreen from "../screens/ContactScreen";
import TabNavigator from "../TabScreens/TabNavigator";
import { RewardsStackScreen } from "./DashboardStack";
import Refer_Retailer from "../screens/Refer_RetailerScreen/Refer_Retailer";
import ProductsStackScreen from "./ProductsStack";
import SalesOrderHistoryScreen from "../screens/SalesOrderHistoryScreen/SalesOrderHistoryScreen";
import DashboardScreen from "../screens/DashboardScreen/Dashboard";
import ClaimsStackScreen from "./ClaimsStack";
import PromotionsStackScreen from "./PromotionsScreenStack";
import ReferStackScreen from "./ReferStack";
import PointsEarnHistoryStackScreen from "./PointsEarnHistoryStack";
import SalesOrderHistoryStackScreen from "./SalesOrderHistoryStack";
import MemberListScreen from "../screens/MembersListScreen/MemberListScreen";
import SplashScreen from "../screens/SplashScreen";
import { AuthContext } from "../contexts/AuthContext";
import RedemptionHistoryScreen from "../screens/RedemptionHistory/RedemptionHistoryScreen";
import RededemptionsStackScreen from "./RedemptionsScreenStack";
import MembersStackScreen from "./MembersStackScreen";
import ProfileEdit from "../screens/ProfileScreen/ProfileEdit";
import CreateProfile from "../screens/DashboardScreen/CreateProfile";

const Drawer = createDrawerNavigator();

const DrawerStack = ({ navigation, route }) => {
  return (
    <Drawer.Navigator
      // initialRouteName="Dashboard"
      drawerStyle={{ width: "75.2%" }}
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{ activeBackgroundColor: "red" }}
      drawerStyle={{ activeTintColor: "red" }}
      hideStatusBar
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Create" component={CreateProfile} />
      <Drawer.Screen name="claims" component={ClaimsStackScreen} />
      <Drawer.Screen name="Points" component={PointsEarnHistoryStackScreen} />
      <Drawer.Screen name="Return" component={ReturnManagementStackScreen} />
      <Drawer.Screen name="Sales" component={SalesOrderHistoryStackScreen} />
      <Drawer.Screen name="Rewards" component={RewardsStackScreen} />
      <Drawer.Screen name="Redemptions" component={RededemptionsStackScreen} />
      <Drawer.Screen name="Refer" component={ReferStackScreen} />
      <Drawer.Screen name="Promotions" component={PromotionsStackScreen} />
      <Drawer.Screen name="Products" component={ProductsStackScreen} />
      <Drawer.Screen name="Faq" component={FaqScreen} />
      <Drawer.Screen name="contactus" component={ContactScreen} />
      <Drawer.Screen name="MembersList" component={MembersStackScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
