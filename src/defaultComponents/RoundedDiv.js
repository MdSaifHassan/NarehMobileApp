import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./Colors";

const RoundedDiv = ({ children, width }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.voilet3,
        borderRadius: 12,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export default RoundedDiv;
