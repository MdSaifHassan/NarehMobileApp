import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export const ReturnList = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity>
          <Text style={styles.productHeader}>Product name </Text>

          <Text style={styles.productTitle}>{props.productName}</Text>
          <Text style={styles.productHeader}>Claimed as: </Text>
          <Text style={styles.productTitle}>{props.claimType}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.quantityTitle}> Quantity</Text>
        <View style={styles.quantityBox}>
          <Image
            style={styles.icon}
            source={require("../../../assets/coins.png")}
          />
          <Text style={styles.quantity}>{props.quantity}</Text>
        </View>
        <Text style={{ ...styles.quantity, textAlign: "right" }}>
          {props.unclaimedQuantity}
        </Text>
      </View>
    </View>
  );
};

export const ReturnListDelete = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity>
          <Text style={styles.productHeader}>Product name </Text>

          <Text style={styles.productTitle}>{props.productName}</Text>
          <Text style={styles.productHeader}>Client Type: </Text>

          <Text style={styles.productTitle}>{props.clientType}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.pointsContainer}>
          <Text style={styles.quantityTitle}> Quantity</Text>
          <View style={styles.quantityBox}>
            <Image
              style={styles.icon}
              source={require("../../../assets/coins.png")}
            />
            <Text style={styles.quantity}>{props.quantity}</Text>
          </View>
          <Text style={{ ...styles.quantity, textAlign: "right" }}>
            {props.valueUnclaim}
          </Text>
        </View>

        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.deleteContainer}>
            <MaterialIcons name="delete-forever" size={24} color="black" />
            <Text style={styles.delete}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
    // marginTop: 20,
    paddingVertical: 15,
    // width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textContainer: {},

  productHeader: {
    fontSize: 12,
    color: Colors.grey2,
    fontFamily: "roboto-medium",
    fontWeight: "500",
  },
  productTitle: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 12,
    color: Colors.black1,
    fontFamily: "roboto-regular",
    fontWeight: "400",
  },
  rightContainer: {
    flexDirection: "row",
  },
  pointsContainer: {
    // alignItems: "center",
    justifyContent: "space-around",
  },
  quantityTitle: {
    color: Colors.grey2,
    fontWeight: "400",
    fontSize: 11,
    fontFamily: "roboto-regular",
  },
  quantity: {
    color: Colors.grey2,
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "roboto-bold",
  },
  iconImage: {
    height: 15,
    width: 17,
  },
  deleteContainer: {
    flex: 1,
    borderLeftWidth: 0.5,
    borderLeftColor: Colors.voilet5,
    paddingLeft: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
    // flex: 1,
  },
  delete: {
    color: Colors.grey2,
    fontWeight: "400",
    fontSize: 10,
    fontFamily: "roboto-regular",
  },
  icon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  quantityBox: {
    // marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
