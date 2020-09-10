import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../defaultComponents/Colors";

const InputText = ({
  placeholder,
  value,
  onChangeText,
  onEndEditing,
  keyboardType,
  maxLength,
  style,
  color,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      keyboardType={keyboardType}
      value={value}
      style={{ ...styles.input, color }}
      autoFocus
      maxLength={maxLength}
      // color={color}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    width: "79%",
    paddingLeft: "7%",
    paddingVertical: 11,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.voilet4,
    borderRadius: 4,
  },
});
