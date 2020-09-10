import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MapContainer_2 = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Map <Text style={styles.innertext}>(you can drag and drop the pin)</Text>
    </Text>

    <View style={styles.MapBox}>
      <Text style={styles.Map}>Map Container</Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  text: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: "#834d9b",
  },
  MapBox: {
    width: "100%",
    height: 145,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 21,
    marginTop: 16,
    borderWidth: 0.3,
    borderRadius: 10,
  },
  innertext: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: "#616161",
  },
});

export default MapContainer_2;
