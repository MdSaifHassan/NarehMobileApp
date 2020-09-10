import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import InputText from "../inputText/InputText";
import Logo from "../Logo/Logo";

const AuthForm = ({
  label,
  description,
  title,
  onPress,
  value,
  onChangeText,
  onEndEditing,
  disabled,
  color,
  backgroundColor,
}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.logoTitle}>
        <Text style={styles.logoText}>PRABHAT SUPER SEEDS</Text>
      </View> */}
      <View style={styles.form}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{label} </Text>
        </View>
        {/* <View style={styles.description}>
          <Text style={styles.descriptionText}>{description} </Text>
        </View> */}
      </View>
      <InputText
        placeholder="Enter your mobile number"
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        maxLength={10}
        color={color}
        // onEndEditing={onEndEditing}
      />

      <TouchableOpacity
        disabled={disabled}
        style={{
          ...styles.button,
          backgroundColor: backgroundColor,
        }}
        onPress={onPress}
      >
        <Text style={styles.color}>{title} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    // marginTop: "20%",
    // flex: 1,
    // backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.green1,
    fontFamily: "roboto-bold",
  },
  button: {
    width: "79%",
    //height: 45,

    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 4,
    elevation: 4,
    zIndex: 100,
  },
  form: {
    marginTop: 30,
    //height: 60,
    marginBottom: 14,
    //backgroundColor: 'yellow',
    width: "79%",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.grey2,
    fontFamily: "roboto-medium",
  },

  descriptionText: {
    marginBottom: 14,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
    color: Colors.grey2,
  },
  color: {
    color: Colors.white,
  },
  invisibleText: {
    color: Colors.grey6,
    fontSize: 12,
    fontWeight: "400",
  },
});
