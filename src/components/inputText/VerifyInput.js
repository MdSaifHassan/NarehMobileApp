import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Colors } from "../../defaultComponents/Colors";

const VerifyInput = ({
  placeholder,
  defaultValue,
  autoFocus,
  width,
  height,
  radius,
  value,
  onChangeText,
  refCallback,
  onKeyPress,
}) => {
  return (
    <View>
      <TextInput
        style={{
          width: width ? width : 40,
          height: height ? height : 40,
          borderRadius: radius ? radius : 6,
          borderWidth: 1,
          borderColor: Colors.black1,
          textAlign: "center",
        }}
        placeholder={placeholder}
        defaultValue={defaultValue ? defaultValue : null}
        keyboardType="phone-pad"
        autoFocus={autoFocus}
        maxLength={1}
        value={value}
        onChangeText={onChangeText}
        ref={refCallback}
        onKeyPress={onKeyPress}
      />
    </View>
  );
};

export default VerifyInput;

const styles = StyleSheet.create({});
