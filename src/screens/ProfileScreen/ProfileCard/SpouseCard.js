import * as React from "react";
//import { Card } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../../defaultComponents/Colors";

const SpouseCard = (props) => (
  <View style={{ paddingBottom: 10 }}>
    <View>
      <View style={styles.FullCardBody}>
        <View style={styles.NameV}>
          <View style={styles.NameWrapper}>
            <Text style={styles.text}>Marital status</Text>
            <Text style={styles.text_bottom}>{props.married}</Text>
          </View>
          <View style={styles.NumberWrapper}>
            <Text style={styles.text}>Marriage anniversary </Text>
            <Text style={styles.text_bottom}>{props.doa}</Text>
          </View>
        </View>
        {/* /////////////// */}
        <View style={styles.NameV}>
          <View style={styles.NameWrapper}>
            <Text style={styles.text}>Spouse name</Text>
            <Text style={styles.text_bottom}>{props.name}</Text>
          </View>
          <View style={styles.NumberWrapper}>
            <Text style={styles.text}>Spouse Birth Date</Text>
            <Text style={styles.text_bottom}>{props.dob}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: Colors.voilet3,
        }}
      />
    </View>
  </View>
);
const styles = StyleSheet.create({
  CardHeader: {
    backgroundColor: "#c1a6cd",
    paddingVertical: -10,
    justifyContent: "center",
  },
  NameV: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "center",
  },
  FullCardBody: {
    paddingVertical: 15,
  },
  NameWrapper: {
    width: "48%",
  },
  NumberWrapper: {
    width: "48%",
    marginBottom: 10,
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
  },
  text_bottom: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
    marginTop: 5,
  },
  kidText: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.voilet1,
  },
});
export default SpouseCard;
