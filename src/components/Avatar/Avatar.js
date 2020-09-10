import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Avatar = () => {
  return (
    <View>
      <FontAwesome5 name="user-alt" size={24} color="rgba(131,77,155,1)" />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
