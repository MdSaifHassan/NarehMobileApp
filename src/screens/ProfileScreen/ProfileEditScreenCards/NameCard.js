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
  Type3Text,
} from "./ProfileDefaultComponents/ProfileEditText";

const NameCard = (props) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  return (
    <Container pTop={10}>
      <Type1Text
        inputTitle="Name"
        value={props.valueName}
        onChangeText={props.onChangeTextName}
        defaultValue={props.defaultValueName}
      />
      <RowConatiner>
        <HalfConatiner>
          <Type2Text
            inputTitle="Registered Mobile number "
            value={props.valueMobile}
            onChangeText={props.onChangeTextMobile}
            defaultValue={props.defaultValueMobile}
            keyboardType="phone-pad"
          />
          {/* {!isValidEmail ? (
            <ErrorText>Enter correct Mobile number</ErrorText>
          ) : null} */}
        </HalfConatiner>
        <HalfConatiner>
          <Type1Text
            inputTitle="Store Name"
            value={props.valueStore}
            onChangeText={props.onChangeTextStore}
            defaultValue={props.defaultValueStore}
          />
        </HalfConatiner>
      </RowConatiner>
      <Type1Text
        inputTitle="Email"
        value={props.valueEmail}
        onChangeText={props.onChangeTextEmail}
        defaultValue={props.defaultValueEmail}
        keyboardType="email-address"
      />
      {/* {!isValidEmail ? <ErrorText>Enter correct Email</ErrorText> : null} */}
      <Type3Text
        inputTitle="Birth Date"
        inputDate={props.inputDate}
        calData={props.calData}
        // keyboardType="number-pad"
      />
    </Container>
  );
};

export default NameCard;

const styles = StyleSheet.create({});
