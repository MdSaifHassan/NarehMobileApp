import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../defaultComponents/Colors";

const PointCard = ({ couponCode, typeOfCoupon, name, dateCreated, points }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text
          style={{
            ...styles.name,
            opacity: 0.75,
            fontSize: 10,
            fontWeight: "400",
          }}
        >
          {couponCode}
        </Text>
        <Text
          style={{
            opacity: 0.85,
            opacity: 0.75,
            fontSize: 10,
            fontWeight: "400",
          }}
        >
          Type of points:
          <Text style={{ ...styles.name, fontSize: 10, fontWeight: "bold" }}>
            {typeOfCoupon}
          </Text>
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        <View style={styles.topRight}>
          <Image
            style={styles.coins}
            source={require("../../../assets/coins.png")}
          />
          <Text style={styles.points}>{points}</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              opacity: 0.65,
              color: Colors.black1,
            }}
          >
            {dateCreated}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PointCard;

const styles = StyleSheet.create({
  card: {
    height: 70,
    paddingBottom: 10,
    marginBottom: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
  },
  leftWrapper: {},
  name: {
    opacity: 0.85,
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.black1,
    paddingBottom: 6,
  },
  rightWrapper: {
    paddingRight: 17,
  },
  topRight: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  coins: {
    height: 18,
    width: 20,
    marginRight: 9,
    marginBottom: 12,
  },
  points: {
    color: Colors.green1,
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "roboto-bold",
  },
});
