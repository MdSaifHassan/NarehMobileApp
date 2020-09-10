import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { ButtonFill } from "./Button";
import { Colors } from "./Colors";

const RadiBtn = ({ navigation }) => {
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Address type</Text>
      <View style={styles.RadioWrapper}>
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <Text style={styles.radioText}>Home</Text>
      </View>
      <View style={styles.RadioWrapper}>
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
        <Text style={styles.radioText}>Work / Office</Text>
      </View>
      <View style={styles.ButtonView}>
        <ButtonFill onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.EditText}>Save Change</Text>
        </ButtonFill>
      </View>
    </View>
  );
};

export default RadiBtn;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 27,
  },
  RadioWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
    lineHeight: 17,
  },
  ButtonView: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 31,
  },
  EditText: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.white,
  },
  radioText: {
    color: Colors.grey2,
    fontSize: 13,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    lineHeight: 17,
  },
});
