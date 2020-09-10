import * as React from "react";
import { Card, Title, Paragraph, List } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { Colors, GradientColors } from "../../../defaultComponents/Colors";
import MapContainer from "./MapCard";

const Address = (props) => (
  <View>
    <Card style={{ marginTop: 20 }}>
      <View>
        <List.Accordion
          style={styles.CardHeader}
          title="Address"
          id="30"
          iconstyle={{ color: Colors.white }}
          titleStyle={{ color: Colors.white }}
        >
          <View style={styles.FullCardBody}>
            <View style={styles.NameV}>
              <View style={styles.NameWrapper}>
                <Text style={styles.text}>Address line 1 *</Text>
                <Text style={styles.text_bottom}>{props.address1}</Text>
              </View>
            </View>
            {/* /////////////// */}
            <View style={styles.NameV}>
              <View style={styles.NameWrapper}>
                <Text style={styles.text}>Address line 2 *</Text>
                <Text style={styles.text_bottom}>{props.address2}</Text>
              </View>
            </View>
            {/* ////////////////// */}
            <View style={styles.NameV}>
              <View style={styles.NameWrapper}>
                <Text style={styles.text}>City</Text>
                <Text style={styles.text_bottom}>{props.city}</Text>
              </View>
              <View style={styles.NumberWrapper}>
                <Text style={styles.text}>State</Text>
                <Text style={styles.text_bottom}>{props.state}</Text>
              </View>
            </View>
            <View style={styles.NameV}>
              <View style={styles.NameWrapper}>
                <Text style={styles.text}>Pin Code*</Text>
                <Text style={styles.text_bottom}>{props.pincode}</Text>
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
          <MapContainer />
        </List.Accordion>
      </View>
    </Card>
  </View>
);
const styles = StyleSheet.create({
  CardHeader: {
    backgroundColor: "#c1a6cd",
    justifyContent: "center",
    color: "red",
    paddingVertical: -10,
  },
  NameV: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },
  FullCardBody: {
    paddingVertical: 20,
    width: "91.46%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  NameWrapper: {
    minWidth: "48%",
  },
  NumberWrapper: {
    width: "48%",
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
    marginRight: 2,
  },
  text_bottom: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default Address;
