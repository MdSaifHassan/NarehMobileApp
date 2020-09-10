import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { AntDesign } from "@expo/vector-icons";

export const MemberContainer = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View>
        <Text style={styles.memberText}>{props.memberName}</Text>
        <Text style={styles.companyText}>{props.companyName}</Text>
        <Text style={styles.phoneText}>{props.phoneNumber}</Text>
      </View>
      <AntDesign name="right" size={15} color={Colors.voilet1} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomColor: Colors.grey3,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  memberText: {
    fontFamily: "roboto-medium",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.black1,
  },
  companyText: {
    fontFamily: "roboto-regular",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 22,
    color: Colors.black1,
    opacity: 0.75,
  },
  phoneText: {
    fontFamily: "roboto-medium",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.grey2,
  },
});
