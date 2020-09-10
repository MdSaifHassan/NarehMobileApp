import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Colors } from "../defaultComponents/Colors";

const SortButton = ({ onPress }) => {
  return (
    <View style={styles.sortWapper}>
      <TouchableOpacity onPress={onPress} style={styles.sort}>
        <Image source={require("../../assets/sort.png")} style={styles.arrow} />
        <Text>Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  sortWapper: {
    width: "23%",
    flexDirection: "row-reverse",
  },
  sort: {
    maxWidth: 78,
    borderWidth: 1,
    height: 35,
    borderColor: Colors.grey4,
    borderRadius: 4,
    paddingVertical: 8,
    paddingRight: 21,
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    height: 10.32,
    width: 9,
    marginRight: 3,
    marginLeft: 20,
  },
});
