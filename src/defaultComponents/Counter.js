import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Colors } from "./Colors";
import { Entypo } from "@expo/vector-icons";
import { tokenApi } from "../api/nsl";

const Counter = ({
  width,
  height,
  radius,
  minWidth,
  num,
  countHandlerMinus,
  countHandlerPlus,
}) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      minWidth: minWidth ? minWidth : null,
    },
    counter: {
      width: width ? width : 20,
      height: height ? height : 20,
      backgroundColor: Colors.grey2,
      borderRadius: radius ? radius : 20 / 2,
      opacity: 0.15,
      alignItems: "center",
      justifyContent: "center",
    },
    counterbox: {
      width: 30,
      height: 20,
      borderColor: "rgba(23,49,66,0.43)",
      borderRadius: 6,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  // const apiCall = async () => {
  //   return await tokenApi()
  //     .then((res) =>
  //       res.post("/v1/rewards/updateCart", {
  //         rewardID: id,
  //         quantity: num,
  //       })
  //     )
  //     .then((response) => {
  //       console.log(response.data.response);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={countHandlerMinus}>
        <View style={styles.counter}>
          <Entypo name="minus" size={20} color={Colors.white} />
        </View>
      </TouchableOpacity>
      <View style={styles.counterbox}>
        <Text>{num.toString()}</Text>
      </View>
      <TouchableOpacity onPress={countHandlerPlus}>
        <View style={styles.counter}>
          <Entypo name="plus" size={20} color={Colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
