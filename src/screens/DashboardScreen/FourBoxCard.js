import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DashboardMenuCard from "./DashboardMenuCard";
import { Colors } from "../../defaultComponents/Colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

const FourBoxCard = ({
  eligiblePoints,
  cartPoints,
  redeemPoints,
  actualPoints,
  totalMembers,
}) => {
  const { apiState } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, styles.leftContainer]}>
        <View style={styles.centerLine}>
          {!apiState.permissions.members ? (
            <DashboardMenuCard
              source={require("../../../../nareshSeedsApp/assets/rich.png")}
              pointsTitle={eligiblePoints}
              pointsTitleColor={Colors.green1}
              title={"Eligible Points"}
              onPress={() => navigation.navigate("Points")}
            />
          ) : (
            <DashboardMenuCard
              source={require("../../../../nareshSeedsApp/assets/rich.png")}
              pointsTitle={totalMembers}
              pointsTitleColor={Colors.green1}
              title={"Total members"}
              onPress={() => navigation.navigate("MembersList")}
            />
          )}
        </View>
        {!apiState.permissions.members ? (
          <DashboardMenuCard
            source={require("../../../../nareshSeedsApp/assets/ios1x_wallet.png")}
            pointsTitle={actualPoints}
            pointsTitleColor={Colors.voilet4}
            title={"Actual Points"}
            onPress={() => navigation.navigate("Points")}
          />
        ) : (
          <DashboardMenuCard
            source={require("../../../../nareshSeedsApp/assets/rich.png")}
            pointsTitle={eligiblePoints}
            pointsTitleColor={Colors.green1}
            title={"Eligible Points"}
            //onPress={() => navigation.navigate("Points")}
          />
        )}
      </View>
      <View style={styles.subContainer}>
        <View style={styles.centerLine}>
          <DashboardMenuCard
            source={require("../../../../nareshSeedsApp/assets/ios1x_get-money.png")}
            pointsTitle={redeemPoints}
            pointsTitleColor={Colors.yellow1}
            title={"Total Redeemed Points"}
            //onPress={() => navigation.navigate("Redemptions")}
          />
        </View>
        {apiState.permissions.members ? (
          <DashboardMenuCard
            source={require("../../../../nareshSeedsApp/assets/ios1x_shopping-bag.png")}
            pointsTitle={actualPoints}
            pointsTitleColor={Colors.grey2}
            title={"Actual points"}
            // onPress={() => navigation.navigate("Cart")}
          />
        ) : (
          <DashboardMenuCard
            source={require("../../../../nareshSeedsApp/assets/ios1x_shopping-bag.png")}
            pointsTitle={cartPoints}
            pointsTitleColor={Colors.grey2}
            title={"Cart Points"}
            // onPress={() => navigation.navigate("Cart")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "91.46%",
    backgroundColor: Colors.white,
    borderRadius: 6,
    flexDirection: "row",
    padding: 10,
  },
  subContainer: {
    width: "50%",
  },
  centerLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.voilet5,
  },
  leftContainer: {
    borderRightWidth: 0.5,
    borderRightColor: Colors.voilet5,
    flex: 1,
  },
});

export default FourBoxCard;
