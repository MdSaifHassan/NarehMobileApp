import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingScreen from "../defaultComponents/LoadingScreen";
import { Colors } from "../defaultComponents/Colors";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LoadingScreen />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
