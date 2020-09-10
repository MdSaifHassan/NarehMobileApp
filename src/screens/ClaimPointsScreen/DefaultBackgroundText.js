import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { ButtonOutline } from "../../defaultComponents/Button";
import { Colors } from "react-native/Libraries/NewAppScreen";

function DefaultBackgroundText(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>

      <ButtonOutline>
        <Text style={styles.button}>How to check coupon</Text>
      </ButtonOutline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    width: "80%",
    alignItems: "center",
  },
  text: {
    margin: 20,
    fontSize: 15,
    color: Colors.grey2,
    fontFamily: "roboto-regular",
    textAlign: "center",
  },
  button: {
    marginHorizontal: 20,
    color: Colors.grey2,
  },
});

export default DefaultBackgroundText;
