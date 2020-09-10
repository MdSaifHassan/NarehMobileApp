import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Badge, Icon } from "react-native-elements";
import { Colors } from "../defaultComponents/Colors";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, setStatusBarBackgroundColor } from "expo-status-bar";
import { HeaderGradient } from "../defaultComponents/HeaderGradient";
import { AuthContext } from "../contexts/AuthContext";

const Header = ({ title, onPress }) => {
  const [card, setCard] = useState(false);
  const { apiState } = useContext(AuthContext);
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.openDrawer();
  };
  // console.log(navigation);

  return (
    <HeaderGradient>
      <View style={styles.header}>
        <StatusBar style="light" />
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={pressHandler}>
            <Ionicons style={styles.icon} name="ios-menu" size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightIcons}>
          {/* <AntDesign
          style={{ marginRight: 26, fontSize: 20 }}
          name="shoppingcart"
          color="white"
        /> */}
          {apiState.permissions.cart ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={styles.row}
            >
              <AntDesign
                style={{ marginRight: 26, fontSize: 20 }}
                name="shoppingcart"
                color={Colors.white}
              />

              <Badge
                badgeStyle={styles.badgeStyle}
                textStyle={{ fontSize: 8 }}
                containerStyle={{
                  justifyContent: "flex-start",
                }}
                value="9"
                status="error"
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={styles.row}
          >
            {/* <Ionicons
            style={{ marginRight: 24, fontSize: 20 }}
            name="ios-notifications-outline"
            color="white"
          /> */}
            <Icon
              type="ionicon"
              name="ios-notifications-outline"
              size={20}
              color={Colors.white}
              style={{ marginRight: 24, fontSize: 20 }}
            />

            <Badge
              badgeStyle={styles.badgeStyle}
              textStyle={{ fontSize: 8 }}
              containerStyle={{
                justifyContent: "flex-start",
              }}
              //value="1"
              status="error"
            />
          </TouchableOpacity>
        </View>
      </View>
    </HeaderGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  leftHeader: {
    flexDirection: "row",
    alignSelf: "center",
  },
  title: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "normal",
    marginLeft: 15,
    alignSelf: "center",
  },
  icon: {
    marginLeft: 15,
    fontSize: 24,
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  rightIcons: {
    flexDirection: "row",

    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  badgeStyle: {
    position: "absolute",
    top: -5,
    right: 20,
    height: 10,
    minWidth: 9.5,
  },
});
