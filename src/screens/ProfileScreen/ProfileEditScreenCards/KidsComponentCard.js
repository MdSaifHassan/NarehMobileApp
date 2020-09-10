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

const KidsComponentCard = (props) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  return (
    <Container pTop={10}>
      <Text style={styles.title}>Kid {props.num} Details</Text>

      <Type1Text
        inputTitle="Name"
        value={props.valueKidName}
        onChangeText={props.onChangeTextKidName}
        defaultValue={props.defaultValueKidName}
        // keyboardType="number-pad"
      />
      <RowConatiner>
        <HalfConatiner>
          <Type1Text
            inputTitle="Gender"
            value={props.valueKidGender}
            onChangeText={props.onChangeTextKidGender}
            defaultValue={props.defaultValueKidGender}
          />
        </HalfConatiner>
        <HalfConatiner>
          <Type1Text
            inputTitle="Child Birth Date"
            value={props.valueCBirth}
            onChangeText={props.onChangeTextCBirth}
            defaultValue={props.defaultValueCBirth}
            placeholder="YYYY-MM-DD"
            // keyboardType="number-pad"
          />
          {/* <Type3Text
            inputTitle="Child Birth Date"
            inputDate={props.inputDate}
            calData={props.calData}
            // keyboardType="number-pad"
          /> */}
        </HalfConatiner>
      </RowConatiner>
    </Container>
  );
};

export default KidsComponentCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: "roboto-bold",
    fontWeight: "500",
    color: Colors.voilet1,
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
