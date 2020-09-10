import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../defaultComponents/Colors";
//import { DATA } from "./DrawerItems";
import Item from "./DrawerItem";
import RowView from "../../defaultComponents/RowView";
import { AuthContext } from "../../contexts/AuthContext";

export const DrawerContent = (props) => {
  const { authContext, loginState, apiState } = React.useContext(AuthContext);
  const { profile } = apiState.permissions;

  // let members = !loginState.role.includes("Retailer");
  // console.log(loginState.role, "-----");

  let i = 0;
  let DATA = [];

  const permisssions = apiState.permissions ? apiState.permissions : null;

  const perm = permisssions;
  const Array = Object.entries(perm).sort((a, b) => a[0].localeCompare(b[0]));

  const filteredArray = Array.filter((each) => each[1] === true);
  const mappedArray = filteredArray.map((each) => each[0]);
  const newArray = mappedArray.filter(
    (each) => each !== "profile" && each !== "cart"
  );

  // console.log(permisssions, "permissions");
  // console.log(Array, "Array");
  // console.log(newArray, "newArray");
  // console.log(mappedArray, "mapArray");

  while (i < newArray.length) {
    if (newArray[i] === "claim") {
      DATA.push({
        label: "Claim Points",
        route: "claims",
        iconImage: require("../../../assets/drawerIcons/ClaimPoints.png"),
      });
    }
    if (newArray[i] === "salesorder") {
      DATA.push({
        label: "Sales Order History",
        route: "Sales",
        iconImage: require("../../../assets/drawerIcons/SalesOrderHistory.png"),
      });
    }
    if (newArray[i] === "pointsearn") {
      DATA.push({
        label: "Point Earn History",
        route: "Points",
        iconImage: require("../../../assets/drawerIcons/PointEarnHistory.png"),
      });
    }

    if (newArray[i] === "refer") {
      DATA.push({
        label: "Refer Retailer",
        route: "Refer",
        iconImage: require("../../../assets/drawerIcons/ReferRetailer.png"),
      });
    }
    if (newArray[i] === "returns") {
      DATA.push({
        label: "Return Management",
        route: "Return",
        iconImage: require("../../../assets/drawerIcons/ReturnManagement.png"),
      });
    }
    if (newArray[i] === "rewards") {
      DATA.push({
        label: "Rewards Catalog",
        route: "Rewards",
        iconImage: require("../../../assets/drawerIcons/RewardsCatalog.png"),
      });
    }
    if (newArray[i] === "redemption") {
      DATA.push({
        label: "Redemptions History",
        route: "Redemptions",
        iconImage: require("../../../assets/drawerIcons/RedemptionsHistory.png"),
      });
    }
    if (newArray[i] === "faq") {
      DATA.push({
        label: "FAQ",
        route: "Faq",
        iconImage: require("../../../assets/drawerIcons/FAQ.png"),
      });
    }
    if (newArray[i] === "contactus") {
      DATA.push({
        label: "Help and Contact Us",
        route: "contactus",
        iconImage: require("../../../assets/drawerIcons/Help.png"),
      });
    }
    if (newArray[i] === "members") {
      DATA.push({
        label: "Members",
        route: "MembersList",
        iconImage: require("../../../assets/drawerIcons/ReturnManagement.png"),
      });
    }
    i++;
  }
  console.log(loginState.role, "Role");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerContent}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatar}>
              <FontAwesome5
                name="user-alt"
                size={24}
                color="rgba(131,77,155,1)"
              />
            </View>

            <View style={styles.user}>
              <Text style={styles.title}>{loginState.userName} </Text>
              <RowView>
                <Text style={styles.caption}>
                  {loginState.role_selected
                    ? loginState.role_selected
                    : loginState.role.slice(2, -2) === "Retailer"
                    ? "Retailer"
                    : loginState.role[0]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (profile) {
                      props.navigation.navigate("Profile");
                    }
                  }}
                >
                  <Text style={{ ...styles.caption, color: Colors.voilet1 }}>
                    {profile ? " View Profile" : null}
                  </Text>
                </TouchableOpacity>
              </RowView>
            </View>
          </View>
        </Drawer.Section>
        <DrawerContentScrollView {...props}>
          <Drawer.Section>
            <DrawerItem
              icon={({ size }) => (
                <Icon name="home-outline" color={Colors.grey11} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate("Dashboard");
              }}
            />
            {apiState.permissions !== {}
              ? DATA.map((item, index) => (
                  <View
                    key={index}
                    // style={{
                    //   height: item.label === "" ? 0 : 50,
                    // }}
                  >
                    <Item
                      label={item.label}
                      iconImage={item.iconImage}
                      onPress={() => {
                        if (item.label !== "") {
                          props.navigation.navigate(item.route);
                        }
                      }}
                    />
                  </View>
                ))
              : null}

            {/* <FlatList
              data={DATA}
              keyExtractor={(item, index) => item.label}
              renderItem={({ item }) => (
                <Item
                  label={item.label}
                  iconImage={item.iconImage}
                  onPress={() => props.navigation.navigate(item.route)}
                />
              )}
            /> */}
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <View
          style={{
            borderColor: Colors.grey11,
            borderTopWidth: 0.5,
            width: "94%",
            alignSelf: "flex-end",
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Image
              source={require("../../../assets/drawerIcons/logout.png")}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          )}
          label="Logout"
          onPress={() => {
            authContext.signOut();
            // props.navigation.navigate("Login");
            // console.log(props.navigation);
          }}
        />

        <View style={{ alignItems: "center" }}>
          <DrawerItem label="Version 2.2.0" />
        </View>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 28,
  },
  userInfoSection: {
    justifyContent: "flex-start",
    // width: "80%",
    flexDirection: "row",
    height: 50,
    marginBottom: 5,
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.voilet3,
    width: 50,
    // height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
  },
  user: {
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.grey2,
    lineHeight: 24,
    fontFamily: "roboto-medium",
  },
  caption: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: "400",
  },

  drawerSection: {
    borderColor: Colors.voilet3,
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    // alignItems: "center",

    // borderTopWidth: 1,
    paddingTop: 5,
  },
});
