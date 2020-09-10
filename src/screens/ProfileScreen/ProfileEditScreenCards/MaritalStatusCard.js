import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../../defaultComponents/Colors";
import Container from "../../../defaultComponents/Container";
import {
  Type1Text,
  RowConatiner,
  HalfConatiner,
  Type2Text,
  Type3Text,
  ErrorText,
} from "./ProfileDefaultComponents/ProfileEditText";
import { ButtonFill } from "../../../defaultComponents/Button";

const MaritalStatusCard = (props) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  return (
    <Container pTop={10}>
      {/* <Text style={styles.title}>Marital Status</Text> */}
      {/* <TouchableOpacity onPress={props.changeStatus} style={styles.btn}>
        <Text style={styles.btn_text}>{props.marital_status}</Text>
      </TouchableOpacity> */}

      {/* <Type1Text
        inputTitle="Marriage anniversary"
        value={props.valueMarriage}
        onChangeText={props.onChangeTextMarriage}
        defaultValue={props.defaultValueMarriage}
        placeholder="YYYY-MM-DD"
        // keyboardType="number-pad"
      /> */}
      <Type3Text
        inputTitle="Marriage anniversary"
        inputDate={props.inputDateAnni}
        calData={props.calDataAnni}
        // keyboardType="number-pad"
      />
      <Type1Text
        inputTitle="Spouse name"
        value={props.valueNameSpouse}
        onChangeText={props.onChangeTextNameSpouse}
        defaultValue={props.defaultValueName}
      />
      {/* <Type1Text
        inputTitle="Spouse Birth Date"
        value={props.valueSBirth}
        onChangeText={props.onChangeTextSBirth}
        defaultValue={props.defaultValueSBirth}
        placeholder="YYYY-MM-DD"
        // keyboardType="number-pad"
      /> */}
      <Type3Text
        inputTitle="Spouse Birth Date"
        inputDate={props.inputDate}
        calData={props.spouseBirthIn}
        // keyboardType="number-pad"
      />
    </Container>
  );
};

export default MaritalStatusCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: "roboto-bold",
    color: Colors.grey2,
  },
  btn: {
    width: 80,
    height: 30,
    backgroundColor: Colors.voilet1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  btn_text: {
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.white,
    textTransform: "capitalize",
  },
});
