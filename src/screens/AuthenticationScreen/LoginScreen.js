import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import AuthForm from "../../components/Forms/AuthForm";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../defaultComponents/Colors";
import { nslApi_key } from "../../api/nsl";
import { ActivityIndicator } from "react-native-paper";
import { mobileNumberRE } from "../../components/RegExValidations";
import LoadingScreen, {
  LoadingScreen1,
} from "../../defaultComponents/LoadingScreen";
import Logo from "../../components/Logo/Logo";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setphoneNumber] = useState(null);
  const [disable, setDisable] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [modal, setModal] = useState(false);

  console.log(isValid);

  //const { height } = useWindowDimensions();
  //2console.log(height);

  // if (phoneNumber === "") {
  //   setDisable(true);
  // }
  console.log(disable, "diavle");

  const changeHandler = (text) => {
    setphoneNumber(text);
    onValidation(text);
  };

  const onValidation = (phoneNumber) => {
    setIsValid(mobileNumberRE(phoneNumber));
  };

  const submitHandler = () => {
    Keyboard.dismiss();
    setLoading(true);
    setPressed(true);
    nslApi_key
      .post("/v1/auth/sendOTP", {
        mobile: phoneNumber,
        player_id: "36ca132b-345a-45fe-bd99-d44a4bfdb4f9",
      })
      .then((response) => {
        setPressed(false);
        setLoading(false);
        console.log(response.data);
        navigation.push("Verify", {
          mobile: phoneNumber,
          player_id: "36ca132b-345a-45fe-bd99-d44a4bfdb4f9",
        });
      })
      .catch((err) => {
        setLoading(false);
        setModal(true);
      });
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen1 />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.logoTitle}>
          <Text style={styles.logoText}>PRABHAT SUPER SEEDS</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {/* <ScrollView style={{ backgroundColor: "transparent", flex: 1 }}> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              // backgroundColor: Colors.red1,
              justifyContent: "center",
            }}
          >
            {modal ? (
              <ModalFailure
                visible={modal}
                name={phoneNumber}
                Icon="error"
                footerName="is not a registered mobile number"
                onDismiss={() => {
                  setPressed(false);
                  setModal(false);
                }}
              />
            ) : (
              <AuthForm
                label="Login"
                title="Request OTP"
                value={phoneNumber}
                onChangeText={changeHandler}
                onPress={submitHandler}
                disabled={isValid && !pressed ? !disable : disable}
                color={isValid ? Colors.green1 : Colors.red1}
                backgroundColor={
                  isValid && !pressed ? Colors.voilet1 : Colors.grey11
                }
              />
            )}

            {loadingScreen}
          </View>
        </TouchableWithoutFeedback>
        {/* </ScrollView> */}
        <Image
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: -1,
          }}
          source={require("../../../assets/AuthIcons/bgImage.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: "10%",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.green1,
    fontFamily: "roboto-bold",
    alignSelf: "center",
  },
});

export default LoginScreen;
