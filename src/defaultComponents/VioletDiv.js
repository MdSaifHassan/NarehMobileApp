import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./Colors";
import Container from "./Container";

const VioletDiv = ({ children }) => {
  return (
    <View style={styles.violet}>
      <Container>
        <Text style={styles.text}>{children} </Text>
      </Container>
    </View>
  );
};

export default VioletDiv;

const styles = StyleSheet.create({
  violet: {
    backgroundColor: Colors.voilet5,
    paddingVertical: 8,
    justifyContent: "center",
    // marginTop: 15,
    // marginBottom: 20,
  },
  text: {
    color: Colors.white,
    fontFamily: "roboto-medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
    paddingLeft: 0,
  },
});
