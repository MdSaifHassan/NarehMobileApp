import React from "react";
import { View } from "react-native";
import { Colors } from "./Colors";

const Container = ({
  children,
  pBottom,
  pTop,
  justifyContent,
  backgroundColor,
  flex,
  alignSelf,
  alignItems,
  width,
}) => {
  return (
    <View
      style={{
        paddingBottom: pBottom,
        paddingTop: pTop,
        width: width ? width : "91.46%",
        alignSelf: alignSelf ? alignSelf : "center",
        justifyContent: justifyContent ? justifyContent : null,
        backgroundColor: backgroundColor ? backgroundColor : null,
        alignItems: alignItems ? alignItems : null,
        flex: flex ? flex : null,
      }}
    >
      {children}
    </View>
  );
};

export default Container;
