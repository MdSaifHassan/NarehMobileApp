import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputWithTtitle from "../../../components/inputText/InputWithTitle";
import { Colors } from "../../../defaultComponents/Colors";
import Container from "../../../defaultComponents/Container";
import {
  Type1Text,
  RowConatiner,
  HalfConatiner,
  Type2Text,
  ErrorText,
  MapContainer,
} from "./ProfileDefaultComponents/ProfileEditText";
import SelectState from "./ProfileDefaultComponents/SelectState";

const AddressCard = (props) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [state1, setState1] = useState("Select State");

  return (
    <Container pTop={10}>
      <Type2Text
        inputTitle="Address line 1 "
        value={props.valueAddress1}
        onChangeText={props.onChangeTextAddress1}
        defaultValue={props.defaultValueAddress1}
      />
      {/* {!isValidEmail ? <ErrorText>Enter valid Address line 1</ErrorText> : null} */}
      <Type2Text
        inputTitle="Address line 2 "
        value={props.valueAddress2}
        onChangeText={props.onChangeTextAddress2}
        defaultValue={props.defaultValueAddress2}
      />
      {/* {!isValidEmail ? <ErrorText>Enter valid Address line 2</ErrorText> : null} */}
      <Type1Text
        inputTitle="Landmark "
        value={props.valueLandmark}
        onChangeText={props.onChangeTextLandmark}
        defaultValue={props.defaultValueLandmark}
      />

      <Type2Text
        inputTitle="City"
        value={props.valueCity}
        onChangeText={props.onChangeTextCity}
        defaultValue={props.defaultValueCity}
      />
      {/* {!isValidEmail ? <ErrorText>Enter correct Pin Code</ErrorText> : null} */}
      <SelectState
        transferState={(selectedState) =>
          props.transferStatetoParent(selectedState)
        }
        state={props.state1}
      />

      <Type2Text
        inputTitle="Pin code"
        keyboardType="number-pad"
        maxLength={6}
        value={props.valuePin}
        onChangeText={props.onChangeTextPin}
        defaultValue={props.defaultValuePin}
      />
      {/* {!isValidEmail ? <ErrorText>Enter correct Pin Code</ErrorText> : null} */}
      <MapContainer />
    </Container>
  );
};

export default AddressCard;

const styles = StyleSheet.create({});
