import * as React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Colors } from "../../../../defaultComponents/Colors";

const KidsEditableCard = (props) => (
  <View style={{ paddingBottom: 10 }}>
    <View style={{ marginTop: 20 }}>
      <View style={styles.FullCardBody}>
        <View style={styles.NameV}>
          <View style={styles.NameWrapper}>
            <Text style={styles.kidText}>{props.title}</Text>
          </View>
        </View>
        {/* /////////////// */}
        <View style={styles.NameV}>
          <View style={styles.NameWrapper}>
            <Text style={styles.text}>Child name</Text>
            <TextInput
              style={styles.text_bottom}
              onChangeText={props.onChangeTextName}
              value={props.valueName}
              defaultValue={props.defaultValueName}
            />
          </View>
          <View style={styles.NumberWrapper}>
            <Text style={styles.text}>Child birth date</Text>
            <TextInput
              style={styles.text_bottom}
              onChangeText={props.onChangeTextBirth}
              value={props.valueBirth}
              defaultValue={props.defaultValueBirth}
            />
          </View>
        </View>
        <View style={styles.NameV}>
          <View style={styles.NameWrapper}>
            <Text style={styles.text}>Gender</Text>
            <TextInput
              style={styles.text_bottom}
              onChangeText={props.onChangeTextGender}
              value={props.valueGender}
              defaultValue={props.defaultValueGender}
            />
          </View>
        </View>
      </View>
    </View>
    <View
      style={{
        height: 6,
        width: "100%",
        backgroundColor: Colors.voilet3,
      }}
    />
  </View>
);
const styles = StyleSheet.create({
  CardHeader: {
    backgroundColor: "#c1a6cd",
    //paddingVertical: -10,
    justifyContent: "center",
  },
  NameV: {
    // width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    // alignSelf: "center",
  },
  FullCardBody: {
    // width: "100%",
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
    paddingVertical: 5,
    borderBottomWidth: 0.7,
    borderColor: Colors.grey2,
  },
  kidText: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.voilet1,
  },
});
export default KidsEditableCard;
