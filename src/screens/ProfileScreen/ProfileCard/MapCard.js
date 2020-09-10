import React from "react";
import { Card } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../defaultComponents/Colors";

const MapContainer = () => (
  <Card style={styles.Card}>
    <View style={styles.container}>
      <Text style={styles.text}>
        Map <Text style={styles.subText}>(you can drag and drop the pin)</Text>
      </Text>
      <View style={styles.MapBox}>
        <Text style={{ color: Colors.white }}>Map Container</Text>
      </View>
    </View>
  </Card>
);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  text: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "500",
    color: Colors.voilet1,
    marginTop: 16,
  },
  subText: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
  },
  MapBox: {
    width: "100%",
    height: 145,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c1a6cd",
    marginBottom: 21,
    marginTop: 16,
  },
});

export default MapContainer;
