import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { GradientColors } from "./Colors";

export const HeaderGradient = (props) => {
  return (
    <LinearGradient
      colors={GradientColors.primary}
      style={{
        height: props.height ? props.height : 75,
        justifyContent: "center",
        borderRadius: props.radius ? props.radius : null,
      }}
    >
      {props.children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({});
