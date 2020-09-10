import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "./Colors";

export const ButtonOutline = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        style={{
          borderWidth: 1,
          borderColor: Colors.grey4,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : Colors.white,
          borderRadius: 4,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 20,
          minWidth: 40,
          justifyContent: "center",
        }}
      >
        {props.children}
      </TouchableOpacity>
    </View>
  );
};
export const ButtonFill = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        backgroundColor: props.bgColor ? props.bgColor : Colors.voilet1,
        borderRadius: 4,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: props.self ? props.self : "flex-start",
        justifyContent: "center",
        minHeight: 20,
        minWidth: 40,
        width: props.width,
        paddingHorizontal: 16,
        color: props.color,
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
