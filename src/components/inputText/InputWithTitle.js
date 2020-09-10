import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../defaultComponents/Colors";
import Calendar from "../Calendar";

export const InputWithTtitleR = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: props.fontSize,
            fontFamily: props.fontFamily,
            color: props.fontColor,
            opacity: props.opacity,
          }}
        >
          {props.inputTitle}
        </Text>
        <Text style={{ color: "#F26F25" }}>*</Text>
      </View>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        keyboardType={props.keyboardType}
        value={props.value}
        style={styles.input}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
      />
    </View>
  );
};

const InputWithTtitle = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: props.fontFamily,
          color: props.fontColor,
          opacity: props.opacity,
        }}
      >
        {props.inputTitle}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        keyboardType={props.keyboardType}
        value={props.value}
        style={styles.input}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    minHeight: 30,
    marginVertical: 10,
  },
  calContainer: {
    // backgroundColor: "red",
    // alignItems: "flex-start",
  },
  input: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.7,
    // borderRadius: 4,
    borderBottomColor: Colors.grey2,
  },
});
export default InputWithTtitle;

export const CalendarWithTitle = (props) => {
  return (
    <View style={styles.calContainer}>
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: props.fontFamily,
          color: props.fontColor,
          opacity: props.opacity,
        }}
      >
        {props.inputTitle}
      </Text>
      <Calendar inputDate={props.inputDate} calData={props.calData} />
    </View>
  );
};
