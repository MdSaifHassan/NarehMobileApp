import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Platform,
  AsyncStorage,
} from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { StatusBar } from "expo-status-bar";
import Logo from "../../components/Logo/Logo";
import VerifyInput from "../../components/inputText/VerifyInput";
import { nslApi_key, tokenApi } from "../../api/nsl";
import { AuthContext } from "../../contexts/AuthContext";
import {
  ModalContainer,
  ModalFailure,
  Sucess,
} from "../../defaultComponents/ModalFolder/ContentModal";
import RoleScreen from "../RoleScreen";
import LoadingScreen from "../../defaultComponents/LoadingScreen";

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
let resendOtpTimerInterval;

const isAndroid = Platform.OS === "android";

const VerifyScreen = ({ navigation, route }) => {
  const [modalV, setModalV] = useState(false);
  const [modalS, setModalS] = useState(false);

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );
  const [modal, setModal] = useState(false);
  const [role_select, setRole] = useState("");
  const [tokenRes, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const { authContext, loginState } = React.useContext(AuthContext);

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  //const { mobile, player_id } = route.params;

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(["", "", "", "", "", ""]);
      firstTextInputRef.current.focus();
    }

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    nslApi_key
      .post("/v1/auth/sendOTP", {
        mobile,
        player_id,
      })
      .then((response) => {
        console.log(response.data);

        Keyboard.dismiss();
        // alert("Otp sent. Please check your mobile for otp");
        setModalS(true);
      })
      .catch((err) => {
        setModalV(true);
      });
    console.log("todo: Resend OTP");
  };

  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return alert("Enter a numeric value");
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== "") {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === "Backspace" && otpArray[index] === "") {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }

        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ""; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const { mobile, player_id } = route.params;
  const { role } = loginState;

  const submitHandler = () => {
    setLoading(true);
    nslApi_key
      .post("/v2/auth/validateOTP", {
        mobile,
        player_id,
        otp: otpArray.join(""),
      })
      .then((response) => {
        console.log("1st Response", response.data.response[0]);
        const { role, token } = response.data.response[0];
        console.log(role, token, "--ROLETOKEN----");
        setToken(token);
        if (role.length === 1) {
          authContext.signIn(response.data.response[0]);
        } else {
          authContext.roleSelect(response.data.response[0]);
          navigation.push("select", { role, tokenRes });
        }

        //  navigation.replace("RoleScreen", { member_type, role });
      })
      .catch((err) => {
        setLoading(false);
        setModalV(true);

        console.log(err);
      });
  };

  // const pressHandler = () => {
  //   tokenApi().then((res) =>
  //     res
  //       .post("/v1/auth/selectRole", {
  //         memberType: "Regional Head",
  //       })
  //       .then((response) => {
  //         console.log(role_select, "ROLE");
  //         authContext.roleSelect1(role_select, tokenRes);
  //         console.log(response.data.response);
  //       })
  //       .catch((error) => alert("Invalid role"))
  //   );
  //   setModal(false);
  // };

  // if (loading) {
  //   return <LoadingScreen />;
  // }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView style={{ backgroundColor: "transparent" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <View style={styles.container}>
              <View style={styles.logo}>
                <Logo />
              </View>
              <View style={styles.logoTitle}>
                <Text style={styles.logoText}>PRABHAT SUPER SEEDS</Text>
              </View>
              <View style={styles.form}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>Verify OTP </Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.descriptionText}>
                    We have sent an OTP to number
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: "79%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                {[
                  firstTextInputRef,
                  secondTextInputRef,
                  thirdTextInputRef,
                  fourthTextInputRef,
                  fifthTextInputRef,
                  sixthTextInputRef,
                ].map((textInputRef, index) => (
                  <VerifyInput
                    value={otpArray[index]}
                    onKeyPress={onOtpKeyPress(index)}
                    onChangeText={onOtpChange(index)}
                    autoFocus={index === 0 ? true : undefined}
                    refCallback={refCallback(textInputRef)}
                    key={index}
                  />
                ))}
              </View>

              <View style={{ flexDirection: "row", width: "79%" }}>
                <Text>Not received your code? </Text>
                <View
                  style={{ borderBottomWidth: 1, borderColor: Colors.voilet1 }}
                >
                  {resendButtonDisabledTime > 0 ? (
                    <Text style={styles.invisibleText}>
                      Resend OTP {resendButtonDisabledTime} sec
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={onResendOtpButtonPress}>
                      <Text style={styles.invisibleText}>Resend OTP</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <TouchableOpacity
                disabled={
                  loading ||
                  otpArray[0] === "" ||
                  otpArray[1] === "" ||
                  otpArray[2] === "" ||
                  otpArray[3] === "" ||
                  otpArray[4] === "" ||
                  otpArray[5] === ""
                }
                style={{
                  ...styles.button,
                  backgroundColor:
                    !loading &&
                    otpArray[0] !== "" &&
                    otpArray[1] !== "" &&
                    otpArray[2] !== "" &&
                    otpArray[3] !== "" &&
                    otpArray[4] !== "" &&
                    otpArray[5] !== ""
                      ? Colors.voilet1
                      : Colors.grey11,
                }}
                onPress={submitHandler}
              >
                <Text style={styles.color}> Submit </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push("select")}
              >
                <Text style={styles.color}> Role Screen </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Image
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: -1,
        }}
        source={require("../../../assets/AuthIcons/bgImage.png")}
      />
      {modal ? (
        <ModalContainer visible={modal} onDismiss={() => setModal(false)}>
          <RoleScreen
            values={(roleSelected) => setRole(roleSelected)}
            onPress={pressHandler}
          />
        </ModalContainer>
      ) : null}
      {modalV ? (
        <ModalFailure
          visible={modalV}
          Icon="error"
          name="Please Enter A Valid OTP"
          footerName="Entered OTP is not valid"
          onDismiss={() => {
            // setDisable(false);
            setModalV(false);
          }}
        />
      ) : null}
      {modalS ? (
        <Sucess
          visible={modalS}
          Icon="md-checkmark-circle"
          name="OTP Sent"
          footerName="Please check your mobile for OTP"
          onDismiss={() => {
            // setDisable(false);
            setModalS(false);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // marginTop: 0,
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: "center",
    marginTop: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.green1,
  },
  button: {
    width: "79%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 4,
  },
  form: {
    marginTop: 30,
    height: 60,
    marginBottom: 14,
    //backgroundColor: 'yellow',
    width: "79%",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.grey2,
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
    fontSize: 14,
    fontWeight: "400",
  },
  invisibleText: {
    color: Colors.voilet1,
    fontSize: 12,
    fontWeight: "400",
    alignSelf: "center",
  },
});
export default VerifyScreen;
