import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "./Colors";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};
export const LoadingScreen1 = () => {
  return (
    <View style={styles.container2}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
