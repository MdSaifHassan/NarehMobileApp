import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RowView = ({ children, mTop, mBot, aItems, justifyContent }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: justifyContent ? justifyContent : "space-between",
        marginTop: mTop,
        alignItems: aItems ? aItems : "flex-start",

        marginBottom: mBot,
        //backgroundColor: "red",
      }}
    >
      {children}
    </View>
  );
};

export default RowView;

const styles = StyleSheet.create({});
