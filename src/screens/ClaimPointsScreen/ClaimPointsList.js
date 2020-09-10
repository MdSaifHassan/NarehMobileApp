import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const ClaimPointsList = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.serialNumberTitle}>Serial number : </Text>
          <Text style={styles.number}>{props.number}</Text>
        </View>
        <Text style={styles.productTitle}>{props.productName}</Text>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.pointsContainer}>
          <Image
            style={styles.iconImage}
            source={require("../../../assets/coins.png")}
          />
          <Text style={styles.points}>{props.points}</Text>
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

export default ClaimPointsList;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
    marginTop: 20,
    paddingVertical: 15,
    width: "91.46%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },
  textContainer: {},

  serialNumberTitle: {
    fontSize: 12,
    color: Colors.black1,
    fontFamily: "roboto-regular",
    fontWeight: "400",
  },
  number: {
    fontSize: 12,
    color: Colors.black1,
    fontFamily: "roboto-medium",
    fontWeight: "500",
  },
  productTitle: {
    fontSize: 11,
    color: Colors.black1,
    fontFamily: "roboto-medium",
    fontWeight: "500",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  iconImage: {
    height: 15,
    width: 17,
  },
  pointsContainer: {
    borderRightWidth: 0.5,
    borderRightColor: Colors.voilet5,
    paddingRight: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  points: {
    color: Colors.green1,
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "roboto-bold",
  },
  deleteContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  delete: {
    color: Colors.grey2,
    fontWeight: "400",
    fontSize: 10,
    fontFamily: "roboto-regular",
  },
});
