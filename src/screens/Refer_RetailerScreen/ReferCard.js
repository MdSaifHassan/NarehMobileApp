import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { Card } from "react-native-paper";
import { Colors } from "../../defaultComponents/Colors";
import { ButtonOutline } from "../../defaultComponents/Button";
import { tokenApi } from "../../api/nsl";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { mobileNumberRE } from "../../components/RegExValidations";

const ReferCard = ({ onPress }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const changeHandler = (text) => {
    setMobile(text);
    onValidation(text);
  };

  const onValidation = (phoneNumber) => {
    setIsValid(mobileNumberRE(phoneNumber));
  };

  const pressHandler = () => {
    setLoading(true);
    setPressed(true);
    Keyboard.dismiss();
    setName("");
    setMobile("");
    tokenApi().then((res) =>
      res
        .post("/v1/members/addReferral", {
          mobile,
          name,
        })
        .then((response) => {
          console.log(response.data.message);
          onPress(response.data.message);
          setLoading(false);
          setPressed(false);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          onPress(error.response.data.message);
          setLoading(false);
          setPressed(false);
        })
    );
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  return (
    <View style={styles.MainContainer}>
      <View>
        <View style={styles.Card} onPress={Keyboard.dismiss}>
          <View style={styles.NameWrapper}>
            <View style={styles.LeftWrapper}>
              <View style={styles.TextWrapper}>
                <Text style={styles.text}>Name</Text>
              </View>
              <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                keyboardType="default"
              />
            </View>
          </View>
          <View style={styles.NameWrapper}>
            <View style={styles.LeftWrapper} onPress={Keyboard.dismiss}>
              <View style={styles.TextWrapper}>
                <Text style={styles.text}>Mobile Number</Text>
              </View>
              <TextInput
                keyboardType="phone-pad"
                onChangeText={changeHandler}
                value={mobile}
                style={{ color: isValid ? Colors.voilet1 : Colors.red1 }}
                maxLength={10}
              />
            </View>
          </View>
          <View style={styles.BtnWrapper}>
            <ButtonOutline
              backgroundColor={pressed ? Colors.grey11 : Colors.white}
              disabled={(name.length < 4 && mobile.length < 10) || pressed}
              onPress={pressHandler}
            >
              <Text>Refer Now</Text>
            </ButtonOutline>
            {loadingScreen}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReferCard;

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    width: "91.46%",
    alignSelf: "center",
  },

  Card: {
    width: "100%",
    // height: 235,
    marginTop: 16,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  NameWrapper: {
    width: "100%",
    //height: 47,
    borderBottomWidth: 1,
    borderColor: Colors.grey2,
    marginTop: 16,
    paddingBottom: 5,
    // alignSelf: "center",
  },
  TextWrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },
  LeftWrapper: {},
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: "#616161",
    // marginBottom: 31,
  },
  BtnWrapper: {
    width: 108,
    //height: 40,
    alignSelf: "center",
    marginTop: 20,
  },
});
