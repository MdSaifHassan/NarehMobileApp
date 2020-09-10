import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.logo}>
      <Image
        source={require("../../../assets/AuthIcons/logo.png")}
        // style={styles.size}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    minWidth: 40,
    width: "26%",
    minHeight: 40,
  },
  // size: {
  //   maxWidth: 200,
  //   width: 120,
  //   height: 130,
  //   minHeight: 40,
  // },
});
